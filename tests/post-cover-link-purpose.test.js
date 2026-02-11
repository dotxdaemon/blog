// ABOUTME: Ensures post cover links have descriptive accessible names across renderers.
// ABOUTME: Confirms homepage, archives, and search cover anchors expose link purpose text.
const { assertMatches, readRepoFile } = require('./helpers');

const appSource = readRepoFile('assets/js/app.js');
const archivesSource = readRepoFile('assets/js/archives.js');
const searchSource = readRepoFile('assets/js/search.js');

assertMatches(
  appSource,
  /coverLink\.setAttribute\(['"']aria-label['"'],\s*`Open post cover: \$\{coverTitle\}`\)/i,
  'Expected homepage cover links to include descriptive aria-label text.'
);

assertMatches(
  archivesSource,
  /class="post-cover-link"[^\n]+aria-label="Open post cover: \$\{escapeHtml\(post\.title\)\}"/i,
  'Expected archives cover links to include descriptive aria-label text.'
);

assertMatches(
  searchSource,
  /class="post-cover-link"[^\n]+aria-label="Open post cover: \$\{escapeHtml\(post\.title\)\}"/i,
  'Expected search cover links to include descriptive aria-label text.'
);
