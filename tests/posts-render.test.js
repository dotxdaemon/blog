// ABOUTME: Ensures the posts renderer outputs post rows with dates and titles.
// ABOUTME: Confirms app.js defines the post row markup classes.
const { assertMatches, readRepoFile } = require('./helpers');

const appSource = readRepoFile('assets/js/app.js');

assertMatches(
  appSource,
  /className\s*=\s*['"]post-row/i,
  'Expected app.js to create post rows.'
);
assertMatches(
  appSource,
  /className\s*=\s*['"]post-date/i,
  'Expected app.js to create post date elements.'
);
assertMatches(
  appSource,
  /className\s*=\s*['"]post-title/i,
  'Expected app.js to create post title elements.'
);
