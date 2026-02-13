// ABOUTME: Validates homepage tokens and layout follow the editorial minimalism direction.
// ABOUTME: Confirms warm palette, serif title styling, and centered single-column dashboard layout.
const { assertMatches, readIndexHtml, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();

assertMatches(css, /--paper:\s*#F5F0E8/i, 'Expected warm cream background token.');
assertMatches(css, /--accent:\s*#6B635E/i, 'Expected warm gray accent token.');
assertMatches(css, /\.site-title[\s\S]*letter-spacing:\s*0\.15em/i, 'Expected title letter spacing near +150.');
assertMatches(css, /\.site-main[\s\S]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/i, 'Expected a 12-column layout grid on desktop.');
assertMatches(css, /\.left-column[\s\S]*grid-column:\s*1\s*\/\s*9/i, 'Expected listening column to span most of the desktop grid.');
assertMatches(html, /class="section-title" id="listening-to">LISTENING TO</i, 'Expected LISTENING TO label to remain present.');
assertMatches(css, /\.dashboard-status[\s\S]*color:\s*var\(--muted-strong\)/i, 'Expected status label to use tertiary text token.');

assertMatches(css, /\.post-stream[\s\S]*grid-column:\s*9\s*\/\s*13/i, 'Expected recent posts to render in the right-side column on desktop.');
assertMatches(css, /\.post-stream[\s\S]*margin-top:\s*0/i, 'Expected recent posts to align with the listening section instead of sitting below it.');
assertMatches(css, /\.post-stream[\s\S]*border-left:\s*1px\s+solid\s+var\(--line\)/i, 'Expected a vertical divider between listening and recent posts.');
assertMatches(css, /\.post-stream\s+\.section-title[\s\S]*margin-bottom:\s*32px/i, 'Expected 32px spacing between RECENT POSTS heading and first item.');
assertMatches(css, /\.post-list[\s\S]*gap:\s*40px/i, 'Expected 40px spacing between post items.');
assertMatches(css, /\.post-title[\s\S]*font-size:\s*13pt/i, 'Expected post titles to use 13pt type.');
assertMatches(css, /\.post-excerpt[\s\S]*font-size:\s*11pt/i, 'Expected post subtitles to use 11pt type.');
assertMatches(css, /\.post-date[\s\S]*font-size:\s*8pt/i, 'Expected post dates to use 8pt type.');
assertMatches(css, /\.post-row:hover\s+\.post-title[\s\S]*color:\s*var\(--ink\)/i, 'Expected post title hover to transition to primary text color.');
