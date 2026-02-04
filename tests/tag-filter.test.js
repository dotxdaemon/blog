// ABOUTME: Confirms the recent posts container uses a dedicated list wrapper.
// ABOUTME: Ensures the post list wrapper is present in the markup.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /class="post-list"/i,
  'Expected the Recent Posts section to include a post-list wrapper.'
);
