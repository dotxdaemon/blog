// ABOUTME: Confirms the header layout uses a strict grid split for title and nav.
// ABOUTME: Ensures the header grid defines distinct columns.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-header__inner[\s\S]*display:\s*grid/i,
  'Expected the header inner wrapper to use CSS Grid.'
);
assertMatches(
  css,
  /\.site-header__inner[\s\S]*grid-template-columns:\s*1fr\s+auto/i,
  'Expected the header grid to split title and navigation columns.'
);
