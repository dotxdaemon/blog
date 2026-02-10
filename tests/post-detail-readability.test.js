// ABOUTME: Verifies post detail readability styles reduce visual noise behind body text.
// ABOUTME: Ensures post detail pages provide an opaque reading surface and softer matrix layer.
const { assertMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('post.html');
const css = readStyles();

assertMatches(
  html,
  /<body[^>]*class="[^"]*post-page[^"]*"/i,
  'Expected post detail page body to include post-page class for page-specific readability styles.'
);

assertMatches(
  css,
  /\.post-page\s+\.post-detail\s*\{[\s\S]*background-color:\s*rgba\(0,\s*0,\s*0,\s*0\.88\)/i,
  'Expected post detail content to render on an opaque background for legibility.'
);

assertMatches(
  css,
  /\.post-page\s+\.matrix-rain\s*\{[\s\S]*opacity:\s*0\.08/i,
  'Expected matrix rain opacity to be reduced on post detail pages for readability.'
);
