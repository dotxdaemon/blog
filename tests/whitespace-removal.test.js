// ABOUTME: Ensures layout spacing is removed from core post detail elements.
// ABOUTME: Confirms padding, gaps, and margins are reset to eliminate whitespace.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-header[\s\S]*padding:\s*0/i,
  'Expected site header padding to be removed.'
);
assertMatches(
  css,
  /\.site-main[\s\S]*gap:\s*0/i,
  'Expected site main gap to be removed.'
);
assertMatches(
  css,
  /\.site-main[\s\S]*padding:\s*0/i,
  'Expected site main padding to be removed.'
);
assertMatches(
  css,
  /\.post-actions[\s\S]*margin-bottom:\s*0/i,
  'Expected post actions spacing to be removed.'
);
assertMatches(
  css,
  /\.post-detail[\s\S]*gap:\s*0/i,
  'Expected post detail spacing to be removed.'
);
assertMatches(
  css,
  /\.post-meta-row[\s\S]*gap:\s*0/i,
  'Expected post meta spacing to be removed.'
);
assertMatches(
  css,
  /\.post-meta-row[\s\S]*justify-content:\s*center/i,
  'Expected post meta row to be centered.'
);
assertMatches(
  css,
  /\.post-divider[\s\S]*margin:\s*0/i,
  'Expected post divider margins to be removed.'
);
