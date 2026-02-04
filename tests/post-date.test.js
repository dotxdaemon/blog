// ABOUTME: Validates the post row markup orders date before title.
// ABOUTME: Ensures each post includes the date element on the left.
const assert = require('assert');
const { readIndexHtml } = require('./helpers');

const html = readIndexHtml();
const articleMatches = [...html.matchAll(/<article\b[\s\S]*?<\/article>/gi)];

articleMatches.forEach((match, index) => {
  const entry = match[0];
  const timeMatch = entry.match(/<time\b[^>]*class="post-date"[^>]*>[\s\S]*?<\/time>/i);
  const titleMatch = entry.match(/<h2\b[^>]*class="post-title"[^>]*>[\s\S]*?<\/h2>/i);

  assert.ok(timeMatch, `Expected post ${index + 1} to include a post-date element.`);
  assert.ok(titleMatch, `Expected post ${index + 1} to include a post-title element.`);

  if (timeMatch && titleMatch) {
    assert.ok(
      timeMatch.index < titleMatch.index,
      `Expected the date to appear before the title in post ${index + 1}.`
    );
  }
});
