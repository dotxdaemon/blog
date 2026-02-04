// ABOUTME: Validates the post list grid and border treatments.
// ABOUTME: Ensures posts display as a two-column grid with thick borders.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-row[\s\S]*display:\s*grid/i,
  'Expected post rows to use CSS Grid.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*grid-template-columns:\s*minmax\([^)]*\)\s+1fr/i,
  'Expected post rows to define date and title columns.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*border-bottom:\s*var\(--border-width\)\s+solid\s+var\(--black\)/i,
  'Expected post rows to use thick border dividers.'
);
