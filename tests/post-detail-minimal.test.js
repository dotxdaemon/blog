// ABOUTME: Ensures the post detail page renders matrix-template structure with dynamic metadata.
// ABOUTME: Confirms title, date badge, reading-time badge, and footer elements are present.
const { assertMatches, readRepoFile } = require('./helpers');

const html = readRepoFile('post.html');
const script = readRepoFile('assets/js/post-detail.js');

assertMatches(html, /id="post-title"/i, 'Expected the post title to remain.');
assertMatches(html, /id="post-date"/i, 'Expected the post date to remain.');
assertMatches(html, /id="post-content"/i, 'Expected the post content container to remain.');
assertMatches(html, /class="post-back-link"/i, 'Expected a dedicated post back link in the template.');
assertMatches(html, /id="post-reading-time"/i, 'Expected a reading-time badge container in the template.');
assertMatches(html, /©\s*2026\s*velvetdaemon/i, 'Expected footer copyright text for the post template.');

assertMatches(script, /function\s+formatPostDateBadge/i, 'Expected post script to format date badge text.');
assertMatches(script, /function\s+estimateReadingTime/i, 'Expected post script to calculate reading time.');
assertMatches(script, /post-reading-time/i, 'Expected post script to populate the reading-time badge.');
assertMatches(script, /month:\s*'short'/i, 'Expected post date formatting to use short month names.');
assertMatches(script, /day:\s*'2-digit'/i, 'Expected post date formatting to keep two-digit day values.');
assertMatches(script, /toUpperCase\(\)/i, 'Expected post date badge text to be uppercased.');
