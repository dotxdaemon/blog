// ABOUTME: Ensures the post detail page shares visual chrome with the rest of the site.
// ABOUTME: Confirms title, metadata, and typography remain while floating footer/back link are removed.
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('post.html');
const script = readRepoFile('assets/js/post-detail.js');
const css = readStyles();

assertMatches(html, /id="post-title"/i, 'Expected the post title to remain.');
assertMatches(html, /id="post-date"/i, 'Expected the post date to remain.');
assertMatches(html, /id="post-content"/i, 'Expected the post content container to remain.');
assertMatches(html, /<header[^>]*class="site-header"/i, 'Expected post detail to include the shared site header.');
assertMatches(html, /<nav[^>]*class="site-nav"/i, 'Expected post detail to include the shared site navigation.');
assertMatches(html, /<section[^>]*class="[^"]*post-stream[^"]*"/i, 'Expected post detail to use the shared post stream container.');
assertNotMatches(html, /class="post-back-link"/i, 'Did not expect a standalone floating back link in the post template.');
assertNotMatches(html, /class="post-footer"/i, 'Did not expect a floating footer block in the post template.');
assertNotMatches(html, /href="archives\.html"/i, 'Did not expect post detail navigation to include an archives link.');

assertMatches(script, /function\s+formatPostDateBadge/i, 'Expected post script to format date badge text.');
assertMatches(script, /month:\s*'short'/i, 'Expected post date formatting to use short month names.');
assertMatches(script, /day:\s*'2-digit'/i, 'Expected post date formatting to keep two-digit day values.');
assertMatches(script, /toUpperCase\(\)/i, 'Expected post date badge text to be uppercased.');
assertMatches(readRepoFile('style.css'), /--font-body:\s*'Cormorant Garamond',\s*Georgia,\s*serif/i, 'Expected the site body font token to use the original serif font.');
assertMatches(css, /\.post-page\s+\.post-content\s*\{[\s\S]*line-height:\s*1\.9/i, 'Expected post content line height to be increased for easier reading.');
assertMatches(css, /\.post-page\s+\.post-title\s*\{[\s\S]*font-size:\s*clamp\(/i, 'Expected post title to scale like a primary heading.');
assertMatches(css, /\.post-page\s+\.post-detail\s*\{[\s\S]*border:\s*none/i, 'Expected post detail container to remove the boxed card border.');

assertNotMatches(html, /id="post-reading-time"/i, 'Expected the post template to omit reading-time metadata.');
assertNotMatches(html, /class="post-meta-divider"/i, 'Expected the post template to omit the metadata divider when only date remains.');
assertNotMatches(script, /estimateReadingTime/i, 'Expected post script to omit reading-time logic.');
assertNotMatches(script, /post-reading-time/i, 'Expected post script to omit reading-time DOM wiring.');
