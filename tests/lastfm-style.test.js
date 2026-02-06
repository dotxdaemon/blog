// ABOUTME: Confirms hover interactions use subtle emphasis transitions.
// ABOUTME: Ensures the hover utility retains readable contrast while highlighting borders.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.invert-on-hover:hover[\s\S]*color:\s*var\(--ink\)/i,
  'Expected hover styles to keep readable ink text.'
);
assertMatches(
  css,
  /\.invert-on-hover[\s\S]*transition:\s*color\s+150ms\s+ease,\s*background-color\s+150ms\s+ease,\s*border-color\s+150ms\s+ease/i,
  'Expected hover styles to include color and border transitions.'
);
