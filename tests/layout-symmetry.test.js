// ABOUTME: Ensures the homepage uses a clear two-column layout at large sizes.
// ABOUTME: Confirms the main layout uses a weighted two-column grid.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /@media\s*\(min-width:\s*1200px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.2fr\)\s*minmax\(0,\s*0\.8fr\)/i,
  'Expected the homepage to use a weighted two-column layout at large sizes.'
);
