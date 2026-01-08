// ABOUTME: Confirms the post template includes a table of contents container.
// ABOUTME: Verifies the post detail script references toc rendering helpers.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const postHtml = fs.readFileSync(path.join(__dirname, '..', 'post.html'), 'utf8');
assert.ok(
  /id="post-toc"/i.test(postHtml),
  'Expected post.html to include a table of contents container.'
);

const postDetailSource = fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'js', 'post-detail.js'),
  'utf8'
);
assert.ok(
  /toc/i.test(postDetailSource),
  'Expected post-detail.js to reference table of contents rendering.'
);
