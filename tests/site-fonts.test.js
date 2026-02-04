// ABOUTME: Ensures the site avoids external font dependencies on every page.
// ABOUTME: Confirms each HTML entry links the shared style.css file.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const htmlFiles = [
  'index.html',
  'posts.html',
  'post.html',
  'search.html',
  'archives.html',
  'matrix-gold-rain.html',
];

htmlFiles.forEach((fileName) => {
  const html = readRepoFile(fileName);
  assertNotMatches(
    html,
    /fonts\.googleapis\.com|fonts\.gstatic\.com/i,
    `Did not expect external font links in ${fileName}.`
  );
  assertMatches(
    html,
    /<link[^>]*href="style\.css"[^>]*>/i,
    `Expected ${fileName} to link to style.css.`
  );
});
