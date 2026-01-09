// ABOUTME: Confirms the default theme is set to dark across primary pages.
// ABOUTME: Ensures initial markup reflects the matrix palette preference.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'post.html', 'search.html', 'archives.html'];

htmlFiles.forEach((file) => {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.ok(
    /<body[^>]*data-theme="dark"/i.test(html),
    `Expected ${file} to default to the dark theme.`
  );
});
