// ABOUTME: Ensures the homepage exposes the Last.fm listening widget container.
// ABOUTME: Confirms the widget includes the track grid placeholder for scrobbles.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const appPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
const html = fs.readFileSync(indexPath, 'utf8');
const appSource = fs.readFileSync(appPath, 'utf8');

assert.ok(
  /data-last-played[\s\S]*id="track-grid"/i.test(html),
  'Expected the last played section to include the track grid container.'
);

assert.ok(
  !/Last\.fm/.test(html),
  'Expected the last played header to omit Last.fm text.'
);

assert.ok(
  /id="track-grid"/i.test(html),
  'Expected the last played section to include a track grid container.'
);

assert.ok(
  !/id="music-widget"/i.test(html),
  'Expected the standalone music widget container to be removed.'
);

assert.ok(
  /ws\.audioscrobbler\.com/i.test(appSource),
  'Expected the Last.fm API to be handled in assets/js/app.js.'
);

assert.ok(
  !/Recent plays/.test(appSource),
  'Expected the last played logic to avoid a Recent plays status label.'
);

assert.ok(
  !/Last 4 plays on Last\.fm/.test(appSource),
  'Expected the last played status to avoid referencing Last.fm.'
);

assert.ok(
  !/Last 4 plays/.test(appSource),
  'Expected the last played status to avoid mentioning the count.'
);

assert.ok(
  !/ws\.audioscrobbler\.com/i.test(html),
  'Expected the Last.fm API to not be embedded inline in index.html.'
);

assert.ok(
  !/via\.placeholder\.com/i.test(appSource),
  'Expected the Last.fm artwork handling to avoid placeholder URLs.'
);

assert.ok(
  /image\) => image && image\['#text'\]/.test(appSource),
  'Expected the Last.fm artwork handler to prefer the first populated image.'
);
