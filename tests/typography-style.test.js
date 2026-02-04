// ABOUTME: Ensures hierarchy relies on weight and uppercase text.
// ABOUTME: Confirms heading styles use uppercase transformations.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

['.site-title', '.section-title', '.post-title'].forEach((selector) => {
  const pattern = new RegExp(`${selector}[\\s\\S]*text-transform:\\s*uppercase`, 'i');
  assertMatches(css, pattern, `Expected ${selector} to use uppercase text.`);
});
