const { parseRelativeDate } = require('./dates');
const { politeDelay } = require('./browser');

// Google's internal RPC responses that populate the reviews feed are undocumented,
// versioned, and shaped as deeply-nested arrays that drift between releases — not
// something we can safely hardcode a parser for without live inspection. We still
// listen for and capture likely candidates (stripping the `)]}'` XSSI-protection
// prefix) as raw enrichment data for future refinement, but DOM extraction via
// role/aria-label is the primary, verified-to-actually-work path in this build.
// See README "How it works" for the honest state of this tradeoff.
function attachXhrCapture(page, rawCaptures) {
  page.on('response', async (response) => {
    const url = response.url();
    if (!/review/i.test(url)) return;
    try {
      const text = await response.text();
      const stripped = text.startsWith(")]}'") ? text.slice(4) : text;
      const parsed = JSON.parse(stripped);
      rawCaptures.push({ url, capturedAt: new Date().toISOString(), parsed });
    } catch {
      // Not JSON, not review-shaped, or already consumed — ignore.
    }
  });
}

async function openReviewsTab(page) {
  const tab = page.getByRole('tab', { name: /reviews/i }).first();
  await tab.click({ timeout: 10000 });
  await page.locator('div[role="feed"]').first().waitFor({ state: 'visible', timeout: 10000 });
}

async function scrollFeedUntil(page, targetCount, { maxStalls = 4, incrementPx = 800 } = {}) {
  const feed = page.locator('div[role="feed"]').first();
  const reviewLocator = feed.locator('[data-review-id]');

  let stalls = 0;
  let lastCount = await reviewLocator.count().catch(() => 0);

  while (lastCount < targetCount && stalls < maxStalls) {
    await feed.evaluate((el, px) => el.scrollBy(0, px), incrementPx).catch(() => {});
    await politeDelay(700, 1500);

    const currentCount = await reviewLocator.count().catch(() => lastCount);
    if (currentCount <= lastCount) {
      stalls += 1;
    } else {
      stalls = 0;
    }
    lastCount = currentCount;
  }

  return lastCount;
}

async function extractReviewRecord(container) {
  const rating = await container
    .locator('span[role="img"][aria-label*="star"]')
    .first()
    .getAttribute('aria-label')
    .then((label) => {
      const match = label && label.match(/([\d.]+)\s*star/i);
      return match ? Number(match[1]) : null;
    })
    .catch(() => null);

  const relativeDateText = await container
    .locator('span')
    .filter({ hasText: /ago$/i })
    .first()
    .innerText()
    .then((t) => t.trim())
    .catch(() => null);

  const reviewerName = await container
    .getByRole('button')
    .first()
    .innerText()
    .then((t) => t.trim())
    .catch(() => null);

  // Expand truncated text ("More" button) before reading it, if present.
  const moreButton = container.getByRole('button', { name: /^more$/i }).first();
  if ((await moreButton.count().catch(() => 0)) > 0) {
    await moreButton.click({ timeout: 3000 }).catch(() => {});
  }

  const text = await container
    .locator('span')
    .filter({ hasText: /.{15,}/ })
    .first()
    .innerText()
    .then((t) => t.trim())
    .catch(() => null);

  let ownerResponse = null;
  const ownerBlock = container.locator('*').filter({ hasText: /response from the owner/i }).last();
  if ((await ownerBlock.count().catch(() => 0)) > 0) {
    const ownerText = await ownerBlock.innerText().catch(() => null);
    const ownerDate = await ownerBlock
      .locator('span')
      .filter({ hasText: /ago$/i })
      .first()
      .innerText()
      .then((t) => t.trim())
      .catch(() => null);
    ownerResponse = { present: true, relativeDateText: ownerDate, text: ownerText };
  }

  const { estimatedDate, precisionDays } = parseRelativeDate(relativeDateText);

  return {
    reviewerName,
    rating,
    relativeDateText,
    estimatedDate,
    precisionDays,
    text,
    ownerResponse,
    extractionMethod: 'dom',
  };
}

async function extractReviews(page, { maxReviews = 100 } = {}) {
  const rawCaptures = [];
  attachXhrCapture(page, rawCaptures);

  await openReviewsTab(page);
  await scrollFeedUntil(page, maxReviews);

  const feed = page.locator('div[role="feed"]').first();
  const containers = feed.locator('[data-review-id]');
  const count = Math.min(await containers.count().catch(() => 0), maxReviews);

  const reviews = [];
  for (let i = 0; i < count; i += 1) {
    const record = await extractReviewRecord(containers.nth(i));
    reviews.push(record);
  }

  if (count === 0) {
    console.warn('[reviews] found 0 review containers — selectors may need re-verification against live DOM.');
  }

  return { reviews, rawXhrCaptures: rawCaptures };
}

module.exports = { extractReviews };
