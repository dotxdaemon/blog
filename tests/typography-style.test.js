// ABOUTME: Ensures typography hierarchy uses deliberate casing per section role.
// ABOUTME: Confirms compact section labels are uppercase while main titles are not.
const { assertMatches, assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

assertNotMatches(css, /\.site-title[^}]*text-transform:\s*uppercase/i, 'Expected site title to keep natural casing.');
assertMatches(css, /\.section-title[^}]*text-transform:\s*uppercase/i, 'Expected section labels to use uppercase styling.');
assertNotMatches(css, /\.post-title[^}]*text-transform:\s*uppercase/i, 'Expected post titles to keep natural casing.');
