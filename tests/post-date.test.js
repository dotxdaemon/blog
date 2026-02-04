// ABOUTME: Validates the posts renderer uses time elements for dates.
// ABOUTME: Ensures post dates are rendered as time tags in app.js.
const { assertMatches, readRepoFile } = require('./helpers');

const appSource = readRepoFile('assets/js/app.js');

assertMatches(
  appSource,
  /createElement\(['"]time['"]\)/i,
  'Expected app.js to create time elements for post dates.'
);
assertMatches(
  appSource,
  /className\s*=\s*['"]post-date/i,
  'Expected post dates to use the post-date class.'
);
