// ABOUTME: Verifies Last.fm track grid styling matches the blog theme.
// ABOUTME: Ensures the track card typography and layout styles are defined.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(css.includes('.track-grid {'), 'Expected track grid styles to be defined.');
assert.ok(css.includes('.track-card {'), 'Expected track card styles to be defined.');
assert.ok(
  css.includes('font-family: var(--font-sans);'),
  'Expected Last.fm track text to use the blog typography.'
);
