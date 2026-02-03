// ABOUTME: Verifies the posts renderer applies a consistent list-row layout.
// ABOUTME: Ensures all posts use the same list row rendering logic.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
const appSource = fs.readFileSync(appPath, 'utf8');

assert.ok(
  /orderedPosts\.forEach\(\(post\)/.test(appSource),
  'Expected the posts renderer to iterate over orderedPosts directly.'
);

assert.ok(
  !/featuredPost/.test(appSource),
  'Expected the posts renderer to avoid a featured post split.'
);
