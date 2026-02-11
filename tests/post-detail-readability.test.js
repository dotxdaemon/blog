// ABOUTME: Verifies post detail card and typography styles preserve long-form readability.
// ABOUTME: Ensures content card, headings, links, code, and blockquote styles are applied.
const { assertMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('post.html');
const css = readStyles();

assertMatches(
  html,
  /<body[^>]*class="[^"]*post-page[^"]*"/i,
  'Expected post detail page body to include post-page class.'
);

assertMatches(
  css,
  /\.post-page\s+\.post-detail\s*\{[\s\S]*background:\s*var\(--card-bg-strong\)[\s\S]*border:\s*var\(--border-width\)\s*solid\s*var\(--border\)[\s\S]*border-radius:\s*var\(--radius-2\)[\s\S]*padding:\s*var\(--space-6\)/i,
  'Expected post detail content card to match the dashboard glass treatment.'
);

assertMatches(
  css,
  /\.post-page\s+\.post-content\s*\{[\s\S]*font-size:\s*17px[\s\S]*line-height:\s*1\.8[\s\S]*max-width:\s*680px/i,
  'Expected post content to use readable long-form typography.'
);

assertMatches(css, /\.post-page\s+\.post-content\s+h2[\s\S]*font-size:\s*24px/i, 'Expected H2 sizing in post content.');
assertMatches(css, /\.post-page\s+\.post-content\s+h3[\s\S]*font-size:\s*20px/i, 'Expected H3 sizing in post content.');
assertMatches(css, /\.post-page\s+\.post-content\s+h4[\s\S]*font-size:\s*18px/i, 'Expected H4 sizing in post content.');
assertMatches(css, /\.post-page\s+\.post-content\s+a\s*\{[\s\S]*color:\s*rgba\(255,\s*255,\s*255,\s*0\.82\)/i, 'Expected neutral link styling in post content.');
assertMatches(css, /\.post-page\s+\.post-content\s+pre\s*\{[\s\S]*overflow-x:\s*auto/i, 'Expected scrollable code blocks in post content.');
assertMatches(css, /\.post-page\s+\.post-content\s+blockquote\s*\{[\s\S]*border-left:\s*3px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.22\)/i, 'Expected neutral-accent blockquote styling.');
