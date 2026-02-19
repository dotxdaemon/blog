// ABOUTME: Ensures the homepage avoids full navigation while keeping a small posts shortcut.
// ABOUTME: Confirms only a subtle posts link appears in the homepage header.
const { assertMatches, assertNotMatches, readIndexHtml } = require('./helpers');

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
assertMatches(
  html,
  /<a[^>]*class="[^"]*home-posts-link[^"]*"[^>]*href="posts\.html"[^>]*>posts<\/a>/i,
  'Expected homepage header to include a small posts shortcut link.'
);
