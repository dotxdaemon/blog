// ABOUTME: Verifies the Listening To section renders artwork entries from the requested album list.
// ABOUTME: Ensures configured entries are unique and include restored favorites plus Frank cover override.
const assert = require('assert');
const path = require('path');
const {
  assertMatches,
  assertNotMatches,
  readIndexHtml,
  readRepoFile,
  readStyles,
} = require('./helpers');

const indexHtml = readIndexHtml();
const html = readRepoFile('music.html');
const script = readRepoFile('assets/js/app.js');
const css = readStyles();

assertMatches(html, /id="album-list"/i, 'Expected music.html to include an album grid list target.');
assertMatches(
  html,
  /id="album-list"[^>]*data-source="LISTENING_TO_ALBUMS"/i,
  'Expected music page album grid to use LISTENING_TO_ALBUMS as its data source.'
);
assertNotMatches(
  indexHtml,
  /id="album-list"/i,
  'Did not expect homepage to render the listening album grid after moving albums to music page.'
);
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
assertMatches(
  script,
  /albumList\.dataset\.source/i,
  'Expected app.js to support selecting the listening grid data source from dataset attributes.'
);
assertMatches(
  script,
  /window\[sourceKey\]/,
  'Expected app.js to resolve listening data from a global key selected by dataset source.'
);
assertMatches(
  script,
  /albumList\.dataset\.overlay/i,
  'Expected app.js to support overlay mode selection from dataset attributes.'
);
assertMatches(
  script,
  /overlayMode === 'title'/,
  'Expected app.js to support title-only overlay labels.'
);
assertMatches(
  script,
  /classList\.toggle\('is-overlay-visible'\)/,
  'Expected app.js to toggle album overlay visibility state on touch click.'
);
assertMatches(
  script,
  /matchMedia\('\(hover:\s*none\),\s*\(pointer:\s*coarse\)'\)/,
  'Expected app.js to scope overlay click toggles to touch/coarse-pointer contexts.'
);
assertMatches(script, /className = 'album-overlay'/, 'Expected album renderer to create an overlay label.');
assertMatches(script, /function shuffleAlbums\(/, 'Expected app.js to define an album shuffling helper.');
assertMatches(script, /Math\.random\(/, 'Expected album shuffle logic to use randomized ordering.');
assertMatches(
  css,
  /\.album-item:hover\s+\.album-overlay,[\s\S]*opacity:\s*1/i,
  'Expected album overlay to become visible on hover or focus.'
);
assertMatches(
  css,
  /\.album-item\.is-overlay-visible\s+\.album-overlay\s*\{[\s\S]*opacity:\s*1/i,
  'Expected album overlay to become visible when touch users toggle an active item.'
);
assertMatches(
  css,
  /@media\s*\(hover:\s*none\),\s*\(pointer:\s*coarse\)[\s\S]*\.album-overlay\s*\{[\s\S]*opacity:\s*0/i,
  'Expected touch styles to keep overlays hidden until users tap an item.'
);
assertMatches(
  css,
  /\.album-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected desktop listening grid to render 4 albums across.'
);
assertMatches(
  css,
  /@media\s*\(hover:\s*none\),\s*\(pointer:\s*coarse\)[\s\S]*\.album-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected touch layout to show a denser 2-column album grid.'
);

const listeningDataPath = path.join(__dirname, '..', 'assets', 'js', 'listening-to.js');
global.window = {};
delete require.cache[listeningDataPath];
require(listeningDataPath);
const albums = Array.isArray(global.window.LISTENING_TO_ALBUMS) ? global.window.LISTENING_TO_ALBUMS : [];

assert.strictEqual(albums.length, 43, 'Expected 43 unique listening albums including the latest additions.');

const keyFor = (album) => `${String(album.title || '').trim().toLowerCase()}::${String(album.artist || '').trim().toLowerCase()}`;
const uniqueKeys = new Set(albums.map(keyFor));
assert.strictEqual(uniqueKeys.size, albums.length, 'Expected duplicate album entries to be removed.');

albums.forEach((album) => {
  if (album && album.title === 'Nostalgia, Ultra' && album.artist === 'Frank Ocean') {
    assert.strictEqual(
      album.artwork,
      'assets/images/frank.jpeg',
      'Expected Nostalgia, Ultra to use the local Frank artwork image.'
    );
    return;
  }
  assert.ok(
    /^https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\//i.test(String(album.artwork || '')) ||
      /^assets\/images\//i.test(String(album.artwork || '')),
    `Expected "${album.title}" to use a valid artwork URL or local image path.`
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
  ["Time 'n' Place", 'Kero Kero Bonito'],
  ['From Under the Cork Tree', 'Fall Out Boy'],
  ['F*CK U SKRILLEX YOU THINK UR ANDY WARHOL BUT UR NOT!! <3', 'Skrillex'],
  ['Blue Rev', 'Alvvays'],
  ['Two Star & The Dream Police', 'Mk.gee'],
  ['A LA SALA', 'Khruangbin'],
  ['Mirrors', 'DJ Seinfeld'],
  ['Blue Weekend', 'Wolf Alice'],
  ['Persona 5 (Original Soundtrack)', 'ATLUS Sound Team'],
  ['Forever', 'Charly Bliss'],
  ['the record', 'boygenius'],
  ['Oncle Jazz', 'Men I Trust'],
  ["Short n' Sweet", 'Sabrina Carpenter'],
  ['Late Registration', 'Kanye West'],
  ['Modern Vampires of the City', 'Vampire Weekend'],
  ['House of Balloons', 'The Weeknd'],
  ['The Suburbs', 'Arcade Fire'],
  ['Contra', 'Vampire Weekend'],
  ['Settle', 'Disclosure'],
  ['Flockaveli', 'Waka Flocka Flame'],
  ['Discovery', 'Daft Punk'],
  ['Lush', 'Snail Mail'],
  ['Untrue', 'Burial'],
  ['Punisher', 'Phoebe Bridgers'],
];

for (const [title, artist] of expectedPairs) {
  assert.ok(
    albums.some((album) => album && album.title === title && album.artist === artist),
    `Expected listening data to include "${title}" by ${artist}.`
  );
}
