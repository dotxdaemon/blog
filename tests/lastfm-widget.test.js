// ABOUTME: Verifies the homepage stays static with no script dependencies.
// ABOUTME: Ensures no script tags are present in the markup.
const { assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertNotMatches(html, /<script\b/i, 'Did not expect script tags in the static homepage.');
