// ABOUTME: Ensures the Last.fm widget renders album artwork tiles.
// ABOUTME: Confirms the widget builds image elements and artist overlays.
const { assertMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(
  script,
  /createElement\(['"]img['"]\)/i,
  'Expected the Last.fm widget to create album artwork images.'
);
assertMatches(
  script,
  /track-image/i,
  'Expected the Last.fm widget to apply a track-image class.'
);
assertMatches(
  script,
  /track-overlay/i,
  'Expected the Last.fm widget to render an artist overlay.'
);
