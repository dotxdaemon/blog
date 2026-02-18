// ABOUTME: Verifies the Listening To section renders an album artwork grid entry.
// ABOUTME: Ensures hover metadata and the configured The 1975 artwork source are wired.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { assertMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const script = readRepoFile('assets/js/app.js');
const data = readRepoFile('assets/js/listening-to.js');
const css = readStyles();

assertMatches(html, /id="album-list"/i, 'Expected index.html to include an album grid list target.');
assertMatches(script, /function setupListeningAlbums\(/, 'Expected app.js to define a listening album grid renderer.');
assertMatches(script, /className = 'album-overlay'/, 'Expected album renderer to create an overlay label.');
assertMatches(
  css,
  /\.album-item:hover\s+\.album-overlay,[\s\S]*opacity:\s*1/i,
  'Expected album overlay to become visible on hover or focus.'
);
assertMatches(
  data,
  /artwork:\s*['"]assets\/images\/the-1975\.jpg['"]/i,
  'Expected listening data to reference the The 1975 artwork image path.'
);
assertMatches(data, /title:\s*['"]The 1975['"]/i, 'Expected listening data to include The 1975 album title.');
assertMatches(data, /artist:\s*['"]The 1975['"]/i, 'Expected listening data to include The 1975 artist name.');

const artworkPath = path.join(__dirname, '..', 'assets', 'images', 'the-1975.jpg');
assert.ok(
  fs.existsSync(artworkPath),
  'Expected artwork image file at assets/images/the-1975.jpg.'
);
