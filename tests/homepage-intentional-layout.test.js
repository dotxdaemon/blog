// ABOUTME: Validates homepage balance, hierarchy, and intentional dark-surface composition.
// ABOUTME: Ensures featured and recent sections share visual weight and clear structure.
const { assertMatches, assertNotMatches, readIndexHtml, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();

assertMatches(html, /<nav[^>]*class="site-nav"/i, 'Expected primary navigation in the top bar.');
assertMatches(html, /<section[^>]*class="featured"/i, 'Expected a featured section on the homepage.');
assertMatches(css, /\.site-main[\s\S]*padding:\s*var\(--space-4\)/i, 'Expected one primary padded surface for content.');
assertMatches(css, /@media\s*\(min-width:\s*900px\)[\s\S]*grid-template-columns:\s*minmax\(0,\s*0\.95fr\)\s*minmax\(0,\s*1\.05fr\)/i, 'Expected balanced desktop composition without dead space.');
assertMatches(css, /\.featured-card[\s\S]*linear-gradient/i, 'Expected a dark featured card gradient.');
assertNotMatches(css, /\.featured-card[\s\S]*#f/i, 'Did not expect near-white featured card backgrounds.');
