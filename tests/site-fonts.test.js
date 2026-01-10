// ABOUTME: Verifies the site loads the Merriweather font on each HTML entry point.
// ABOUTME: Ensures font links include Merriweather for consistent typography.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'archives.html',
  'post.html',
  'search.html',
  'matrix-gold-rain.html',
];

htmlFiles.forEach((fileName) => {
  const htmlPath = path.join(__dirname, '..', fileName);
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.ok(
    /Merriweather/.test(html),
    `Expected ${fileName} to load the Merriweather font.`
  );
});
