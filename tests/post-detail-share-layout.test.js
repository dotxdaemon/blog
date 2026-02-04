// ABOUTME: Ensures the footer uses the same brutalist border treatment.
// ABOUTME: Confirms the footer has a visible top border.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-footer[\s\S]*border-top:\s*var\(--border-width\)\s+solid\s+var\(--black\)/i,
  'Expected the footer to include a top border divider.'
);
