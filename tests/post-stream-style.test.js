// ABOUTME: Ensures the homepage post stream follows the editorial spacing system.
// ABOUTME: Confirms divider, offsets, and readable content width are present.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-stream[\s\S]*margin-top:\s*160px/i,
  'Expected a 160px vertical offset before the recent posts section.'
);
assertMatches(
  css,
  /\.post-stream[\s\S]*max-width:\s*640px/i,
  'Expected the recent posts section to cap at 640px width.'
);
assertMatches(
  css,
  /\.post-stream[\s\S]*border-top:\s*1px\s+solid\s+var\(--line\)/i,
  'Expected a 1px divider above recent posts.'
);
assertMatches(
  css,
  /\.post-stream[\s\S]*padding-top:\s*80px/i,
  'Expected an 80px gap between divider and section heading.'
);
assertMatches(
  css,
  /\.post-stream\s+\.section-title[\s\S]*margin-bottom:\s*64px/i,
  'Expected a 64px gap between heading and first post item.'
);
