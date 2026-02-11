// ABOUTME: Validates homepage tokens and layout follow the editorial minimalism direction.
// ABOUTME: Confirms warm palette, serif title styling, and centered single-column dashboard layout.
const { assertMatches, readIndexHtml, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();

assertMatches(css, /--paper:\s*#F5F0E8/i, 'Expected warm cream background token.');
assertMatches(css, /--accent:\s*#6B635E/i, 'Expected warm gray accent token.');
assertMatches(css, /\.site-title[\s\S]*letter-spacing:\s*0\.15em/i, 'Expected title letter spacing near +150.');
assertMatches(css, /\.site-main[\s\S]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/i, 'Expected a 12-column layout grid on desktop.');
assertMatches(css, /\.left-column[\s\S]*max-width:\s*640px/i, 'Expected centered 640px main content width.');
assertMatches(html, /class="section-title" id="listening-to">LISTENING TO</i, 'Expected LISTENING TO label to remain present.');
assertMatches(css, /\.dashboard-status[\s\S]*color:\s*var\(--muted-strong\)/i, 'Expected status label to use tertiary text token.');

assertMatches(css, /\.post-stream[\s\S]*margin-top:\s*160px/i, 'Expected recent posts to start 160px below the listening section.');
assertMatches(css, /\.post-stream[\s\S]*max-width:\s*640px/i, 'Expected recent posts section width to cap at 640px.');
assertMatches(css, /\.post-stream[\s\S]*width:\s*640px/i, 'Expected recent posts divider section width to be 640px.');
assertMatches(css, /\.post-stream[\s\S]*border-top:\s*1px\s+solid\s+var\(--line\)/i, 'Expected a 1px divider above recent posts.');
assertMatches(css, /\.post-stream\s+\.section-title[\s\S]*margin-bottom:\s*64px/i, 'Expected 64px spacing between RECENT POSTS heading and first item.');
assertMatches(css, /\.post-list[\s\S]*gap:\s*80px/i, 'Expected 80px spacing between post items.');
assertMatches(css, /\.post-title[\s\S]*font-size:\s*13pt/i, 'Expected post titles to use 13pt type.');
assertMatches(css, /\.post-excerpt[\s\S]*font-size:\s*11pt/i, 'Expected post subtitles to use 11pt type.');
assertMatches(css, /\.post-date[\s\S]*font-size:\s*8pt/i, 'Expected post dates to use 8pt type.');
assertMatches(css, /\.post-row:hover\s+\.post-title[\s\S]*color:\s*var\(--ink\)/i, 'Expected post title hover to transition to primary text color.');
