// ABOUTME: Ensures the homepage removes the top navigation links.
// ABOUTME: Confirms the nav block is not rendered in the header.
const { assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();
assertNotMatches(
  html,
  /<nav[^>]*class="site-nav"/i,
  'Expected the homepage header to omit the navigation links.'
);
