// ABOUTME: Ensures the recent posts stream lists five entries.
// ABOUTME: Confirms each entry includes a date and title.
const assert = require('assert');
const { readIndexHtml } = require('./helpers');

const html = readIndexHtml();
const articleMatches = [...html.matchAll(/<article\b[\s\S]*?<\/article>/gi)];

assert.strictEqual(
  articleMatches.length,
  5,
  'Expected the Recent Posts section to include five article entries.'
);

articleMatches.forEach((match, index) => {
  const entry = match[0];
  assert.ok(
    /<time\b[^>]*>[^<]+<\/time>/i.test(entry),
    `Expected post ${index + 1} to include a date.`
  );
  assert.ok(
    /<h2\b[^>]*class="post-title"[^>]*>[\s\S]*?<\/h2>/i.test(entry),
    `Expected post ${index + 1} to include a title.`
  );
});
