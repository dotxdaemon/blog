// ABOUTME: Ensures the homepage columns share the same width at large sizes.
// ABOUTME: Confirms the main layout uses a symmetric two-column grid.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /@media\s*\(min-width:\s*900px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected the homepage to use a symmetric two-column layout at large sizes.'
);
