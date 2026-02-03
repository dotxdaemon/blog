// ABOUTME: Verifies Last.fm track grid styling matches the blog theme.
// ABOUTME: Ensures the track card typography and layout styles are defined.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(css.includes('.track-grid {'), 'Expected track list styles to be defined.');
assert.ok(css.includes('.list-row {'), 'Expected list row styles to be defined.');
assert.ok(
  css.includes('grid-template-columns: repeat(2, minmax(0, 1fr));'),
  'Expected the recent track list to render as a 2x2 grid.'
);
assert.ok(
  css.includes('.album-tile__label {'),
  'Expected album tile label styles to be defined.'
);
assert.ok(
  /\.album-tile:hover[\s\S]*?\.album-tile__label[\s\S]*opacity:\s*1/i.test(css),
  'Expected album tile labels to reveal on hover.'
);
assert.ok(
  /\.panel--album[\s\S]*border:\s*none/i.test(css),
  'Expected the album panel to avoid a visible border.'
);
assert.ok(
  /\.panel--album[\s\S]*background:\s*transparent/i.test(css),
  'Expected the album panel to avoid a visible background.'
);
assert.ok(
  /\.album-tile\s*\{[^}]*box-shadow:\s*none/i.test(css),
  'Expected album tiles to avoid heavy box shadows.'
);
assert.ok(
  /\.album-tile\s*\{[^}]*border:\s*var\(--borderWidth\)\s+solid\s+var\(--border-subtle\)/i.test(
    css
  ),
  'Expected album tiles to use the subtle border color.'
);
assert.ok(
  /\.album-tile__label[\s\S]*font-weight:\s*700/i.test(css),
  'Expected album tile labels to use bold typography.'
);
assert.ok(
  css.includes('font-family: var(--font-sans);'),
  'Expected Last.fm track text to use the blog typography.'
);
assert.ok(
  css.includes('text-overflow: ellipsis;'),
  'Expected the track text to truncate overflowing titles.'
);
assert.ok(
  /\.list-row[\s\S]*text-overflow:\s*ellipsis/i.test(css),
  'Expected list rows to truncate overflowing titles.'
);
assert.ok(
  css.includes('.loading {'),
  'Expected loading state styles to be defined for Last.fm tracks.'
);
assert.ok(
  css.includes('@keyframes pulse {'),
  'Expected the now-playing icon to use a pulse animation.'
);
