// ABOUTME: Verifies every primary page uses the shared header and footer chrome.
// ABOUTME: Prevents broken footer links and missing dynamic year targets.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const pageFiles = [
  'index.html',
  'posts.html',
  'search.html',
  'archives.html',
  'post.html',
];

pageFiles.forEach((file) => {
  const html = readRepoFile(file);
  assertMatches(html, /<header[^>]*class="site-header"/i, `Expected ${file} to include the shared site header.`);
  assertMatches(html, /<main[^>]*class="site-main"/i, `Expected ${file} to include the primary main landmark.`);
  assertMatches(html, /<footer[^>]*class="site-footer"/i, `Expected ${file} to include the shared site footer.`);
  assertMatches(html, /id="current-year"/i, `Expected ${file} footer to include a dynamic year target.`);
});

['search.html', 'archives.html'].forEach((file) => {
  const html = readRepoFile(file);
  assertNotMatches(html, /href="index\.html#hero"/i, `Did not expect broken hero anchor link in ${file}.`);
});
