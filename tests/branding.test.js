// ABOUTME: Confirms the homepage includes the required header and footer branding.
// ABOUTME: Ensures the site title and footer container are present.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<header[^>]*>[\s\S]*<h1[^>]*class="site-title"[^>]*>[^<]+<\/h1>/i,
  'Expected the header to include a non-empty site title.'
);

assertMatches(
  html,
  /<footer[^>]*class="site-footer"/i,
  'Expected the footer container to be present.'
);
