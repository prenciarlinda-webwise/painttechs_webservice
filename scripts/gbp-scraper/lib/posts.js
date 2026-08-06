const { parseRelativeDate } = require('./dates');
const { politeDelay } = require('./browser');

// GBP "Updates" (Google Posts) only render a tab when the business has published at
// least one post — absence is a valid, recordable state, not an error.
async function findPostsTab(page) {
  const tab = page.getByRole('tab', { name: /updates|posts/i }).first();
  return (await tab.count().catch(() => 0)) > 0 ? tab : null;
}

async function scrollPostsFeed(page, targetCount, { maxStalls = 4, incrementPx = 800 } = {}) {
  const container = page.locator('div[role="feed"], div[role="main"]').first();
  const postLocator = container.locator('[data-post-id], div[role="article"]');

  let stalls = 0;
  let lastCount = await postLocator.count().catch(() => 0);

  while (lastCount < targetCount && stalls < maxStalls) {
    await container.evaluate((el, px) => el.scrollBy(0, px), incrementPx).catch(() => {});
    await politeDelay(700, 1500);

    const currentCount = await postLocator.count().catch(() => lastCount);
    if (currentCount <= lastCount) {
      stalls += 1;
    } else {
      stalls = 0;
    }
    lastCount = currentCount;
  }

  return lastCount;
}

async function extractPostRecord(container) {
  const relativeDateText = await container
    .locator('span')
    .filter({ hasText: /ago$/i })
    .first()
    .innerText()
    .then((t) => t.trim())
    .catch(() => null);

  const type = await container
    .locator('span, div')
    .filter({ hasText: /^(update|offer|event|product)$/i })
    .first()
    .innerText()
    .then((t) => t.trim())
    .catch(() => 'Update');

  const content = await container
    .locator('span')
    .filter({ hasText: /.{15,}/ })
    .first()
    .innerText()
    .then((t) => t.trim())
    .catch(() => null);

  const hasImage = await container
    .locator('img')
    .count()
    .then((c) => c > 0)
    .catch(() => false);

  const { estimatedDate, precisionDays } = parseRelativeDate(relativeDateText);

  return {
    type,
    relativeDateText,
    estimatedDate,
    precisionDays,
    content,
    hasImage,
    extractionMethod: 'dom',
  };
}

async function extractPosts(page, { maxPosts = 20 } = {}) {
  const tab = await findPostsTab(page);
  if (!tab) {
    return { postsTabAvailable: false, posts: [] };
  }

  await tab.click({ timeout: 10000 }).catch(() => {});
  await politeDelay();
  await scrollPostsFeed(page, maxPosts);

  const container = page.locator('div[role="feed"], div[role="main"]').first();
  const containers = container.locator('[data-post-id], div[role="article"]');
  const count = Math.min(await containers.count().catch(() => 0), maxPosts);

  const posts = [];
  for (let i = 0; i < count; i += 1) {
    posts.push(await extractPostRecord(containers.nth(i)));
  }

  if (count === 0) {
    console.warn('[posts] "Updates" tab was found but 0 posts extracted — selectors may need re-verification, or the business genuinely has no visible posts.');
  }

  // Return to Overview so any later steps (e.g. re-running profile extraction) start clean.
  const overviewTab = page.getByRole('tab', { name: /^overview$/i }).first();
  if ((await overviewTab.count().catch(() => 0)) > 0) {
    await overviewTab.click({ timeout: 5000 }).catch(() => {});
  }

  return { postsTabAvailable: true, posts };
}

module.exports = { extractPosts };
