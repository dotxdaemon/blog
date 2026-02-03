// ABOUTME: Ensures the homepage grid favors a two-column asymmetric layout.
// ABOUTME: Confirms the latest writing link list maintains compact spacing.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  /\.page\.landing-grid[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/i.test(css),
  'Expected the landing grid to define a single-column mobile baseline.'
);

assert.ok(
  /\.page\.landing-grid[\s\S]*width:\s*100%/i.test(css),
  'Expected the landing grid to stretch to the full width for the album layout.'
);

assert.ok(
  /\.list-row[\s\S]*padding:\s*18px\s+var\(--space-2\)/i.test(css),
  'Expected the homepage list rows to use the standard vertical padding.'
);
