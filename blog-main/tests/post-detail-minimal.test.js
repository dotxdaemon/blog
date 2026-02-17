// ABOUTME: Ensures the post detail page keeps a minimal long-form reading structure.
// ABOUTME: Confirms title, date, and shared footer wiring remain simple and focused.
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('post.html');
const script = readRepoFile('assets/js/post-detail.js');
const css = readStyles();

assertMatches(html, /id="post-title"/i, 'Expected the post title to remain.');
assertMatches(html, /id="post-date"/i, 'Expected the post date to remain.');
assertMatches(html, /id="post-content"/i, 'Expected the post content container to remain.');
assertMatches(html, /class="post-back-link"/i, 'Expected a dedicated post back link in the template.');
assertMatches(html, /id="current-year"/i, 'Expected the post footer to use a dynamic current year target.');

assertMatches(script, /function\s+formatPostDateBadge/i, 'Expected post script to format date badge text.');
assertMatches(script, /month:\s*'short'/i, 'Expected post date formatting to use short month names.');
assertMatches(script, /day:\s*'numeric'/i, 'Expected post date formatting to use calendar day values.');
assertMatches(script, /year:\s*'numeric'/i, 'Expected post date formatting to include the year.');
assertMatches(readRepoFile('style.css'), /--font-body:\s*'Cormorant Garamond',\s*Georgia,\s*serif/i, 'Expected the site body font token to use the original serif font.');
assertMatches(css, /\.post-page\s+\.post-content\s*\{[\s\S]*line-height:\s*1\.8/i, 'Expected post content line height to remain spacious for readability.');

assertNotMatches(html, /id="post-reading-time"/i, 'Expected the post template to omit reading-time metadata.');
assertNotMatches(html, /class="post-meta-divider"/i, 'Expected the post template to omit the metadata divider when only date remains.');
assertNotMatches(script, /estimateReadingTime/i, 'Expected post script to omit reading-time logic.');
assertNotMatches(script, /post-reading-time/i, 'Expected post script to omit reading-time DOM wiring.');
assertNotMatches(script, /toUpperCase\(\)/i, 'Did not expect post date badges to force uppercase text.');
