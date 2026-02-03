// ABOUTME: Verifies post detail navigation uses the posts listing entry point.
// ABOUTME: Ensures back navigation stays consistent across static hosts.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const postPath = path.join(__dirname, '..', 'post.html');
const html = fs.readFileSync(postPath, 'utf8');

assert.ok(
  /<a[^>]*(class="back-button"[^>]*href="posts\.html"|href="posts\.html"[^>]*class="back-button")[^>]*>/i.test(
    html
  ),
  'Expected the post back button to point to posts.html.'
);
