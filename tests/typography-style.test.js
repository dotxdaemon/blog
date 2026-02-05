// ABOUTME: Ensures hierarchy relies on weight and mixed-case text.
// ABOUTME: Confirms heading styles avoid uppercase transformations.
const { assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

['.site-title', '.section-title', '.post-title'].forEach((selector) => {
  const pattern = new RegExp(`${selector}[^}]*text-transform:\\s*uppercase`, 'i');
  assertNotMatches(css, pattern, `Expected ${selector} to avoid uppercase text.`);
});
