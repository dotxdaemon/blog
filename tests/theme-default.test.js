// ABOUTME: Confirms the HTML head includes core meta tags.
// ABOUTME: Ensures charset and viewport are defined for responsiveness.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(html, /<meta[^>]*charset="UTF-8"/i, 'Expected a UTF-8 charset meta tag.');
assertMatches(
  html,
  /<meta[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1\.0"/i,
  'Expected the viewport meta tag for responsive layout.'
);
