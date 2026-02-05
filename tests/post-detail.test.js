// ABOUTME: Confirms the post detail page hides navigation links and preserves formatting.
// ABOUTME: Ensures post body line breaks remain readable on the post view.
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const postHtml = readRepoFile('post.html');
const styles = readStyles();

assertNotMatches(
  postHtml,
  /href="posts\.html"/,
  'Expected the post page to omit the Posts navigation link.'
);
assertNotMatches(
  postHtml,
  /href="index\.html#site-footer"/,
  'Expected the post page to omit the About navigation link.'
);
assertMatches(
  styles,
  /\.post-content[\s\S]*white-space:\s*pre-wrap;/,
  'Expected post content to preserve line breaks.'
);
