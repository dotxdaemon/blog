// ABOUTME: Confirms semantic HTML5 landmarks appear on the homepage.
// ABOUTME: Ensures header, nav, main, section, and footer elements exist.
const { assertMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const appSource = readRepoFile('assets/js/app.js');

assertMatches(html, /<header\b/i, 'Expected a header element in the markup.');
assertMatches(html, /<nav\b/i, 'Expected a nav element in the markup.');
assertMatches(html, /<main\b/i, 'Expected a main element in the markup.');
assertMatches(html, /<section\b/i, 'Expected a section element in the markup.');
assertMatches(html, /<footer\b/i, 'Expected a footer element in the markup.');
assertMatches(
  appSource,
  /createElement\(['"]article['"]\)/i,
  'Expected app.js to create article elements for posts.'
);
