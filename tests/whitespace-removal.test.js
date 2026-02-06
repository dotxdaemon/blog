// ABOUTME: Ensures layout spacing follows the shared spacing scale.
// ABOUTME: Confirms padding, gaps, and margins are consistently applied.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-header[\s\S]*padding-bottom:\s*var\(--space-2\)/i,
  'Expected site header padding to use the shared spacing scale.'
);
assertMatches(
  css,
  /\.site-main[\s\S]*gap:\s*24px/i,
  'Expected site main gap to use the shared spacing scale.'
);
assertMatches(
  css,
  /\.site-main[\s\S]*padding:\s*0/i,
  'Expected site main padding to use the shared spacing scale.'
);
assertMatches(
  css,
  /\.post-detail[\s\S]*gap:\s*var\(--space-4\)/i,
  'Expected post detail spacing to use the shared scale.'
);
assertMatches(
  css,
  /\.post-meta-row[\s\S]*gap:\s*var\(--space-2\)/i,
  'Expected post meta spacing to use the shared scale.'
);
assertMatches(
  css,
  /\.post-meta-row[\s\S]*justify-content:\s*flex-start/i,
  'Expected post meta row to align to the start.'
);
assertMatches(
  css,
  /\.post-divider[\s\S]*margin:\s*var\(--space-4\)\s+0/i,
  'Expected post divider margins to use the shared scale.'
);
