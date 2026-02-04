// ABOUTME: Ensures navigation links use uppercase text for hierarchy.
// ABOUTME: Confirms the nav link styling applies uppercase transformation.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.site-nav a[\s\S]*text-transform:\s*uppercase/i,
  'Expected navigation links to be uppercase.'
);
