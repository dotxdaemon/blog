// ABOUTME: Confirms hover interactions invert colors with subtle transitions.
// ABOUTME: Ensures the hover utility uses the shared ink and paper palette.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.invert-on-hover:hover[\s\S]*background-color:\s*var\(--ink\)[\s\S]*color:\s*var\(--paper\)/i,
  'Expected hover styles to invert to ink background and paper text.'
);
assertMatches(
  css,
  /\.invert-on-hover[\s\S]*transition:\s*color\s+150ms\s+ease,\s*background-color\s+150ms\s+ease/i,
  'Expected hover styles to use a subtle color transition.'
);
