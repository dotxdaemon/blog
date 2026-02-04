// ABOUTME: Validates the mobile single-column collapse for post rows.
// ABOUTME: Ensures horizontal dividers remain visible on small screens.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /@media\s*\(max-width:\s*600px\)[\s\S]*\.post-row[\s\S]*grid-template-columns:\s*1fr/i,
  'Expected post rows to collapse to a single column on small screens.'
);
assertMatches(
  css,
  /@media\s*\(max-width:\s*600px\)[\s\S]*\.post-row[\s\S]*border-top:/i,
  'Expected post rows to keep horizontal dividers on small screens.'
);
