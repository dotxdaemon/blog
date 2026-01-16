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

assert.ok(
  /--font-size-base:/i.test(css),
  'Expected a base font size variable to be defined.'
);

assert.ok(
  /--line-height-base:/i.test(css),
  'Expected a base line-height variable to be defined.'
);

assert.ok(
  /body[\s\S]*?font-size:\s*var\(--font-size-base\)/i.test(css),
  'Expected the body font size to use the base font size variable.'
);

assert.ok(
  /body[\s\S]*?line-height:\s*var\(--line-height-base\)/i.test(css),
  'Expected the body line height to use the base line height variable.'
);

assert.ok(
  /:focus-visible[\s\S]*outline:/i.test(css),
  'Expected focus-visible styling to be defined.'
);

assert.ok(
  /\.matrix-toggle:focus-visible[\s\S]*outline:\s*none/i.test(css),
  'Expected the matrix toggle to remove its focus outline.'
);

['site-title'].forEach((className) => {
  const pattern = new RegExp(`\\.${className}[\\s\\S]*?font-family:\\s*var\\(--font-mono\\)`, 'i');
  assert.ok(
    pattern.test(css),
    `Expected ${className} to use the monospace font family.`
  );
});

['section-title', 'post-title'].forEach((className) => {
  const pattern = new RegExp(`\\.${className}[\\s\\S]*?font-family:\\s*var\\(--font-sans\\)`, 'i');
  assert.ok(
    pattern.test(css),
    `Expected ${className} to use the serif font family.`
  );
});

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
