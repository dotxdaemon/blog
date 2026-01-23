// ABOUTME: Verifies post list styling includes spacing and hierarchy cues.
// ABOUTME: Ensures card borders and excerpt color match design expectations.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(css.includes('.post-list {'), 'Expected a .post-list block in main.css.');
assert.ok(
  css.includes('gap: var(--space-4);'),
  'Expected post list items to use vertical spacing via gap.'
);
assert.ok(
  css.includes('.post-card {\n  background: transparent;\n  border: none;'),
  'Expected post cards to render without a filled background.'
);
assert.ok(
  css.includes('font-size: 1.35rem;'),
  'Expected post titles to use a larger font size for hierarchy.'
);
assert.ok(
  css.includes('color: rgba(229, 229, 229, 0.72);'),
  'Expected post excerpts to use a softer text color.'
);
assert.ok(
  /\.post-snippet__excerpt[\s\S]*line-height:\s*1\.6/i.test(css),
  'Expected post excerpts to enforce a 1.6 line height.'
);
