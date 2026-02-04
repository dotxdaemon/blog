// ABOUTME: Confirms the homepage layout matches the required sections.
// ABOUTME: Ensures the header, navigation, and recent posts stream exist.
const assert = require('assert');
const { readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assert.ok(
  /<header[^>]*class="site-header"/i.test(html),
  'Expected the page to include a site header.'
);
assert.ok(
  /<nav[^>]*class="site-nav"/i.test(html),
  'Expected the page to include a navigation section.'
);
assert.ok(
  /<main[^>]*class="site-main"/i.test(html),
  'Expected the page to include a main content section.'
);
assert.ok(
  /<section[^>]*class="post-stream"[\s\S]*<h2[^>]*>Recent Posts<\/h2>/i.test(html),
  'Expected the Recent Posts section to include a heading.'
);
