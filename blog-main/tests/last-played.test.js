// ABOUTME: Ensures the listening section markup exists on the homepage.
// ABOUTME: Confirms the widget includes an album list container.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<section[^>]*class="[^"]*listening-to[^"]*"[^>]*data-listening-to[^>]*>/i,
  'Expected the listening section to be present.'
);
assertMatches(
  html,
  />Listening to</i,
  'Expected the section heading to be Listening to.'
);
assertMatches(
  html,
  /id="album-list"/i,
  'Expected the album list container to be present.'
);
