# GBP Scraper

One-off manual research tool. Pulls public Google Maps listing data (reviews, GBP "Updates"/posts,
profile completeness) for named competitors, to compare against Paint-Techs' own GBP profile.

**This is a manual, low-volume, sequential tool — not a scheduled/automated scraper.** Scraping Google
Maps sits in a ToS gray area at any frequency. Run it yourself when you want a fresh snapshot; don't
wire it into a cron job or CI pipeline. It deliberately does not use proxies, IP rotation, or any
CAPTCHA-bypass automation — if Google shows a CAPTCHA, re-run with `--headful` and solve it by hand.

Isolated from the root Next.js app on purpose: Playwright + its Chromium binary have nothing to do with
the deployed site, so this has its own `package.json`/`node_modules` rather than bloating the root
project's dependencies.

## Setup

```bash
cd scripts/gbp-scraper
npm install
npx playwright install chromium
```

## Usage

```bash
node index.js                                          # all competitors in config/competitors.json
node index.js --competitor="Straight Edge Painting LLC"
node index.js --headful                                 # visible browser (e.g. to solve a rare CAPTCHA)
node index.js --max-reviews=150 --max-posts=30           # defaults: 100 / 20
```

Output lands in `output/<timestamp>/`:
- `<competitor-id>.json` — full normalized data per competitor
- `summary.md` — side-by-side comparison table (review velocity, posting cadence, profile completeness)

The console also prints a `console.table` summary at the end of each run.

## How it works (and its real limitations)

- **Dates are estimates, not exact.** Google's UI only ever shows relative dates ("3 weeks ago"). Each
  review/post gets an `estimatedDate` plus a `precisionDays` window — treat `metrics.reviewsPerMonth`
  etc. as directional trends, not precise counts.
- **Selectors favor `role`/`aria-label` over class names** since Google's class names are obfuscated and
  drift over time. Class-name fallbacks are isolated and comment-tagged with a "last verified" date —
  if extraction starts silently returning empty/wrong data, that's the first place to check.
- **Reviews/Posts are captured primarily via intercepted network responses**, with DOM parsing as a
  fallback. Each record's `extractionMethod` field (`"xhr"` or `"dom"`) tells you which path was used.
- **Identity verification matters, especially for franchises.** 360° Painting operates as a
  territory-based franchise and a same-named-but-different-address listing exists nearby
  ("360 Painting of Southeast Jacksonville"). `locate.js` verifies the resolved listing's phone/website
  against `config/competitors.json` before trusting it, and will error out rather than silently scrape
  the wrong listing. Check `identityVerifiedBy` in the output — if it's `"unverified"`, don't trust that
  competitor's data for that run.
- **The GBP "Updates" tab only shows recent posts** — older posts age out of display. `avgDaysBetweenPosts`
  describes currently-visible posting rhythm, not full historical cadence.
- On first successful run, a competitor's resolved Maps URL gets cached into
  `config/competitors.json` (`mapsUrl`) so later runs skip the search-and-verify step. Delete that
  field to force re-resolution if a listing seems to have moved/changed.
