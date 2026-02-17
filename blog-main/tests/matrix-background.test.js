// ABOUTME: Ensures matrix rain canvas is present across pages.
// ABOUTME: Confirms matrix rendering is loaded for main site views.
const { assertMatches, readRepoFile } = require('./helpers');

const pages = [
  'index.html',
  'posts.html',
  'post.html',
  'search.html',
  'archives.html',
];

pages.forEach((page) => {
  const html = readRepoFile(page);
  assertMatches(
    html,
    /id="matrix-rain"/i,
    `Expected ${page} to include the matrix rain canvas.`
  );
  assertMatches(
    html,
    /assets\/js\/matrix\.js/i,
    `Expected ${page} to load the matrix rain script.`
  );
});
