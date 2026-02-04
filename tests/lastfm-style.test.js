// ABOUTME: Confirms hover interactions invert colors with no transitions.
// ABOUTME: Ensures the hover utility uses the monochrome palette.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.invert-on-hover:hover[\s\S]*background-color:\s*var\(--black\)[\s\S]*color:\s*var\(--white\)/i,
  'Expected hover styles to invert to black background and white text.'
);
assertMatches(
  css,
  /\.invert-on-hover:hover[\s\S]*transition:\s*none/i,
  'Expected hover styles to use transition: none.'
);
