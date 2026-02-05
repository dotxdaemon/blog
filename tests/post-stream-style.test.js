// ABOUTME: Ensures the front page post stream uses the shared panel style.
// ABOUTME: Confirms matching border and padding treatments for symmetry.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-stream[\s\S]*border:\s*var\(--border-width\)\s+solid\s+var\(--border\)/i,
  'Expected the post stream to use the shared panel border.'
);
assertMatches(
  css,
  /\.post-stream[\s\S]*padding:\s*var\(--space-4\)/i,
  'Expected the post stream to use the shared panel padding.'
);
assertMatches(
  css,
  /\.post-list[\s\S]*margin-top:\s*var\(--space-3\)/i,
  'Expected the post list to align spacing with the panel spacing scale.'
);
