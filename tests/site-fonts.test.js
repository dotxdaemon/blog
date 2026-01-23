// ABOUTME: Verifies the site loads monospace fonts on each HTML entry point.
// ABOUTME: Ensures font links include the primary monospace stack choices.
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
    /JetBrains[+\s]*Mono/i.test(html),
    `Expected ${fileName} to load the JetBrains Mono font.`
  );
  assert.ok(
    /Fira[+\s]*Code/i.test(html),
    `Expected ${fileName} to load the Fira Code font.`
  );
});
