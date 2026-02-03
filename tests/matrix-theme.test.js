// ABOUTME: Validates the Matrix Lite theme palette and animation hooks.
// ABOUTME: Ensures fonts, card styles, and cursor effects are configured.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const indexPath = path.join(__dirname, '..', 'index.html');
const appPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');

const css = fs.readFileSync(cssPath, 'utf8');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const appJs = fs.readFileSync(appPath, 'utf8');

assert.ok(css.includes('--bg: #060606;'), 'Expected Matrix Lite background color.');
assert.ok(css.includes('--text: #f5f5f5;'), 'Expected Matrix Lite text color.');
assert.ok(css.includes('--accent: #ff2d2d;'), 'Expected Matrix Lite accent color.');
assert.ok(
  css.includes('--panelBg: #0f0f0f;'),
  'Expected Matrix Lite panel color.'
);
assert.ok(
  css.includes('--border: #f5f5f5;'),
  'Expected Matrix Lite border color.'
);
assert.ok(
  css.includes('--font-sans: var(--font-mono);'),
  'Expected Matrix Lite font stack.'
);
assert.ok(
  css.includes('border: var(--borderWidth) solid var(--border-subtle);'),
  'Expected post card border style.'
);
assert.ok(css.includes('box-shadow: none;'), 'Expected post card hover glow to be removed.');
assert.ok(css.includes('@keyframes decrypt-entry'), 'Expected decrypt-entry keyframes.');
assert.ok(css.includes('@keyframes blink'), 'Expected blink keyframes.');
assert.ok(indexHtml.includes('JetBrains+Mono'), 'Expected JetBrains Mono font link.');
assert.ok(indexHtml.includes('Fira+Code'), 'Expected Fira Code font link.');
assert.ok(appJs.includes('post-feature'), 'Expected post-feature class in renderer.');
assert.ok(appJs.includes('decrypt-entry'), 'Expected decrypt-entry animation in renderer.');
