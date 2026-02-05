// ABOUTME: Ensures navigation links avoid uppercase text for readability.
// ABOUTME: Confirms the nav link styling does not apply uppercase transformation.
const { assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

assertNotMatches(
  css,
  /\.site-nav a[^}]*text-transform:\s*uppercase/i,
  'Expected navigation links to avoid uppercase text.'
);
