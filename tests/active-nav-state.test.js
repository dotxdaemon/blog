// ABOUTME: Verifies current-page navigation links are explicitly marked in templates.
// ABOUTME: Ensures active nav styling uses high contrast and remains clear on mobile.
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const indexHtml = readRepoFile('index.html');
const archivesHtml = readRepoFile('archives.html');
const searchHtml = readRepoFile('search.html');
const postsHtml = readRepoFile('posts.html');
const css = readStyles();

assertMatches(
  indexHtml,
  /<a[^>]*href="index\.html"[^>]*aria-current="page"/i,
  'Expected index navigation to mark Home as the current page.'
);
assertMatches(
  archivesHtml,
  /<a[^>]*href="archives\.html"[^>]*aria-current="page"/i,
  'Expected archives navigation to mark Archives as the current page.'
);
assertMatches(
  searchHtml,
  /<a[^>]*href="search\.html"[^>]*aria-current="page"/i,
  'Expected search navigation to mark Search as the current page.'
);
assertMatches(
  postsHtml,
  /<a[^>]*href="posts\.html"[^>]*aria-current="page"/i,
  'Expected posts navigation to mark Posts as the current page.'
);
assertMatches(
  css,
  /\.site-nav a\[aria-current='page'\][\s\S]*background-color:/i,
  'Expected active navigation links to have a high-contrast fill color.'
);
assertMatches(
  css,
  /\.site-nav a\[aria-current='page'\][\s\S]*(border|text-decoration)/i,
  'Expected active navigation links to include a visible accent.'
);
assertNotMatches(css, /\.site-nav a\[aria-current='page'\]:hover/i, 'Did not expect active navigation hover state styles.');
assertMatches(
  css,
  /@media\s*\(max-width:\s*600px\)[\s\S]*\.site-nav a\[aria-current='page'\][\s\S]*(border|text-decoration|color)/i,
  'Expected mobile nav rules to keep current-page links visually clear.'
);
