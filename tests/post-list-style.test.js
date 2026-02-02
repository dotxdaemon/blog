// ABOUTME: Verifies post list styling includes spacing and hierarchy cues.
// ABOUTME: Ensures card borders and excerpt color match design expectations.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(css.includes('.post-list {'), 'Expected a .post-list block in main.css.');
assert.ok(
  css.includes('gap: var(--space-3);'),
  'Expected post list items to use vertical spacing via gap.'
);
assert.ok(
  css.includes('.post-card {\n  background: var(--card);\n  border: var(--borderWidth) solid var(--border-subtle);'),
  'Expected post cards to render on a subtle surface with a border.'
);
assert.ok(
  css.includes('font-size: var(--type-card);'),
  'Expected post titles to use a larger font size for hierarchy.'
);
assert.ok(
  css.includes('color: var(--muted);'),
  'Expected post excerpts to use a muted text color.'
);
assert.ok(
  /\.post-snippet__excerpt[\s\S]*line-height:\s*1\.6/i.test(css),
  'Expected post excerpts to enforce a 1.6 line height.'
);
assert.ok(
  /\.post-snippet__excerpt[\s\S]*-webkit-line-clamp:\s*2/i.test(css),
  'Expected post excerpts to line clamp to two lines.'
);

assert.ok(
  /\.post-card--featured[\s\S]*border-color:\s*var\(--border\)/i.test(css),
  'Expected the featured post card to reinforce the primary border color.'
);

assert.ok(
  /\.post-card--featured::after[\s\S]*background:\s*var\(--accent\)/i.test(css),
  'Expected the featured post card to include an accent corner marker.'
);
