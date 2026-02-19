// ABOUTME: Verifies the Listening To section renders artwork entries from the requested album list.
// ABOUTME: Ensures configured entries are unique and each has a remote iTunes artwork URL.
const assert = require('assert');
const path = require('path');
const { assertMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const script = readRepoFile('assets/js/app.js');
const css = readStyles();

assertMatches(html, /id="album-list"/i, 'Expected index.html to include an album grid list target.');
assertMatches(
  css,
  /\.listening-to\s*\{[^}]*width:\s*100%/i,
  'Expected listening module to use full available width so album tiles do not collapse.'
);
assertMatches(
  css,
  /\.album-item\s*\{[^}]*width:\s*100%/i,
  'Expected album tiles to span their grid column width.'
);
assertMatches(script, /function setupListeningAlbums\(/, 'Expected app.js to define a listening album grid renderer.');
assertMatches(script, /className = 'album-overlay'/, 'Expected album renderer to create an overlay label.');
assertMatches(
  css,
  /\.album-item:hover\s+\.album-overlay,[\s\S]*opacity:\s*1/i,
  'Expected album overlay to become visible on hover or focus.'
);

const listeningDataPath = path.join(__dirname, '..', 'assets', 'js', 'listening-to.js');
global.window = {};
delete require.cache[listeningDataPath];
require(listeningDataPath);
const albums = Array.isArray(global.window.LISTENING_TO_ALBUMS) ? global.window.LISTENING_TO_ALBUMS : [];

assert.strictEqual(albums.length, 19, 'Expected 19 unique listening albums.');

const keyFor = (album) => `${String(album.title || '').trim().toLowerCase()}::${String(album.artist || '').trim().toLowerCase()}`;
const uniqueKeys = new Set(albums.map(keyFor));
assert.strictEqual(uniqueKeys.size, albums.length, 'Expected duplicate album entries to be removed.');

albums.forEach((album) => {
  assert.ok(
    /^https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\//i.test(String(album.artwork || '')),
    `Expected "${album.title}" to use a remote iTunes artwork URL.`
  );
});

const expectedPairs = [
  ['My Beautiful Dark Twisted Fantasy', 'Kanye West'],
  ['Voicenotes', 'Charlie Puth'],
  ['Colors', 'Between the Buried and Me'],
  ['Take Care', 'Drake'],
  ['Good at Falling', 'The Japanese House'],
  ['The 1975', 'The 1975'],
  ['I like it when you sleep, for you are so beautiful yet so unaware of it', 'The 1975'],
  ['Notes on a Conditional Form', 'The 1975'],
  ['Being Funny in a Foreign Language', 'The 1975'],
  ['Skrillex and Diplo present Jack U', 'Jack U'],
  ['Quest For Fire', 'Skrillex'],
  ['Lonerism', 'Tame Impala'],
  ['Currents', 'Tame Impala'],
  ['Bait Ones', 'Jai Paul'],
  ['Nostalgia, Ultra', 'Frank Ocean'],
  ['My Dinosaur Life', 'Motion City Soundtrack'],
  ['Golden Hour', 'Kacey Musgraves'],
  ['Nurture', 'Porter Robinson'],
  ['Worlds', 'Porter Robinson'],
];

for (const [title, artist] of expectedPairs) {
  assert.ok(
    albums.some((album) => album && album.title === title && album.artist === artist),
    `Expected listening data to include "${title}" by ${artist}.`
  );
}
