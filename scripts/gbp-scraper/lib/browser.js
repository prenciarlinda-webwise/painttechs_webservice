const { chromium } = require('playwright');

const REALISTIC_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

// Patches the most commonly checked automation fingerprint. Not a stealth suite by
// design (see README) — this is a one-off, low-volume, sequential research run, not
// adversarial scraping at scale, so we deliberately don't reach for playwright-extra.
const WEBDRIVER_PATCH = `
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
`;

async function launchBrowser({ headful = false } = {}) {
  // Recent Playwright versions launch Chromium's "new" headless mode by default,
  // which is far less fingerprintable than legacy headless — no extra args needed.
  const browser = await chromium.launch({ headless: !headful });

  const context = await browser.newContext({
    userAgent: REALISTIC_USER_AGENT,
    locale: 'en-US',
    timezoneId: 'America/New_York',
    viewport: { width: 1366, height: 900 },
  });

  await context.addInitScript(WEBDRIVER_PATCH);

  return { browser, context };
}

// Small randomized delay between actions — politeness, not a stealth mechanism.
async function politeDelay(minMs = 800, maxMs = 2200) {
  const ms = minMs + Math.random() * (maxMs - minMs);
  await new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { launchBrowser, politeDelay };
