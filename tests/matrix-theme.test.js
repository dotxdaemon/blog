// ABOUTME: Confirms the brutalist styling removes rounded corners.
// ABOUTME: Ensures the stylesheet zeroes border radius globally.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\*\s*\{[\s\S]*border-radius:\s*0/i,
  'Expected a global border-radius reset of 0.'
);
