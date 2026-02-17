// ABOUTME: Ensures the footer uses the same card border treatment.
// ABOUTME: Confirms the footer has a visible border divider.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-footer[\s\S]*border:\s*var\(--border-width\)\s+solid\s+var\(--border\)/i,
  'Expected the footer to include a card border divider.'
);
