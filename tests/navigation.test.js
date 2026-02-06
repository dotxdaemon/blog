// ABOUTME: Ensures the homepage includes a compact top navigation.
// ABOUTME: Confirms the header nav block renders quick links.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();
assertMatches(
  html,
  /<nav[^>]*class="site-nav"/i,
  'Expected the homepage header to include navigation links.'
);
assertMatches(
  html,
  /<a[^>]*href="archives\.html"/i,
  'Expected the homepage nav to include an archives link.'
);
