// ABOUTME: Confirms the homepage layout matches the required sections.
// ABOUTME: Ensures header, navigation, posts, and listening widgets exist.
const assert = require('assert');
const { readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const archivesHtml = readRepoFile('archives.html');
const searchHtml = readRepoFile('search.html');
const matrixHtml = readRepoFile('matrix-gold-rain.html');

assert.ok(
  /<header[^>]*class="site-header"/i.test(html),
  'Expected the page to include a site header.'
);
assert.ok(
  /<div[^>]*class="layout"[\s\S]*<header[^>]*class="site-header"/i.test(html),
  'Expected the page to wrap the header in a layout container.'
);
assert.ok(
  /<div[^>]*class="layout"[\s\S]*<header[^>]*class="site-header"/i.test(archivesHtml),
  'Expected archives.html to wrap the header in a layout container.'
);
assert.ok(
  /<div[^>]*class="layout"[\s\S]*<header[^>]*class="site-header"/i.test(searchHtml),
  'Expected search.html to wrap the header in a layout container.'
);
assert.ok(
  /<div[^>]*class="layout"[\s\S]*<header[^>]*class="site-header"/i.test(matrixHtml),
  'Expected matrix-gold-rain.html to wrap the header in a layout container.'
);
assert.ok(
  /<main[^>]*class="site-main"/i.test(html),
  'Expected the page to include a main content section.'
);
assert.ok(
  /<section[^>]*class="[^"]*post-stream[^"]*"[\s\S]*<h2[^>]*>Recent Posts<\/h2>/i.test(html),
  'Expected the Recent Posts section to include a heading.'
);
assert.ok(/id="posts"/i.test(html), 'Expected the posts container to be present.');
assert.ok(/data-listening-to/i.test(html), 'Expected the listening section to be present.');
