// ABOUTME: Validates homepage structure remains intentional and minimal.
// ABOUTME: Ensures the featured section is removed and the style stays flat.
const { assertMatches, assertNotMatches, readIndexHtml, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();

assertNotMatches(html, /<nav[^>]*class="site-nav"/i, 'Did not expect top-right navigation in the homepage header.');
assertNotMatches(html, /<section[^>]*class="[^"]*featured[^"]*"/i, 'Did not expect a featured section on the homepage.');
assertMatches(css, /\.site-main[\s\S]*padding:\s*0/i, 'Expected one primary padded surface for content.');
assertMatches(css, /@media\s*\(min-width:\s*900px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.2fr\)\s*minmax\(0,\s*0\.8fr\)/i, 'Expected balanced desktop composition without dead space.');
assertNotMatches(css, /gradient\(/i, 'Did not expect gradient styles on the homepage.');
