// ABOUTME: Ensures the site keeps the brutalist layout free of decorative media.
// ABOUTME: Confirms no images appear in the HTML entry points.
const { assertNotMatches, readRepoFile } = require('./helpers');

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
  assertNotMatches(html, /<img\b/i, `Did not expect decorative images in ${fileName}.`);
});
