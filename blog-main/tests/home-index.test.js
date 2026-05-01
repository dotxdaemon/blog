// ABOUTME: Verifies the homepage acts as a sparse personal index.
// ABOUTME: Keeps the music artwork wall scoped to the dedicated music page.
const {
  assertMatches,
  assertNotMatches,
  readIndexHtml,
  readRepoFile,
  readStyles,
} = require('./helpers');

const indexHtml = readIndexHtml();
const musicHtml = readRepoFile('music.html');
const appScript = readRepoFile('assets/js/app.js');
const css = readStyles();

assertMatches(indexHtml, /class="[^"]*home-index[^"]*"/i, 'Expected homepage to render a personal index layout.');
assertMatches(indexHtml, /id="latest-writing"/i, 'Expected homepage to include latest writing.');
assertMatches(indexHtml, /id="posts"[^>]*data-limit="3"/i, 'Expected homepage writing list to render three posts.');
assertMatches(indexHtml, /id="currently-listening"/i, 'Expected homepage to include currently listening.');
assertMatches(indexHtml, /id="recent-obsessions"/i, 'Expected homepage to include recent obsessions.');
assertMatches(indexHtml, /href="music\.html"[\s\S]*>\s*music\s*</i, 'Expected homepage obsessions to link to music.');
assertMatches(indexHtml, /href="movies\.html"[\s\S]*>\s*movies\s*</i, 'Expected homepage obsessions to link to movies.');
assertMatches(indexHtml, /href="games\.html"[\s\S]*>\s*games\s*</i, 'Expected homepage obsessions to link to games.');
assertNotMatches(indexHtml, /id="album-list"/i, 'Did not expect homepage to render the album grid.');
assertNotMatches(indexHtml, /assets\/js\/listening-to\.js/i, 'Did not expect homepage to load the album data script.');
assertNotMatches(indexHtml, /assets\/js\/artwork-grid\.js/i, 'Did not expect homepage to load the artwork grid script.');
assertMatches(musicHtml, /id="album-list"[^>]*data-source="LISTENING_TO_ALBUMS"/i, 'Expected music page to keep the album grid.');
assertMatches(appScript, /postList\.dataset\.limit/i, 'Expected post rendering to support a homepage list limit.');
assertMatches(css, /\.home-index\s*\{[\s\S]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/i, 'Expected homepage index to use the site grid.');
assertMatches(css, /\.home-obsession-list\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/i, 'Expected obsession links to render as three lanes.');
