// ABOUTME: Ensures the Last.fm widget markup exists on the homepage.
// ABOUTME: Confirms the widget includes status and track list containers.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<section[^>]*class="last-played"[^>]*data-last-played[^>]*>/i,
  'Expected the Last.fm section to be present.'
);
assertMatches(
  html,
  /data-last-played-status/i,
  'Expected the Last.fm status element to be present.'
);
assertMatches(
  html,
  /id="track-grid"/i,
  'Expected the Last.fm track grid container to be present.'
);
