// ABOUTME: Ensures the featured widget markup exists on the homepage.
// ABOUTME: Confirms the widget includes a featured card container.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<section[^>]*class="featured"[^>]*>/i,
  'Expected the featured section to be present.'
);
assertMatches(
  html,
  /id="featured-card"/i,
  'Expected the featured card container to be present.'
);
