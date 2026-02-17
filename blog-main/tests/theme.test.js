// ABOUTME: Ensures the body element stays minimal and unthemed.
// ABOUTME: Confirms no data-theme or inline styles are present.
const { assertNotMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertNotMatches(html, /<body[^>]*data-theme=/i, 'Did not expect a data-theme attribute.');
assertNotMatches(html, /<body[^>]*style=/i, 'Did not expect inline styles on body.');
