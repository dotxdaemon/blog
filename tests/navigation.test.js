// ABOUTME: Ensures the homepage avoids full navigation while keeping a small posts shortcut.
// ABOUTME: Confirms posts and search chrome omit archives links and archive-list rendering.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const postsHtml = readRepoFile('posts.html');
const searchHtml = readRepoFile('search.html');
const archivesHtml = readRepoFile('archives.html');
const postHtml = readRepoFile('post.html');
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
  searchHtml,
  /<footer[^>]*class="site-footer"/i,
  'Did not expect search page to render the footer block.'
);
assertNotMatches(
  searchHtml,
  /built for reading|>\s*About\s*<|>\s*GitHub\s*</i,
  'Did not expect search page to render legacy footer text or links.'
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
assertNotMatches(
  archivesHtml,
  /<footer[^>]*class="site-footer"/i,
  'Did not expect archives page to render the footer block.'
);
assertNotMatches(
  archivesHtml,
  /built for reading|>\s*About\s*<|>\s*GitHub\s*</i,
  'Did not expect archives page to render legacy footer text or links.'
);

assertMatches(
  postsHtml,
  /<a[^>]*href="index\.html"[^>]*>\s*home\s*<\/a>/,
  'Expected posts page navigation label to be lowercase "home".'
);
assertMatches(
  postsHtml,
  /<a[^>]*href="search\.html"[^>]*>\s*search\s*<\/a>/,
  'Expected posts page navigation label to be lowercase "search".'
);
assertMatches(
  postsHtml,
  /<a[^>]*href="posts\.html"[^>]*>\s*posts\s*<\/a>/,
  'Expected posts page navigation label to be lowercase "posts".'
);
assertMatches(
  searchHtml,
  /<a[^>]*href="index\.html"[^>]*>\s*home\s*<\/a>/,
  'Expected search page navigation label to be lowercase "home".'
);
assertMatches(
  searchHtml,
  /<a[^>]*href="search\.html"[^>]*>\s*search\s*<\/a>/,
  'Expected search page navigation label to be lowercase "search".'
);
assertMatches(
  searchHtml,
  /<a[^>]*href="posts\.html"[^>]*>\s*posts\s*<\/a>/,
  'Expected search page navigation label to be lowercase "posts".'
);
assertMatches(
  archivesHtml,
  /<a[^>]*href="index\.html"[^>]*>\s*home\s*<\/a>/,
  'Expected archives page navigation label to be lowercase "home".'
);
assertMatches(
  archivesHtml,
  /<a[^>]*href="search\.html"[^>]*>\s*search\s*<\/a>/,
  'Expected archives page navigation label to be lowercase "search".'
);
assertMatches(
  archivesHtml,
  /<a[^>]*href="posts\.html"[^>]*>\s*posts\s*<\/a>/,
  'Expected archives page navigation label to be lowercase "posts".'
);
assertMatches(
  postHtml,
  /<a[^>]*href="index\.html"[^>]*>\s*home\s*<\/a>/,
  'Expected post detail navigation label to be lowercase "home".'
);
assertMatches(
  postHtml,
  /<a[^>]*href="search\.html"[^>]*>\s*search\s*<\/a>/,
  'Expected post detail navigation label to be lowercase "search".'
);
assertMatches(
  postHtml,
  /<a[^>]*href="posts\.html"[^>]*>\s*posts\s*<\/a>/,
  'Expected post detail navigation label to be lowercase "posts".'
);
