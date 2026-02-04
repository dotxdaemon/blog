// ABOUTME: Confirms semantic HTML5 landmarks appear on the homepage.
// ABOUTME: Ensures header, nav, main, section, article, and footer elements exist.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(html, /<header\b/i, 'Expected a header element in the markup.');
assertMatches(html, /<nav\b/i, 'Expected a nav element in the markup.');
assertMatches(html, /<main\b/i, 'Expected a main element in the markup.');
assertMatches(html, /<section\b/i, 'Expected a section element in the markup.');
assertMatches(html, /<article\b/i, 'Expected article elements in the markup.');
assertMatches(html, /<footer\b/i, 'Expected a footer element in the markup.');
