// ABOUTME: Ensures the homepage exposes the Last.fm listening widget container.
// ABOUTME: Confirms the widget includes the track grid placeholder for scrobbles.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

assert.ok(
  /id="music-widget"/i.test(html),
  'Expected a music widget container with id="music-widget".'
);

assert.ok(
  /class="[^"]*listening-widget/i.test(html),
  'Expected the listening widget class on the music widget container.'
);

assert.ok(
  /id="track-grid"/i.test(html),
  'Expected the listening widget to include a track grid container.'
);
