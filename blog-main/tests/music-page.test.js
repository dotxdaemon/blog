// ABOUTME: Verifies the music page renders the listening album grid with shared renderer wiring.
// ABOUTME: Ensures music navigation state and script dependencies are correctly declared.
const { assertMatches, readRepoFile } = require('./helpers');

const html = readRepoFile('music.html');

assertMatches(
  html,
  /<ul[^>]*id="album-list"[^>]*>/i,
  'Expected music.html to include the album grid target.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-source="LISTENING_TO_ALBUMS"/i,
  'Expected music page album grid to use LISTENING_TO_ALBUMS.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/listening-to\.js"[^>]*><\/script>/i,
  'Expected music page to load listening-to.js data.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/app\.js"[^>]*type="module"[^>]*><\/script>/i,
  'Expected music page to load app.js as a module.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/artwork-grid\.js"[^>]*type="module"[^>]*><\/script>/i,
  'Expected music page to load artwork-grid.js as a module.'
);
assertMatches(
  html,
  /<a[^>]*href="music\.html"[^>]*aria-current="page"[^>]*>\s*music\s*<\/a>/i,
  'Expected music page to mark music as the active navigation link.'
);
