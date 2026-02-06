// ABOUTME: Ensures homepage behavior preserves the Last.fm data flow.
// ABOUTME: Confirms the Last.fm setup function is still invoked on load.
const { assertMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(
  script,
  /setupListeningWidgets\(\);/i,
  'Expected homepage startup to invoke Last.fm widget setup.'
);
assertMatches(
  script,
  /method=user\.getrecenttracks/i,
  'Expected Last.fm recent tracks API usage to remain in app script.'
);
