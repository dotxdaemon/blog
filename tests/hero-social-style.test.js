// ABOUTME: Ensures the homepage grid favors a two-column symmetry-first layout.
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
  /@media\s*\(min-width:\s*960px\)[\s\S]*\.page\.landing-grid[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/i.test(
    css
  ),
  'Expected the landing grid to switch to a two-column layout on desktop.'
);

assert.ok(
  /\.row-link[\s\S]*padding:\s*var\(--space-1\)\s+0/i.test(css),
  'Expected the homepage row links to keep a compact rhythm.'
);
