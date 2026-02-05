// ABOUTME: Confirms the refined layout uses a Merriweather-based stack.
// ABOUTME: Ensures the body typography matches the specified font family.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /font-family:\s*'Merriweather',\s*'Times New Roman',\s*serif/i,
  'Expected the body font stack to be the Merriweather serif family.'
);
