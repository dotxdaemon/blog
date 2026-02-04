// ABOUTME: Ensures the post detail page renders title, date, and body content.
// ABOUTME: Confirms cluttered post detail elements remain removed.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const html = readRepoFile('post.html');
const script = readRepoFile('assets/js/post-detail.js');

assertMatches(html, /id="post-title"/i, 'Expected the post title to remain.');
assertMatches(html, /id="post-date"/i, 'Expected the post date to remain.');
assertMatches(html, /id="post-content"/i, 'Expected the post content container to be restored.');

assertNotMatches(html, /id="reading-time"/i, 'Expected reading time to be removed.');
assertNotMatches(html, /id="edit-link"/i, 'Expected edit link to be removed.');
assertNotMatches(html, /id="post-toc"/i, 'Expected table of contents container to be removed.');
assertNotMatches(html, /id="post-tags"/i, 'Expected post tags container to be removed.');
assertNotMatches(html, /id="post-navigation"/i, 'Expected post navigation to be removed.');
assertNotMatches(html, /id="back-to-top"/i, 'Expected back to top button to be removed.');
assertNotMatches(html, /progress-container/i, 'Expected progress bar container to be removed.');

assertMatches(script, /post-content/i, 'Expected post detail script to render post content.');
assertNotMatches(script, /reading-time/i, 'Expected post detail script to stop referencing reading time.');
assertNotMatches(script, /post-tags/i, 'Expected post detail script to stop rendering tags.');
assertNotMatches(script, /post-navigation/i, 'Expected post detail script to stop rendering navigation.');
assertNotMatches(script, /post-toc/i, 'Expected post detail script to stop rendering table of contents.');
