// ABOUTME: Ensures post rows are clickable across the full hover area.
// ABOUTME: Confirms post rows navigate to their linked detail view.
const { assertMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(
  script,
  /entry\.addEventListener\(['"]click['"]/i,
  'Expected post rows to attach a click handler.'
);
assertMatches(
  script,
  /const destination\s*=\s*`post\.html\?slug=\$\{slugify\(/i,
  'Expected post row click handler to build a post detail destination.'
);
assertMatches(
  script,
  /location\.href\s*=\s*destination/i,
  'Expected post row click handler to navigate to the post detail page.'
);
