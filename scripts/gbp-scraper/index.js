const fs = require('fs');
const path = require('path');
const { launchBrowser, politeDelay } = require('./lib/browser');
const { resolveListing } = require('./lib/locate');
const { extractProfile } = require('./lib/profile');
const { extractReviews } = require('./lib/reviews');
const { extractPosts } = require('./lib/posts');
const { computeReviewMetrics, computePostMetrics } = require('./lib/dates');
const { writeOutputs } = require('./lib/report');

const CONFIG_PATH = path.join(__dirname, 'config', 'competitors.json');
const OUTPUT_DIR = path.join(__dirname, 'output');

function parseArgs(argv) {
  const args = { headful: false, maxReviews: 100, maxPosts: 20, competitor: null };
  for (const raw of argv) {
    if (raw === '--headful') args.headful = true;
    else if (raw.startsWith('--max-reviews=')) args.maxReviews = Number(raw.split('=')[1]);
    else if (raw.startsWith('--max-posts=')) args.maxPosts = Number(raw.split('=')[1]);
    else if (raw.startsWith('--competitor=')) args.competitor = raw.split('=')[1];
  }
  return args;
}

function loadCompetitors(filterName) {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  if (!filterName) return config.competitors;
  const needle = filterName.toLowerCase();
  const matches = config.competitors.filter((c) => c.name.toLowerCase().includes(needle));
  if (matches.length === 0) {
    throw new Error(`No configured competitor matches "${filterName}". Check config/competitors.json.`);
  }
  return matches;
}

async function scrapeCompetitor(context, competitor, { maxReviews, maxPosts }) {
  const page = await context.newPage();
  // Built up incrementally so a failure partway through (e.g. reviews blocked by
  // Google's anti-bot gate) still preserves whatever was already extracted, instead
  // of discarding a successful resolve+profile just because a later step threw.
  const result = {
    competitor: competitor.name,
    scrapedAt: new Date().toISOString(),
    mapsUrl: null,
    identityVerifiedBy: 'unverified',
    profile: {},
    reviews: [],
    postsTabAvailable: false,
    posts: [],
    metrics: {},
  };

  try {
    console.log(`\n[${competitor.name}] resolving listing...`);
    const { mapsUrl, identityVerifiedBy } = await resolveListing(page, competitor);
    result.mapsUrl = mapsUrl;
    result.identityVerifiedBy = identityVerifiedBy;
    console.log(`[${competitor.name}] resolved -> ${mapsUrl} (verified by ${identityVerifiedBy})`);

    result.profile = await extractProfile(page);
    console.log(`[${competitor.name}] profile extracted (rating ${result.profile.displayedRating ?? '—'}, ${result.profile.displayedReviewCount ?? '—'} reviews displayed)`);

    await politeDelay();
    const { reviews } = await extractReviews(page, { maxReviews });
    result.reviews = reviews;
    console.log(`[${competitor.name}] captured ${reviews.length} reviews`);

    await politeDelay();
    const { postsTabAvailable, posts } = await extractPosts(page, { maxPosts });
    result.postsTabAvailable = postsTabAvailable;
    result.posts = posts;
    console.log(`[${competitor.name}] Updates tab ${postsTabAvailable ? 'found' : 'not present'}, ${posts.length} posts captured`);

    result.metrics = {
      ...computeReviewMetrics(result.reviews),
      ...computePostMetrics(result.posts),
    };
  } catch (err) {
    console.error(`[${competitor.name}] FAILED: ${err.message}`);
    result.error = err.message;
  } finally {
    await page.close().catch(() => {});
  }

  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const competitors = loadCompetitors(args.competitor);
  const timestamp = new Date().toISOString();

  console.log(`Running gbp-scraper for ${competitors.length} competitor(s), headful=${args.headful}`);

  const { browser, context } = await launchBrowser({ headful: args.headful });
  const results = [];

  try {
    // Strictly sequential — never parallel across competitors (politeness/ToS posture).
    for (const competitor of competitors) {
      const result = await scrapeCompetitor(context, competitor, {
        maxReviews: args.maxReviews,
        maxPosts: args.maxPosts,
      });
      results.push(result);
      await politeDelay(1500, 3000);
    }
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }

  const runDir = writeOutputs(results, OUTPUT_DIR, timestamp);
  console.log(`\nDone. Output written to ${runDir}`);

  const failures = results.filter((r) => r.error);
  if (failures.length > 0) {
    console.warn(`\n${failures.length} competitor(s) failed — see errors above and check identityVerifiedBy in output.`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exitCode = 1;
});
