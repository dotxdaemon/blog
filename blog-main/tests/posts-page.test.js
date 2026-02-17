// ABOUTME: Confirms the Recent Posts section is present in the homepage.
// ABOUTME: Ensures the section label uses the requested wording.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<h2[^>]*>Recent Posts<\/h2>/i,
  'Expected the Recent Posts heading to appear in the markup.'
);
