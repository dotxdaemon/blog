// ABOUTME: Confirms the post detail view is centered within the viewport.
// ABOUTME: Ensures the post content uses a centered, readable width.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-detail[\s\S]*margin:\s*0\s+auto/i,
  'Expected the post detail view to be centered.'
);
assertMatches(
  css,
  /\.post-detail[\s\S]*max-width:\s*720px/i,
  'Expected the post detail view to have a readable max width.'
);
assertMatches(
  css,
  /\.post-detail[\s\S]*width:\s*100%/i,
  'Expected the post detail view to expand to full width within its max width.'
);
