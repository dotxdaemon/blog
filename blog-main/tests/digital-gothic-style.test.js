// ABOUTME: Ensures only the listening artwork image is allowed in entry-point HTML pages.
// ABOUTME: Confirms other decorative inline images remain absent.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const htmlFilesWithoutImages = [
  'posts.html',
  'post.html',
  'search.html',
  'archives.html',
  'matrix-gold-rain.html',
];

const homepageHtml = readRepoFile('index.html');
assertMatches(
  homepageHtml,
  /<img[^>]*id="dashboard-track-artwork"/i,
  'Expected index.html to include the listening artwork image element.'
);

htmlFilesWithoutImages.forEach((fileName) => {
  const html = readRepoFile(fileName);
  assertNotMatches(html, /<img\b/i, `Did not expect decorative images in ${fileName}.`);
});
