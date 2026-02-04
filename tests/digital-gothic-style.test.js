// ABOUTME: Ensures the homepage keeps the brutalist layout free of decorative media.
// ABOUTME: Confirms no images or canvases appear in the markup.
const { assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertNotMatches(html, /<img\b/i, 'Did not expect decorative images in the homepage.');
assertNotMatches(html, /<canvas\b/i, 'Did not expect a canvas element in the homepage.');
