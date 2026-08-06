// Google Maps' DOM uses obfuscated, non-semantic class names that drift over time.
// Every selector here favors role/aria-label/data-item-id (semantic, accessibility-
// driven hooks that are far more stable) over class names. Each field is wrapped so
// one broken selector can't take down the rest of the extraction — on failure we
// warn loudly to console and record `null`/empty rather than silently guessing.
// Last verified against live Google Maps: not yet — verify during first real run
// (see README) and update this comment with the date once confirmed working.

async function safeExtract(label, fn) {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[profile] could not extract "${label}": ${err.message}`);
    return null;
  }
}

// Shared by locate.js for identity verification, and by extractProfile() below.
async function extractContactFields(page) {
  const phone = await safeExtract('phone', async () => {
    const button = page.locator('button[data-item-id^="phone"]').first();
    const ariaLabel = await button.getAttribute('aria-label', { timeout: 5000 });
    if (!ariaLabel) return null;
    return ariaLabel.replace(/^Phone:\s*/i, '').trim();
  });

  const website = await safeExtract('website', async () => {
    const link = page.locator('a[data-item-id="authority"]').first();
    return await link.getAttribute('href', { timeout: 5000 });
  });

  const address = await safeExtract('address', async () => {
    const button = page.locator('button[data-item-id="address"]').first();
    const ariaLabel = await button.getAttribute('aria-label', { timeout: 5000 });
    if (!ariaLabel) return null;
    return ariaLabel.replace(/^Address:\s*/i, '').trim();
  });

  return { phone, website, address };
}

async function extractRatingAndReviewCount(page) {
  const displayedRating = await safeExtract('displayedRating', async () => {
    const el = page.locator('span[role="img"][aria-label*="star"]').first();
    const label = await el.getAttribute('aria-label', { timeout: 5000 });
    const match = label && label.match(/([\d.]+)\s*star/i);
    return match ? Number(match[1]) : null;
  });

  const displayedReviewCount = await safeExtract('displayedReviewCount', async () => {
    const el = page.getByRole('button', { name: /reviews?$/i }).first();
    const label = await el.getAttribute('aria-label', { timeout: 5000 });
    const match = label && label.match(/([\d,]+)\s*review/i);
    return match ? Number(match[1].replace(/,/g, '')) : null;
  });

  return { displayedRating, displayedReviewCount };
}

function cleanForComparison(text) {
  return (text || '')
    .replace(/[^a-zA-Z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function extractCategoryAndDescription(page, businessName) {
  // Category renders as a short plain-text button right under the business name,
  // with no reliable data-item-id — heuristic: first short (<=4 word) button
  // immediately after the h1 that isn't a known action label or one of Google's
  // own persistent UI chips (map quick-filters, sidebar controls, etc.).
  // Last verified live 2026-08-05 against Straight Edge Painting + 360 Painting
  // listings — both showed Google's map quick-filter chips (Restaurants, Hotels,
  // Things to do, Transit, Parking, Pharmacies, ATMs, Saved, Recents, Get app)
  // ahead of the actual category button in DOM order, which the exclusion list
  // below is scoped to skip. Re-verify if this starts returning wrong values.
  const ACTION_WORDS =
    /^(directions|save|nearby|send to phone|share|call|website|menu|close|search|next page|open hours|closed|closes|opens|hours)$/i;
  const CHROME_WORDS =
    /^(restaurants|hotels|things to do|transit|parking|pharmacies|atms|saved|recents|get app|see photos)$/i;

  const categoryPrimary = await safeExtract('categoryPrimary', async () => {
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 25); i += 1) {
      // Confirmed live 2026-08-05: some buttons' innerText carries leading
      // icon-font glyphs that render as literal characters (e.g. asterisks) in
      // headless Chromium, plus an embedded newline between the icon and the
      // label. Neither whitespace-only trimming nor a zero-width-char strip
      // catches that, since a leading asterisk isn't whitespace. Stripping
      // every non-letter/non-space character is what actually handles it.
      const raw = await buttons.nth(i).innerText().catch(() => '');
      const text = raw.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ').trim();
      if (!text) continue;

      // Confirmed live 2026-08-05 (360 Painting of Jacksonville): stripping the
      // "°" from the business name can leave a fragment ("Painting of
      // Jacksonville") short enough to pass the word-count check below and get
      // mistaken for the category. Reject candidates that are a whole-word
      // fragment of the business name — word-boundary matched, so a genuine
      // single-word category like "Painter" isn't wrongly excluded just because
      // it's a substring of "Painters" elsewhere in the name.
      const cleanedName = cleanForComparison(businessName);
      const cleanedCandidate = cleanForComparison(text);
      if (cleanedName && cleanedCandidate) {
        const escaped = cleanedCandidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (new RegExp(`\\b${escaped}\\b`).test(cleanedName)) continue;
      }

      if (text.split(/\s+/).length <= 4 && !ACTION_WORDS.test(text) && !CHROME_WORDS.test(text)) {
        return text;
      }
    }
    return null;
  });

  const description = await safeExtract('description', async () => {
    // Anchor off the "From the owner" label rather than a generic longest-text-block
    // heuristic — the latter matched the entire page's concatenated text in testing.
    const label = page.getByText(/^from the owner$/i).first();
    if ((await label.count().catch(() => 0)) === 0) return null;
    const container = label.locator('..');
    const text = (await container.innerText().catch(() => '')).replace(/^From the owner\s*/i, '').trim();
    return text ? text.slice(0, 1000) : null;
  });

  return { categoryPrimary, categoriesAdditional: [], description };
}

async function extractHours(page) {
  return safeExtract('hours', async () => {
    const trigger = page.getByRole('button', { name: /hours|open|closed/i }).first();
    await trigger.click({ timeout: 5000 });
    const rows = page.locator('table tr');
    const rowCount = await rows.count();
    if (rowCount === 0) return null;

    const hours = {};
    for (let i = 0; i < rowCount; i += 1) {
      const cells = rows.nth(i).locator('td, th');
      const cellCount = await cells.count();
      if (cellCount < 2) continue;
      const day = (await cells.nth(0).innerText()).trim();
      const time = (await cells.nth(1).innerText()).trim();
      if (day) hours[day] = time;
    }
    return Object.keys(hours).length ? hours : null;
  });
}

async function extractPhotoCount(page) {
  return safeExtract('photoCount', async () => {
    const el = page.locator('button[aria-label*="photo"], a[aria-label*="photo"]').first();
    const label = await el.getAttribute('aria-label', { timeout: 5000 });
    const match = label && label.match(/([\d,]+)\+?\s*photos?/i);
    return match ? Number(match[1].replace(/,/g, '')) : null;
  });
}

async function extractServicesAndAttributes(page) {
  // "Services" and "About" are separate tabs on the listing; not every business
  // has either populated. Best-effort: switch tabs if present, collect list items,
  // switch back to Overview so reviews.js/posts.js start from a known tab state.
  const servicesListed = await safeExtract('servicesListed', async () => {
    const tab = page.getByRole('tab', { name: /^Services$/i }).first();
    if ((await tab.count()) === 0) return [];
    await tab.click({ timeout: 5000 });
    const items = page.locator('[role="tabpanel"] li, [role="tabpanel"] div[role="listitem"]');
    const count = await items.count();
    const texts = [];
    for (let i = 0; i < count; i += 1) {
      const text = (await items.nth(i).innerText().catch(() => '')).trim();
      if (text) texts.push(text);
    }
    return texts;
  });

  const attributes = await safeExtract('attributes', async () => {
    const tab = page.getByRole('tab', { name: /^About$/i }).first();
    if ((await tab.count()) === 0) return [];
    await tab.click({ timeout: 5000 });
    const items = page.locator('[role="tabpanel"] li, [role="tabpanel"] div[role="listitem"]');
    const count = await items.count();
    const texts = [];
    for (let i = 0; i < count; i += 1) {
      const text = (await items.nth(i).innerText().catch(() => '')).trim();
      if (text) texts.push(text);
    }
    return texts;
  });

  const overviewTab = page.getByRole('tab', { name: /^Overview$/i }).first();
  if ((await overviewTab.count()) > 0) {
    await overviewTab.click({ timeout: 5000 }).catch(() => {});
  }

  return { servicesListed: servicesListed || [], attributes: attributes || [] };
}

async function extractProfile(page) {
  const name = await safeExtract('name', async () => {
    const h1 = page.locator('h1').first();
    return (await h1.innerText({ timeout: 5000 })).trim();
  });

  const contact = await extractContactFields(page);
  const { displayedRating, displayedReviewCount } = await extractRatingAndReviewCount(page);
  const { categoryPrimary, categoriesAdditional, description } = await extractCategoryAndDescription(page, name);
  const hours = await extractHours(page);
  const photoCount = await extractPhotoCount(page);
  const { servicesListed, attributes } = await extractServicesAndAttributes(page);

  return {
    name,
    categoryPrimary,
    categoriesAdditional,
    description,
    phone: contact.phone,
    website: contact.website,
    address: contact.address,
    servicesListed,
    attributes,
    hours,
    photoCount,
    displayedRating,
    displayedReviewCount,
  };
}

module.exports = { extractContactFields, extractProfile };
