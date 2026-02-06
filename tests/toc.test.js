// ABOUTME: Confirms the post stream includes the posts container.
// ABOUTME: Ensures the container lives within the Recent Posts section.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<section[^>]*class="[^"]*post-stream[^"]*"[\s\S]*id="posts"/i,
  'Expected the posts container to live inside the post stream section.'
);
