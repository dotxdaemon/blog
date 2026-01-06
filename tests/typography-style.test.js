// ABOUTME: Verifies the nav link styling and shared post snippet structure across pages.
// ABOUTME: Ensures the text-first layout uses consistent class names for rendering entries.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const appJsPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
const searchJsPath = path.join(__dirname, '..', 'assets', 'js', 'search.js');

const css = fs.readFileSync(cssPath, 'utf8');

const activeNavPattern = /\.nav-link\.active[\s\S]*?text-decoration-style:\s*wavy/i;
assert.ok(
  activeNavPattern.test(css),
  'Expected the active nav link to use a wavy underline decoration.'
);

assert.ok(
  /\.nav-link\.active[\s\S]*?text-underline-offset:/i.test(css),
  'Expected the active nav underline to have a defined offset.'
);

const appSource = fs.readFileSync(appJsPath, 'utf8');
['post-snippet', 'post-snippet__meta', 'post-snippet__title', 'post-snippet__excerpt'].forEach(
  (className) => {
    assert.ok(
      appSource.includes(className),
      `Expected homepage rendering to use the ${className} class.`
    );
  }
);

const searchSource = fs.readFileSync(searchJsPath, 'utf8');
['post-snippet__meta', 'post-snippet__title', 'post-snippet__excerpt'].forEach((className) => {
  assert.ok(
    searchSource.includes(className),
    `Expected search results to reuse the ${className} class.`
  );
});
