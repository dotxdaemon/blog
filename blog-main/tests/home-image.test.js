// ABOUTME: Verifies the homepage renders only the requested image.
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
  /<body class="home-image-body">\s*<main class="home-image-page" role="img" aria-label="Illustrated figure in a black suit and iridescent coat"><\/main>\s*<\/body>/i,
  'Expected homepage body to contain only the requested image surface.'
);
assertNotMatches(
  indexHtml,
  /<header\b|<nav\b|<footer\b|<script\b|<img\b|data-dashboard|id="posts"|id="album-list"|id="dashboard-track"/i,
  'Did not expect the image-only homepage to render navigation, scripts, widgets, or extra image elements.'
);
assertMatches(
  css,
  /\.home-image-body\s*\{[\s\S]*background-color:\s*#0f0f0f;[\s\S]*margin:\s*0;[\s\S]*min-height:\s*100svh;[\s\S]*min-height:\s*100dvh;[\s\S]*padding:\s*0;[\s\S]*\}/i,
  'Expected the image-only homepage body to fill the viewport without page spacing.'
);
assertMatches(
  css,
  /\.home-image-body::before,\s*\.home-image-body::after\s*\{\s*content:\s*none;\s*\}/i,
  'Expected the image-only homepage to suppress global background overlays.'
);
assertMatches(
  css,
  /\.home-image-page\s*\{[\s\S]*background-image:\s*url\('assets\/images\/homepage\.png'\);[\s\S]*background-position:\s*center;[\s\S]*background-repeat:\s*no-repeat;[\s\S]*background-size:\s*contain;[\s\S]*min-height:\s*100svh;[\s\S]*min-height:\s*100dvh;[\s\S]*width:\s*100%;[\s\S]*\}/i,
  'Expected the homepage image surface to show the approved asset without cropping.'
);

assert.ok(fs.existsSync(assetPath), 'Expected the approved homepage image asset to exist.');

const image = fs.readFileSync(assetPath);
assert.strictEqual(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Expected homepage asset to be a PNG.');
assert.strictEqual(image.readUInt32BE(16), 1024, 'Expected homepage image width to match the approved source.');
assert.strictEqual(image.readUInt32BE(20), 1536, 'Expected homepage image height to match the approved source.');
