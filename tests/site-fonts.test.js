// ABOUTME: Ensures the homepage avoids external font dependencies.
// ABOUTME: Confirms only the local stylesheet is linked.
const { assertMatches, assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertNotMatches(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/i, 'Did not expect external font links.');
assertMatches(
  html,
  /<link[^>]*href="style\.css"[^>]*>/i,
  'Expected the homepage to link to style.css.'
);
