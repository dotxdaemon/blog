// ABOUTME: Validates the post stream lives inside the main content area.
// ABOUTME: Ensures the main region wraps the Recent Posts section.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<main[^>]*>[\s\S]*<section[^>]*class="post-stream"/i,
  'Expected the main region to contain the post stream section.'
);
