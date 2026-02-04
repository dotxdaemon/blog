// ABOUTME: Confirms the homepage includes the required header and footer branding.
// ABOUTME: Ensures the site title and footer copy are present.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(
  html,
  /<header[^>]*>[\s\S]*<h1[^>]*class="site-title"[^>]*>[^<]+<\/h1>/i,
  'Expected the header to include a non-empty site title.'
);

assertMatches(
  html,
  /<footer[^>]*class="site-footer"[^>]*>[\s\S]*<p[^>]*>[^<]+<\/p>/i,
  'Expected the footer to include minimal copy.'
);
