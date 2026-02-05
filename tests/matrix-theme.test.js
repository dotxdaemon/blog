// ABOUTME: Confirms the refined styling uses shared corner radii.
// ABOUTME: Ensures primary panels use the radius token.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-header[\s\S]*border-radius:\s*var\(--radius\)/i,
  'Expected primary panels to use the radius token.'
);
