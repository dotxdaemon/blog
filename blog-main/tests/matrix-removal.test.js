// ABOUTME: Ensures matrix visual effects are fully removed from page templates and scripts.
// ABOUTME: Guards against stale matrix runtime hooks and stylesheet selectors.
const { assertNotMatches, readRepoFile, readStyles } = require('./helpers');

['index.html', 'posts.html', 'search.html', 'archives.html', 'post.html'].forEach((file) => {
  const html = readRepoFile(file);
  assertNotMatches(html, /id="matrix-rain"/i, `Did not expect matrix canvas markup in ${file}.`);
  assertNotMatches(html, /assets\/js\/matrix\.js/i, `Did not expect matrix script reference in ${file}.`);
});

['assets/js/app.js', 'assets/js/search.js', 'assets/js/archives.js'].forEach((file) => {
  const script = readRepoFile(file);
  assertNotMatches(script, /setupMatrixRain/i, `Did not expect matrix setup logic in ${file}.`);
  assertNotMatches(script, /matrixEnabled/i, `Did not expect matrix state persistence in ${file}.`);
});

const css = readStyles();
assertNotMatches(css, /\.matrix-rain/i, 'Did not expect matrix style selectors in style.css.');
assertNotMatches(css, /matrix-disabled|matrix-enabled/i, 'Did not expect matrix state classes in style.css.');
