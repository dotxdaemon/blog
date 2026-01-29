// ABOUTME: Confirms mobile navigation layouts use full-width tap targets.
// ABOUTME: Ensures mobile navigation controls align in a single column.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'main.css'), 'utf8');

assert.ok(
  /\.nav-menu\.is-open\s*\{[^}]*flex-direction:\s*column;[^}]*\}/s.test(css),
  'Expected the open mobile nav menu to stack items in a column.'
);

assert.ok(
  /\.nav-menu\.is-open\s+\.nav-link\s*\{[^}]*padding:\s*0\.65rem 0\.95rem;[^}]*\}/s.test(css),
  'Expected mobile nav links to have larger tap targets.'
);

assert.ok(
  !/\.theme-toggle/i.test(css),
  'Expected theme toggle styles to be removed.'
);
