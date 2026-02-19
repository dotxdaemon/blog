// ABOUTME: Ensures the homepage avoids full navigation while keeping a small posts shortcut.
// ABOUTME: Confirms the posts page omits archives nav and the footer link block.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const postsHtml = readRepoFile('posts.html');
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

assertNotMatches(
  postsHtml,
  /<a[^>]*href="archives\.html"/i,
  'Did not expect posts page navigation to include an archives link.'
);
assertNotMatches(
  postsHtml,
  /<footer[^>]*class="site-footer"/i,
  'Did not expect posts page to render the footer block.'
);
