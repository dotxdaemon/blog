// ABOUTME: Ensures the front page post stream mirrors the last played widget.
// ABOUTME: Confirms matching border and padding treatments for symmetry.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-stream[\s\S]*border-top:\s*var\(--border-width\)\s+solid\s+var\(--black\)/i,
  'Expected the post stream to include a top border.'
);
assertMatches(
  css,
  /\.post-stream[\s\S]*border-bottom:\s*var\(--border-width\)\s+solid\s+var\(--black\)/i,
  'Expected the post stream to include a bottom border.'
);
assertMatches(
  css,
  /\.post-stream[\s\S]*padding:\s*12px/i,
  'Expected the post stream to use the same padding as the last played widget.'
);
assertMatches(
  css,
  /\.post-list[\s\S]*margin-top:\s*8px/i,
  'Expected the post list to align spacing with the track list.'
);
