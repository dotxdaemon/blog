// ABOUTME: Validates homepage tokens and layout follow the editorial minimalism direction.
// ABOUTME: Confirms warm palette, serif title styling, and centered single-column dashboard layout.
const { assertMatches, readIndexHtml, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();

assertMatches(css, /--paper:\s*#F5F0E8/i, 'Expected warm cream background token.');
assertMatches(css, /--accent:\s*#6B635E/i, 'Expected warm gray accent token.');
assertMatches(css, /\.site-title[\s\S]*letter-spacing:\s*0\.18em/i, 'Expected title letter spacing near +180.');
assertMatches(css, /\.site-main[\s\S]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/i, 'Expected a 12-column layout grid on desktop.');
assertMatches(css, /\.left-column[\s\S]*max-width:\s*640px/i, 'Expected centered 640px main content width.');
assertMatches(html, /class="section-title" id="listening-to">LISTENING TO</i, 'Expected LISTENING TO label to remain present.');
