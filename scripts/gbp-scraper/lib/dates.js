// Google's Maps UI never shows exact dates for reviews/posts — only relative text
// ("3 weeks ago"). We convert that to a point estimate plus an explicit precision
// window, and report velocity as coarse trailing-window counts rather than false-
// precision daily averages (see README).

const DAY_MS = 24 * 60 * 60 * 1000;
const UNIT_MS = { day: DAY_MS, week: 7 * DAY_MS, month: 30 * DAY_MS, year: 365 * DAY_MS };
const PRECISION_DAYS = { day: 0.5, week: 3.5, month: 15, year: 182 };

function parseRelativeDate(text, referenceDate = new Date()) {
  if (!text) return { estimatedDate: null, precisionDays: null };
  const normalized = text.trim().toLowerCase();

  const singular = normalized.match(/^an?\s+(day|week|month|year)\s+ago$/);
  if (singular) {
    const unit = singular[1];
    return {
      estimatedDate: new Date(referenceDate.getTime() - UNIT_MS[unit]).toISOString(),
      precisionDays: PRECISION_DAYS[unit],
    };
  }

  const plural = normalized.match(/^(\d+)\s+(day|week|month|year)s?\s+ago$/);
  if (plural) {
    const n = Number(plural[1]);
    const unit = plural[2];
    return {
      estimatedDate: new Date(referenceDate.getTime() - n * UNIT_MS[unit]).toISOString(),
      precisionDays: PRECISION_DAYS[unit],
    };
  }

  return { estimatedDate: null, precisionDays: null };
}

function countWithinTrailingDays(items, days, referenceDate = new Date()) {
  const cutoff = referenceDate.getTime() - days * DAY_MS;
  return items.filter((item) => item.estimatedDate && new Date(item.estimatedDate).getTime() >= cutoff)
    .length;
}

function computeReviewMetrics(reviews, referenceDate = new Date()) {
  const last90 = countWithinTrailingDays(reviews, 90, referenceDate);
  const last365 = countWithinTrailingDays(reviews, 365, referenceDate);
  return {
    reviewsPerMonth: Number((last90 / 3).toFixed(2)),
    reviewsPerMonthTrailing12: Number((last365 / 12).toFixed(2)),
  };
}

function computePostMetrics(posts, referenceDate = new Date()) {
  const dated = posts
    .filter((p) => p.estimatedDate)
    .map((p) => new Date(p.estimatedDate).getTime())
    .sort((a, b) => b - a);

  if (dated.length === 0) {
    return { daysSinceLastPost: null, avgDaysBetweenPosts: null };
  }

  const daysSinceLastPost = Math.round((referenceDate.getTime() - dated[0]) / DAY_MS);

  let avgDaysBetweenPosts = null;
  if (dated.length >= 2) {
    const gaps = [];
    for (let i = 0; i < dated.length - 1; i += 1) {
      gaps.push((dated[i] - dated[i + 1]) / DAY_MS);
    }
    avgDaysBetweenPosts = Number((gaps.reduce((a, b) => a + b, 0) / gaps.length).toFixed(1));
  }

  return { daysSinceLastPost, avgDaysBetweenPosts };
}

module.exports = { parseRelativeDate, computeReviewMetrics, computePostMetrics };
