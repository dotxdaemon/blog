// ABOUTME: Validates homepage structure remains intentional and minimal.
// ABOUTME: Ensures the featured section is removed and the dashboard grid is present.
const { assertMatches, assertNotMatches, readIndexHtml, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();

assertNotMatches(html, /<nav[^>]*class="site-nav"/i, 'Did not expect top-right navigation in the homepage header.');
assertNotMatches(html, /<section[^>]*class="[^"]*featured[^"]*"/i, 'Did not expect a featured section on the homepage.');
assertMatches(css, /background:\s*linear-gradient\(180deg,\s*#000000\s*0%,\s*#0a0a0a\s*100%\)/i, 'Expected dark gradient styles on the homepage.');
assertMatches(css, /@media\s*\(min-width:\s*768px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i, 'Expected balanced desktop two-column composition.');
