// ABOUTME: Validates the post list grid and border treatments.
// ABOUTME: Ensures posts are centered with no spacing between fields.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-row[\s\S]*display:\s*grid/i,
  'Expected post rows to use CSS Grid.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*grid-template-columns:\s*1fr/i,
  'Expected post rows to use a single column layout.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*justify-items:\s*center/i,
  'Expected post rows to center their contents.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*text-align:\s*center/i,
  'Expected post rows to use centered text.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*gap:\s*0/i,
  'Expected post rows to remove grid gaps.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*padding:\s*0/i,
  'Expected post rows to remove padding.'
);
assertMatches(
  css,
  /\.post-row[\s\S]*border-bottom:\s*var\(--border-width\)\s+solid\s+var\(--black\)/i,
  'Expected post rows to use thick border dividers.'
);
