// ABOUTME: Confirms the refined layout uses a modern system sans stack.
// ABOUTME: Ensures the body typography matches the specified font family.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /font-family:\s*'Inter',\s*'Segoe UI',\s*'Helvetica Neue',\s*Arial,\s*sans-serif/i,
  'Expected the body font stack to be the specified system sans family.'
);
