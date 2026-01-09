// ABOUTME: Ensures the post detail page omits the share links and label block.
// ABOUTME: Verifies the post detail page no longer renders the newsletter section.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const postPath = path.join(__dirname, '..', 'post.html');
const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');

const postHtml = fs.readFileSync(postPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  !/class="share-links"/i.test(postHtml),
  'Expected the post detail page to omit the share links container.'
);

assert.ok(
  !/\bShare:\b/i.test(postHtml),
  'Expected the post detail page to omit the Share label.'
);

assert.ok(
  !/\.newsletter-form/.test(css),
  'Expected the newsletter form styles to be removed.'
);

assert.ok(
  !/class="newsletter-form"/i.test(postHtml),
  'Expected the newsletter form markup to be removed.'
);
