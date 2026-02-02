// ABOUTME: Validates the homepage design tokens and their primary usage.
// ABOUTME: Ensures the core palette and spacing scale are defined and applied.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

[
  '--radius',
  '--borderWidth',
  '--bg',
  '--veil',
  '--panel',
  '--card',
  '--text',
  '--muted',
  '--accent',
].forEach((token) => {
  const pattern = new RegExp(`${token}:`, 'i');
  assert.ok(pattern.test(css), `Expected ${token} to be defined.`);
});

['1', '2', '3', '4', '5', '6'].forEach((step) => {
  const pattern = new RegExp(`--space-${step}:\\s*\\d+px`, 'i');
  assert.ok(pattern.test(css), `Expected --space-${step} to be defined in pixels.`);
});

assert.ok(
  /body[\s\S]*background:\s*var\(--bg\)/i.test(css),
  'Expected the page background to use the --bg token.'
);

assert.ok(
  /body[\s\S]*color:\s*var\(--text\)/i.test(css),
  'Expected the body text color to use the --text token.'
);

assert.ok(
  /\.matrix-veil[\s\S]*background:\s*var\(--veil\)/i.test(css),
  'Expected the matrix veil to use the --veil token.'
);

assert.ok(
  /\.grid-panel[\s\S]*background:\s*var\(--panel\)/i.test(css),
  'Expected panel surfaces to use the --panel token.'
);

assert.ok(
  /\.post-card[\s\S]*background:\s*var\(--card\)/i.test(css),
  'Expected post cards to use the --card token.'
);
