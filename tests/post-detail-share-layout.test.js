// ABOUTME: Ensures the post detail page omits the share links and label block.
// ABOUTME: Verifies the newsletter input and submit button sizing is toned down.
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
  /\.newsletter-form input\[type="email"\][\s\S]*?padding: 0\.6rem 0\.9rem;/.test(css),
  'Expected the newsletter email input to use tighter padding.'
);

assert.ok(
  /\.newsletter-form h3\s*\{[^}]*?font-size: 0\.8rem;/.test(css),
  'Expected the newsletter heading to use a smaller font size.'
);

assert.ok(
  /\.newsletter-form input\[type="email"\][\s\S]*?font-size: 0\.95rem;/.test(css),
  'Expected the newsletter email input to use a smaller font size.'
);

assert.ok(
  /\.newsletter-form button\[type="submit"\][\s\S]*?padding: 0\.6rem 1rem;/.test(css),
  'Expected the newsletter submit button to use tighter padding.'
);

assert.ok(
  /\.newsletter-form button\[type="submit"\][\s\S]*?font-size: 0\.95rem;/.test(css),
  'Expected the newsletter submit button to use a smaller font size.'
);
