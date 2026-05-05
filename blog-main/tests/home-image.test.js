// ABOUTME: Verifies the homepage keeps site navigation while showing the requested image.
// ABOUTME: Confirms the approved image asset is present at the expected dimensions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { assertMatches, assertNotMatches, readIndexHtml, readStyles } = require('./helpers');

const indexHtml = readIndexHtml();
const css = readStyles();
const assetPath = path.join(__dirname, '..', 'assets', 'images', 'homepage.png');

assertMatches(
  indexHtml,
  /<header class="site-header">[\s\S]*<nav class="site-nav" aria-label="Primary navigation">[\s\S]*aria-current="page"[\s\S]*home[\s\S]*<\/nav>[\s\S]*<\/header>/i,
  'Expected homepage to keep the site header and navigation.'
);
assertMatches(
  indexHtml,
  /<main class="site-main home-image-main" id="main-content">\s*<section class="home-image-page" role="img" aria-label="Illustrated figure in a black suit and iridescent coat"><\/section>\s*<\/main>/i,
  'Expected homepage main content to contain only the requested image surface.'
);
assertNotMatches(
  indexHtml,
  /class="home-image-body"|data-dashboard|id="posts"|id="album-list"|id="dashboard-track"|assets\/js\/app\.js|assets\/js\/listening-to\.js|assets\/js\/artwork-grid\.js/i,
  'Did not expect the homepage image content to load dashboard, posts, or artwork-grid UI.'
);
assertMatches(
  css,
  /\.site-main\.home-image-main\s*\{\s*display:\s*block;\s*\}/i,
  'Expected the homepage image content to use the normal site shell without grid columns.'
);
assertNotMatches(
  css,
  /\.home-image-body/i,
  'Did not expect homepage-specific body styles to override the site shell.'
);
assertMatches(
  css,
  /\.home-image-page\s*\{[\s\S]*aspect-ratio:\s*2\s*\/\s*3;[\s\S]*background-image:\s*url\('assets\/images\/homepage\.png'\);[\s\S]*background-position:\s*center;[\s\S]*background-repeat:\s*no-repeat;[\s\S]*background-size:\s*contain;[\s\S]*margin:\s*0\s+auto;[\s\S]*max-width:\s*100%;[\s\S]*width:\s*560px;[\s\S]*\}/i,
  'Expected the homepage content area to show the approved asset without taking over the site shell.'
);

assert.ok(fs.existsSync(assetPath), 'Expected the approved homepage image asset to exist.');

const image = fs.readFileSync(assetPath);
assert.strictEqual(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Expected homepage asset to be a PNG.');
assert.strictEqual(image.readUInt32BE(16), 1024, 'Expected homepage image width to match the approved source.');
assert.strictEqual(image.readUInt32BE(20), 1536, 'Expected homepage image height to match the approved source.');
