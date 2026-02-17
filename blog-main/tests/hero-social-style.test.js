// ABOUTME: Confirms the header layout keeps a single-column title presentation.
// ABOUTME: Ensures the header grid uses one column without top-right links.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-header__inner[\s\S]*display:\s*grid/i,
  'Expected the header inner wrapper to use CSS Grid.'
);
assertMatches(
  css,
  /\.site-header__inner[\s\S]*grid-template-columns:\s*1fr/i,
  'Expected the header grid to keep a single title column.'
);
