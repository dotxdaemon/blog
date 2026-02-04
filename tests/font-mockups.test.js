// ABOUTME: Confirms the monochrome layout uses a web-safe mono stack.
// ABOUTME: Ensures the body typography matches the specified font family.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /font-family:\s*'Courier New',\s*Courier,\s*monospace/i,
  'Expected the body font stack to be the specified web-safe mono family.'
);
