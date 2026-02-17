// ABOUTME: Validates the post list layout and card treatments.
// ABOUTME: Ensures posts are left-aligned with comfortable spacing.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-row[\s\S]*display:\s*grid/i,
  'Expected post rows to use CSS Grid.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*grid-template-columns:\s*minmax\(94px,\s*120px\)\s+72px\s+1fr\s+auto/i,
  'Expected post rows to separate dates, titles, and affordance into three columns.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*justify-items:\s*start/i,
  'Expected post rows to left-align their contents.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*text-align:\s*left/i,
  'Expected post rows to use left-aligned text.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*gap:\s*var\(--space-2\)/i,
  'Expected post rows to use the shared spacing scale.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*padding:\s*14px/i,
  'Expected post rows to include card padding.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*border:\s*var\(--border-width\)\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.08\)/i,
  'Expected post rows to use the shared card border.'
);
