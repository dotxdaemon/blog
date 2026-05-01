// ABOUTME: Ensures the listening section omits a dedicated artwork image element in the current layout.
// ABOUTME: Confirms dashboard script leaves image metadata unused when the image target is absent.
const {
  assertNotMatches,
  readRepoFile,
} = require('./helpers');

const html = readRepoFile('music.html');
const script = readRepoFile('assets/js/app.js');
const imageElementIdPattern = new RegExp('dashboard-track-' + 'artwork', 'i');
const imageDataPattern = new RegExp('artwork' + 'Url', 'i');

assertNotMatches(html, imageElementIdPattern, 'Did not expect listening section to render a dedicated artwork image element.');
assertNotMatches(script, imageElementIdPattern, 'Did not expect dashboard script to target a dedicated artwork image element.');
assertNotMatches(script, imageDataPattern, 'Did not expect dashboard script to read an image URL field from track data.');
