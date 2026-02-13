// ABOUTME: Ensures the post detail page renders matrix-template structure with dynamic metadata.
// ABOUTME: Confirms title, date badge, and footer elements are present without reading-time clutter.
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('post.html');
const script = readRepoFile('assets/js/post-detail.js');
const css = readStyles();

assertMatches(html, /id="post-title"/i, 'Expected the post title to remain.');
assertMatches(html, /id="post-date"/i, 'Expected the post date to remain.');
assertMatches(html, /id="post-content"/i, 'Expected the post content container to remain.');
assertMatches(html, /class="post-back-link"/i, 'Expected a dedicated post back link in the template.');
assertMatches(html, /©\s*2026\s*velvetdaemon/i, 'Expected footer copyright text for the post template.');

assertMatches(script, /function\s+formatPostDateBadge/i, 'Expected post script to format date badge text.');
assertMatches(script, /month:\s*'short'/i, 'Expected post date formatting to use short month names.');
assertMatches(script, /day:\s*'2-digit'/i, 'Expected post date formatting to keep two-digit day values.');
assertMatches(script, /toUpperCase\(\)/i, 'Expected post date badge text to be uppercased.');
assertMatches(readRepoFile('style.css'), /--font-body:\s*'Cormorant Garamond',\s*Georgia,\s*serif/i, 'Expected the site body font token to use the original serif font.');
assertMatches(css, /\.post-page\s+\.post-content\s*\{[\s\S]*line-height:\s*1\.9/i, 'Expected post content line height to be increased for easier reading.');

assertNotMatches(html, /id="post-reading-time"/i, 'Expected the post template to omit reading-time metadata.');
assertNotMatches(html, /class="post-meta-divider"/i, 'Expected the post template to omit the metadata divider when only date remains.');
assertNotMatches(script, /estimateReadingTime/i, 'Expected post script to omit reading-time logic.');
assertNotMatches(script, /post-reading-time/i, 'Expected post script to omit reading-time DOM wiring.');
