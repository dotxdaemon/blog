// ABOUTME: Ensures the listening section omits a dedicated artwork image element in the current layout.
// ABOUTME: Confirms dashboard script still handles track artwork metadata safely when the image target is absent.
const {
  assertMatches,
  assertNotMatches,
  readRepoFile,
  readStyles,
} = require('./helpers');

const html = readRepoFile('music.html');
const script = readRepoFile('assets/js/app.js');
const styles = readStyles();

assertNotMatches(html, /id="dashboard-track-artwork"/i, 'Did not expect listening section to render a dashboard artwork image element.');
assertMatches(html, /id="dashboard-track-link"/i, 'Expected listening section to include a dashboard artwork link container.');
assertMatches(script, /artworkUrl/i, 'Expected dashboard script to read an artwork URL from track data.');
assertMatches(script, /dashboard-track-artwork/i, 'Expected dashboard script to target the artwork image element.');
assertNotMatches(
  styles,
  /(?:^|\n)\.dashboard-track-artwork\s*\{[^}]*display:\s*none/i,
  'Did not expect .dashboard-track-artwork to force display:none in all states.'
);
