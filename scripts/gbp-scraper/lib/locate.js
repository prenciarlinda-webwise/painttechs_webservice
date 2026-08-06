const fs = require('fs');
const path = require('path');
const { extractContactFields } = require('./profile');
const { dismissConsent } = require('./consent');
const { politeDelay } = require('./browser');

const CONFIG_PATH = path.join(__dirname, '..', 'config', 'competitors.json');

function normalizePhone(raw) {
  return (raw || '').replace(/\D/g, '');
}

function normalizeWebsite(raw) {
  if (!raw) return '';
  return raw
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .split('/')[0];
}

function verifyIdentity(competitor, contact) {
  const phoneMatches =
    competitor.verifyPhone && normalizePhone(contact.phone) === normalizePhone(competitor.verifyPhone);
  const websiteMatches =
    competitor.verifyWebsite &&
    normalizeWebsite(contact.website).includes(normalizeWebsite(competitor.verifyWebsite));

  if (phoneMatches) return 'phone';
  if (websiteMatches) return 'website';
  return 'unverified';
}

function persistResolvedUrl(competitorId, mapsUrl) {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(raw);
    const entry = config.competitors.find((c) => c.id === competitorId);
    if (entry) {
      entry.mapsUrl = mapsUrl;
      fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
    }
  } catch (err) {
    console.warn(`[locate] could not persist resolved URL for ${competitorId}: ${err.message}`);
  }
}

async function waitForPlacePage(page, timeout = 15000) {
  await page.waitForURL(/\/maps\/place\//, { timeout }).catch(() => {});
  await page.locator('h1').first().waitFor({ state: 'visible', timeout });
}

async function searchAndLand(page, searchQuery) {
  const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await dismissConsent(page);
  await politeDelay();

  const alreadyLanded = /\/maps\/place\//.test(page.url());
  if (!alreadyLanded) {
    // Multiple-result disambiguation list: click the first result card.
    const firstResult = page.locator('div[role="feed"] a[href*="/maps/place/"]').first();
    if ((await firstResult.count().catch(() => 0)) > 0) {
      await firstResult.click({ timeout: 10000 });
    }
  }

  await waitForPlacePage(page);
}

// Resolves a competitor to a verified Maps listing. Leaves `page` navigated to that
// listing (Overview tab) so callers can continue extracting profile/reviews/posts
// from the same page without a redundant re-navigation.
async function resolveListing(page, competitor) {
  if (competitor.mapsUrl) {
    await page.goto(competitor.mapsUrl, { waitUntil: 'domcontentloaded' });
    await dismissConsent(page);
    await waitForPlacePage(page);

    const contact = await extractContactFields(page);
    const identityVerifiedBy = verifyIdentity(competitor, contact);
    if (identityVerifiedBy !== 'unverified') {
      return { mapsUrl: page.url(), identityVerifiedBy };
    }
    console.warn(
      `[locate] cached mapsUrl for "${competitor.name}" failed identity re-verification — falling back to fresh search.`
    );
  }

  await searchAndLand(page, competitor.searchQuery);

  const contact = await extractContactFields(page);
  const identityVerifiedBy = verifyIdentity(competitor, contact);

  if (identityVerifiedBy === 'unverified') {
    throw new Error(
      `Could not verify "${competitor.name}" — resolved listing's phone/website did not match ` +
        `config (expected phone ${competitor.verifyPhone} or website ${competitor.verifyWebsite}, ` +
        `got phone "${contact.phone}" / website "${contact.website}"). Aborting rather than scraping ` +
        `a possibly-wrong listing. If this is a franchise business, check for a territory-name ` +
        `mismatch (see the "note" field in config/competitors.json).`
    );
  }

  const mapsUrl = page.url();
  persistResolvedUrl(competitor.id, mapsUrl);
  return { mapsUrl, identityVerifiedBy };
}

module.exports = { resolveListing };
