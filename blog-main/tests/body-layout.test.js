// ABOUTME: Ensures the body layout uses flexible vertical spacing.
// ABOUTME: Confirms body layout uses a full-height flex column.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /body[\s\S]*display:\s*flex/i,
  'Expected body layout to use flexbox.'
);
assertMatches(
  css,
  /body[\s\S]*min-height:\s*100vh/i,
  'Expected body min-height to use the full viewport height.'
);
