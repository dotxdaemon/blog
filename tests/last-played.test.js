// ABOUTME: Ensures the last played widget markup exists on the homepage.
// ABOUTME: Confirms the widget includes a status node and track list.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<section[^>]*data-last-played[^>]*>/i,
  'Expected the last played section to be present.'
);
assertMatches(
  html,
  /data-last-played-status/i,
  'Expected the last played status element to be present.'
);
assertMatches(
  html,
  /id="track-grid"/i,
  'Expected the track grid container to be present.'
);
