// ABOUTME: Ensures the static homepage does not include interactive toggles.
// ABOUTME: Confirms no button elements are present.
const { assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertNotMatches(html, /<button\b/i, 'Did not expect button controls in the homepage.');
