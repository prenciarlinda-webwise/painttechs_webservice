const fs = require('fs');
const path = require('path');

function ensureRunDir(baseOutputDir, timestamp) {
  const runDir = path.join(baseOutputDir, timestamp.replace(/[:.]/g, '-'));
  fs.mkdirSync(runDir, { recursive: true });
  return runDir;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function summaryRow(result) {
  const { profile, metrics, postsTabAvailable } = result;
  return {
    Competitor: result.competitor,
    Rating: profile.displayedRating ?? '—',
    Reviews: profile.displayedReviewCount ?? '—',
    'Rev/mo (90d)': metrics.reviewsPerMonth ?? '—',
    'Rev/mo (12mo avg)': metrics.reviewsPerMonthTrailing12 ?? '—',
    'Days since post': postsTabAvailable ? metrics.daysSinceLastPost ?? '—' : 'no Updates tab',
    'Avg days/post': postsTabAvailable ? metrics.avgDaysBetweenPosts ?? '—' : '—',
    Categories: 1 + (profile.categoriesAdditional?.length ?? 0),
    Services: profile.servicesListed?.length ?? 0,
    Photos: profile.photoCount ?? '—',
  };
}

function printConsoleSummary(results) {
  console.log('\nCompetitor GBP snapshot:\n');
  console.table(results.map(summaryRow));
}

function toMarkdownTable(rows) {
  if (rows.length === 0) return '_No results._';
  const headers = Object.keys(rows[0]);
  const headerLine = `| ${headers.join(' | ')} |`;
  const dividerLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const bodyLines = rows.map((row) => `| ${headers.map((h) => row[h]).join(' | ')} |`);
  return [headerLine, dividerLine, ...bodyLines].join('\n');
}

function writeSummaryMarkdown(results, runDir) {
  const rows = results.map(summaryRow);
  const lines = [
    `# GBP Competitor Snapshot — ${new Date().toISOString()}`,
    '',
    toMarkdownTable(rows),
    '',
    '## Notes',
    '',
    '- `Rev/mo (90d)` and `Rev/mo (12mo avg)` are estimated from relative-date text ("3 weeks ago"),',
    '  not exact timestamps — treat as directional trend, not a precise count.',
    '- `Days since post` / `Avg days/post` describe currently-visible posting rhythm only; Google',
    "  ages out older posts from the Updates tab, so this isn't a full historical average.",
    '- Check each `<competitor-id>.json` file\'s `identityVerifiedBy` field before trusting its data —',
    '  `"unverified"` should not appear (the run would have aborted), but `"phone"` vs `"website"`',
    '  tells you which signal confirmed the match.',
    '',
  ];
  fs.writeFileSync(path.join(runDir, 'summary.md'), lines.join('\n'));
}

function writeCompetitorJson(result, runDir) {
  const filePath = path.join(runDir, `${toSlug(result.competitor)}.json`);
  fs.writeFileSync(filePath, `${JSON.stringify(result, null, 2)}\n`);
  return filePath;
}

function writeOutputs(results, baseOutputDir, timestamp) {
  const runDir = ensureRunDir(baseOutputDir, timestamp);
  results.forEach((result) => writeCompetitorJson(result, runDir));
  writeSummaryMarkdown(results, runDir);
  printConsoleSummary(results);
  return runDir;
}

module.exports = { writeOutputs, printConsoleSummary };
