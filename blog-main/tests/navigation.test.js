// ABOUTME: Ensures the homepage header includes primary navigation links.
// ABOUTME: Confirms shared page chrome is available from the landing page.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();
assertMatches(
  html,
  /<nav[^>]*class="site-nav"/i,
  'Expected the homepage header to include primary navigation links.'
);
assertMatches(
  html,
  /<a[^>]*href="archives\.html"/i,
  'Expected homepage navigation to include the archives link.'
);
assertMatches(
  html,
  /<a[^>]*href="search\.html"/i,
  'Expected homepage navigation to include the search link.'
);
assertMatches(
  html,
  /<a[^>]*href="posts\.html"/i,
  'Expected homepage navigation to include the posts link.'
);
