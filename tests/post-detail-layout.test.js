// ABOUTME: Confirms the post detail view follows the matrix template layout and spacing.
// ABOUTME: Ensures post page width, padding, and back navigation placement are correct.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /\.post-page\s*\{[\s\S]*background:\s*linear-gradient\(135deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i,
  'Expected post page to use the dashboard gradient background.'
);
assertMatches(
  css,
  /\.post-page::after\s*\{[\s\S]*radial-gradient\(ellipse at center,\s*rgba\(10,\s*10,\s*10,\s*0\)\s*0%,\s*rgba\(0,\s*0,\s*0,\s*0\.6\)\s*100%\)/i,
  'Expected post page to include the centered vignette overlay.'
);
assertMatches(
  css,
  /\.post-page\s+\.layout\s*\{[\s\S]*max-width:\s*800px[\s\S]*padding:\s*80px\s*40px\s*120px\s*40px/i,
  'Expected post layout width and desktop padding to match requirements.'
);
assertMatches(
  css,
  /\.post-back-link\s*\{[\s\S]*position:\s*absolute[\s\S]*top:\s*40px[\s\S]*left:\s*40px/i,
  'Expected back navigation to be absolutely positioned from the top-left.'
);
assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-page\s+\.layout\s*\{[\s\S]*padding:\s*60px\s*24px\s*100px\s*24px/i,
  'Expected mobile post layout padding adjustments.'
);
assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-back-link\s*\{[\s\S]*top:\s*24px[\s\S]*left:\s*24px/i,
  'Expected mobile back-link offsets.'
);
