// ABOUTME: Ensures the homepage header removes top-right navigation links.
// ABOUTME: Confirms the compact title-only header is rendered.
const { assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();
assertNotMatches(
  html,
  /<nav[^>]*class="site-nav"/i,
  'Did not expect the homepage header to include top-right navigation links.'
);
assertNotMatches(
  html,
  /<a[^>]*href="archives\.html"/i,
  'Did not expect homepage header archives navigation links.'
);
