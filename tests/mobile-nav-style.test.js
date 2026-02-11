// ABOUTME: Validates the mobile single-column collapse for post rows.
// ABOUTME: Ensures card borders remain visible on small screens.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-row[\s\S]*grid-template-columns:\s*1fr/i,
  'Expected post rows to collapse to a single column on small screens.'
);
assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-row[\s\S]*border:/i,
  'Expected post rows to keep card borders on small screens.'
);
