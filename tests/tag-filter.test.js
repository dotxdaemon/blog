// ABOUTME: Ensures tag filtering is wired into the search experience.
// ABOUTME: Confirms the tag filter UI uses the shared notice styles.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const searchSource = fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'js', 'search.js'),
  'utf8'
);

assert.ok(
  /searchParams\.get\(['"]tag['"]\)/i.test(searchSource),
  'Expected search.js to read the tag query parameter.'
);
assert.ok(
  /tag-filter-notice/i.test(searchSource),
  'Expected search.js to render a tag filter notice.'
);
assert.ok(
  /clear-filter/i.test(searchSource),
  'Expected search.js to include a clear filter control.'
);
