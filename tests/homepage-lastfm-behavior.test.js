// ABOUTME: Ensures homepage behavior preserves the static listening list flow.
// ABOUTME: Confirms the listening setup function is invoked on load.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(
  script,
  /setupListeningAlbums\(\);/i,
  'Expected homepage startup to invoke listening section setup.'
);
assertNotMatches(script, /method=user\.getrecenttracks/i, 'Did not expect Last.fm recent tracks API usage in app script.');
