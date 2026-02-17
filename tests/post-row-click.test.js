// ABOUTME: Ensures post rows expose standard anchor navigation for accessibility.
// ABOUTME: Confirms destination URLs are built as post detail slugs.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(
  script,
  /const destination\s*=\s*`post\.html\?slug=\$\{slugify\(/i,
  'Expected post rows to build a post detail destination.'
);
assertMatches(
  script,
  /link\.href\s*=\s*destination/i,
  'Expected post titles to use standard anchor links.'
);
assertNotMatches(
  script,
  /entry\.addEventListener\(['"]click['"]/i,
  'Did not expect click-only row handlers once anchors are present.'
);
