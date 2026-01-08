// ABOUTME: Checks that the matrix background toggle is available across pages.
// ABOUTME: Ensures reduced-motion and persistence hooks exist in the scripts.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'post.html', 'search.html', 'archives.html'];
htmlFiles.forEach((file) => {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.ok(
    /id="matrix-toggle"/i.test(html),
    `Expected ${file} to include a matrix toggle button.`
  );
});

const scriptFiles = ['app.js', 'post-detail.js', 'search.js', 'archives.js'];
scriptFiles.forEach((file) => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', file), 'utf8');
  assert.ok(
    /matrixEnabled/i.test(source),
    `Expected ${file} to reference the matrixEnabled preference.`
  );
  assert.ok(
    /prefers-reduced-motion/i.test(source),
    `Expected ${file} to respect prefers-reduced-motion.`
  );
  assert.ok(
    /matrix-disabled/i.test(source),
    `Expected ${file} to toggle the matrix-disabled class.`
  );
});
