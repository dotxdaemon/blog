// ABOUTME: Validates the homepage against the requested dashboard visual checklist.
// ABOUTME: Confirms gradient styling, hover effects, and card treatment are present.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const app = readRepoFile('assets/js/app.js');

assertMatches(css, /background:\s*linear-gradient\(180deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i, 'Expected gradient background in styles.');
assertMatches(css, /\.module-card[\s\S]*border-radius:\s*16px[\s\S]*padding:\s*32px/i, 'Expected glass card style dimensions.');
assertMatches(css, /\.module-card:hover[\s\S]*border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.2\)/i, 'Expected hover border lift on cards.');
assertMatches(css, /\.section-title[\s\S]*font-size:\s*11px[\s\S]*text-transform:\s*uppercase/i, 'Expected unified compact section headers.');
assertMatches(css, /\.post-row:hover[\s\S]*transform:\s*translateX\(8px\)/i, 'Expected hover shift for post rows.');
assertMatches(app, /month:\s*'short'/i, 'Expected compact month formatting for post dates.');
assertNotMatches(html, /<section[^>]*class="[^"]*featured[^"]*"/i, 'Did not expect a featured section.');
