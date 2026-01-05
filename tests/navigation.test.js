// ABOUTME: Ensures the mobile nav closes after selecting a link on every page.
// ABOUTME: Keeps responsive navigation behavior consistent across layouts.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const scriptFiles = [
  { file: 'app.js', label: 'homepage' },
  { file: 'archives.js', label: 'archives' },
  { file: 'search.js', label: 'search' },
  { file: 'post-detail.js', label: 'post detail' },
];

scriptFiles.forEach(({ file, label }) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', file), 'utf8');
  const hasLinkListener = /navMenu\.querySelectorAll\(['"]a['"]\)\.forEach\(\(link\)/.test(source);
  const removesOpenClass = /navMenu\.classList\.remove\(['"]is-open['"]\)/.test(source);
  const resetsAria = /navToggle\.setAttribute\(['"]aria-expanded['"], ['"]false['"]\)/.test(source);

  assert.ok(
    hasLinkListener && removesOpenClass && resetsAria,
    `Expected ${label} nav toggle to close the menu when a link is activated.`
  );
});
