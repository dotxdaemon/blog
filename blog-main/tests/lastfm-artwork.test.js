// ABOUTME: Ensures the listening section supports rendering track artwork when available.
// ABOUTME: Confirms dashboard script reads artwork metadata from track data.
const { assertMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const script = readRepoFile('assets/js/app.js');

assertMatches(html, /id="dashboard-track-artwork"/i, 'Expected listening section to include a dashboard artwork image element.');
assertMatches(html, /id="dashboard-track-link"/i, 'Expected listening section to include a dashboard artwork link container.');
assertMatches(script, /artworkUrl/i, 'Expected dashboard script to read an artwork URL from track data.');
assertMatches(script, /dashboard-track-artwork/i, 'Expected dashboard script to target the artwork image element.');
