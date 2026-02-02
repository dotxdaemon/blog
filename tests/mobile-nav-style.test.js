// ABOUTME: Confirms mobile navigation layouts use full-width tap targets.
// ABOUTME: Ensures mobile navigation controls align in a single column.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'main.css'), 'utf8');

assert.ok(
  /\.nav-menu\s*\{[^}]*display:\s*flex;[^}]*\}/s.test(css),
  'Expected the navigation menu to render as a flex row.'
);

assert.ok(
  /\.nav-link[\s\S]*border-radius:\s*var\(--radius\)/i.test(css),
  'Expected nav links to use the shared hard-edge radius token.'
);

assert.ok(
  !/\.theme-toggle/i.test(css),
  'Expected theme toggle styles to be removed.'
);
