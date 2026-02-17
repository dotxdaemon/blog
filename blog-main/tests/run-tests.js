// ABOUTME: Runs the focused test suite for the current site design and core rendering behavior.
// ABOUTME: Loads a curated list of tests and exits with failure if any assertion throws.
const path = require('path');

const testFiles = [
  'editorial-minimalism.test.js',
  'dashboard-integration.test.js',
  'page-chrome-consistency.test.js',
  'matrix-removal.test.js',
  'date-consistency.test.js',
  'posts.test.js',
  'rss.test.js',
  'navigation.test.js',
  'post-detail-minimal.test.js',
  'mobile-layout-improvements.test.js',
];

for (const file of testFiles) {
  require(path.join(__dirname, file));
}
