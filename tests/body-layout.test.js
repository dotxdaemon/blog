// ABOUTME: Ensures the body layout does not force extra vertical space.
// ABOUTME: Confirms body rows and height avoid stretching content.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /body[\s\S]*grid-template-rows:\s*auto\s+auto\s+auto/i,
  'Expected body grid rows to avoid 1fr stretching.'
);
assertMatches(
  css,
  /body[\s\S]*min-height:\s*auto/i,
  'Expected body min-height to avoid forcing viewport height.'
);
