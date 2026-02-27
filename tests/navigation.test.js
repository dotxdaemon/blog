// ABOUTME: Verifies the site navigation stays consistent across the remaining top-level pages.
// ABOUTME: Ensures home/posts/movies/music links are lowercase and search is fully removed from navigation.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile } = require('./helpers');

const indexHtml = readIndexHtml();
const postsHtml = readRepoFile('posts.html');
const searchHtml = readRepoFile('search.html');
const archivesHtml = readRepoFile('archives.html');
const postHtml = readRepoFile('post.html');
const moviesHtml = readRepoFile('movies.html');
const musicHtml = readRepoFile('music.html');

const navPages = [
  ['index', indexHtml],
  ['posts', postsHtml],
  ['archives', archivesHtml],
  ['post', postHtml],
  ['movies', moviesHtml],
  ['music', musicHtml],
];

navPages.forEach(([pageName, html]) => {
  assertMatches(
    html,
    /<nav[^>]*class="site-nav"[^>]*>/i,
    `Expected ${pageName} page to include the shared site navigation.`
  );
  assertMatches(
    html,
    /<a[^>]*href="index\.html"[^>]*>\s*home\s*<\/a>/i,
    `Expected ${pageName} page to include lowercase "home" nav text.`
  );
  assertMatches(
    html,
    /<a[^>]*href="posts\.html"[^>]*>\s*posts\s*<\/a>/i,
    `Expected ${pageName} page to include lowercase "posts" nav text.`
  );
  assertMatches(
    html,
    /<a[^>]*href="movies\.html"[^>]*>\s*movies\s*<\/a>/i,
    `Expected ${pageName} page to include lowercase "movies" nav text.`
  );
  assertMatches(
    html,
    /<a[^>]*href="music\.html"[^>]*>\s*music\s*<\/a>/i,
    `Expected ${pageName} page to include lowercase "music" nav text.`
  );
  assertNotMatches(
    html,
    /href="archives\.html"/i,
    `Did not expect ${pageName} page navigation to include an archives link.`
  );
  assertNotMatches(
    html,
    /href="search\.html"/i,
    `Did not expect ${pageName} page navigation to include a search link.`
  );
});

assertNotMatches(
  indexHtml,
  /class="[^"]*home-posts-link[^"]*"/i,
  'Did not expect homepage to keep quick-link buttons once shared nav is enabled.'
);

assertMatches(
  indexHtml,
  /<a[^>]*href="index\.html"[^>]*aria-current="page"[^>]*>\s*home\s*<\/a>/i,
  'Expected homepage to mark home as active in the shared nav.'
);
assertMatches(
  postsHtml,
  /<a[^>]*href="posts\.html"[^>]*aria-current="page"[^>]*>\s*posts\s*<\/a>/i,
  'Expected posts page to mark posts as active.'
);
assertMatches(
  moviesHtml,
  /<a[^>]*href="movies\.html"[^>]*aria-current="page"[^>]*>\s*movies\s*<\/a>/i,
  'Expected movies page to mark movies as active.'
);
assertMatches(
  musicHtml,
  /<a[^>]*href="music\.html"[^>]*aria-current="page"[^>]*>\s*music\s*<\/a>/i,
  'Expected music page to mark music as active.'
);

assertNotMatches(
  postsHtml,
  /<footer[^>]*class="site-footer"/i,
  'Did not expect posts page to render the footer block.'
);
assertNotMatches(
  searchHtml,
  /search-input|search-results|assets\/js\/search\.js/i,
  'Did not expect search page to expose search UI or load the search script.'
);
assertMatches(
  searchHtml,
  /http-equiv="refresh"[^>]*content="0;\s*url=posts\.html"/i,
  'Expected search page to redirect immediately to posts.'
);
assertNotMatches(
  archivesHtml,
  /<footer[^>]*class="site-footer"/i,
  'Did not expect archives page to render the footer block.'
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
