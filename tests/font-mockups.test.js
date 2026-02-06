// ABOUTME: Confirms the refined layout uses a Inter-based stack.
// ABOUTME: Ensures the body typography matches the specified font family.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /font-family:\s*'Inter',\s*system-ui,\s*-apple-system,\s*sans-serif/i,
  'Expected the body font stack to use Inter and system sans-serif fallbacks.'
);
