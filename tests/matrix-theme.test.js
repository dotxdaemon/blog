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

assert.ok(css.includes('--background: #0D110F;'), 'Expected Matrix Lite background color.');
assert.ok(css.includes('--foreground: #CBB7FF;'), 'Expected Matrix Lite foreground color.');
assert.ok(css.includes('--accent: #CBB7FF;'), 'Expected Matrix Lite accent color.');
assert.ok(
  css.includes('--surface: rgba(13, 17, 15, 0.9);'),
  'Expected Matrix Lite surface color.'
);
assert.ok(css.includes('--border: #CBB7FF;'), 'Expected Matrix Lite border color.');
assert.ok(
  css.includes("--font-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;"),
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
  /hero__title::after[\s\S]*color:\s*#CBB7FF/i.test(css),
  'Expected the cursor to use a lavender color.'
);
assert.ok(indexHtml.includes('JetBrains+Mono'), 'Expected JetBrains Mono font link.');
assert.ok(indexHtml.includes('Fira+Code'), 'Expected Fira Code font link.');
assert.ok(appJs.includes('post-card'), 'Expected post-card class in renderer.');
assert.ok(appJs.includes('decrypt-entry'), 'Expected decrypt-entry animation in renderer.');
