// ABOUTME: Ensures the homepage avoids full navigation while keeping a small posts shortcut.
// ABOUTME: Confirms posts and search chrome omit archives links and archive-list rendering.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const postsHtml = readRepoFile('posts.html');
const searchHtml = readRepoFile('search.html');
const archivesHtml = readRepoFile('archives.html');
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

assertNotMatches(
  searchHtml,
  /<a[^>]*href="archives\.html"/i,
  'Did not expect search page navigation to include an archives link.'
);

assertNotMatches(
  archivesHtml,
  /id="archives-content"/i,
  'Did not expect archives page to render the archive post list container.'
);

assertNotMatches(
  archivesHtml,
  /assets\/js\/archives\.js/i,
  'Did not expect archives page to load archive list rendering script.'
);
