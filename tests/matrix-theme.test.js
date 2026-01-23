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

assert.ok(css.includes('--background: #050505;'), 'Expected Matrix Lite background color.');
assert.ok(css.includes('--foreground: #E5E5E5;'), 'Expected Matrix Lite foreground color.');
assert.ok(css.includes('--accent: #D8B4FE;'), 'Expected Matrix Lite accent color.');
assert.ok(css.includes('--surface: rgba(5, 5, 5, 0.9);'), 'Expected Matrix Lite surface color.');
assert.ok(
  css.includes('--border: rgba(255, 255, 255, 0.18);'),
  'Expected Matrix Lite border color.'
);
assert.ok(
  css.includes("--font-sans: 'SF Mono', 'Fira Code', 'JetBrains Mono', 'Courier Prime', 'Courier New', monospace;"),
  'Expected Matrix Lite font stack.'
);
assert.ok(
  css.includes('border: 1px solid var(--border);'),
  'Expected post card border style.'
);
assert.ok(css.includes('box-shadow: none;'), 'Expected post card hover glow to be removed.');
assert.ok(css.includes('@keyframes decrypt-entry'), 'Expected decrypt-entry keyframes.');
assert.ok(css.includes('@keyframes blink'), 'Expected blink keyframes.');
assert.ok(
  /hero__title::after[\s\S]*color:\s*var\(--accent\)/i.test(css),
  'Expected the cursor to use the accent color.'
);
assert.ok(indexHtml.includes('JetBrains+Mono'), 'Expected JetBrains Mono font link.');
assert.ok(indexHtml.includes('Fira+Code'), 'Expected Fira Code font link.');
assert.ok(appJs.includes('post-card'), 'Expected post-card class in renderer.');
assert.ok(appJs.includes('decrypt-entry'), 'Expected decrypt-entry animation in renderer.');
