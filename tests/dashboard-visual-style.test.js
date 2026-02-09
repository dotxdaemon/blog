// ABOUTME: Verifies dashboard visuals match the dark two-column music layout.
// ABOUTME: Checks gradient, card treatment, and interactive post row behavior.
const { assertMatches, readIndexHtml, readStyles, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appScript = readRepoFile('assets/js/app.js');

assertMatches(css, /background:\s*linear-gradient\(180deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i, 'Expected dark gradient background.');
assertMatches(css, /\.site-main[\s\S]*gap:\s*32px/i, 'Expected dashboard grid gap of 32px.');
assertMatches(css, /@media\s*\(min-width:\s*768px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i, 'Expected two-column 1fr dashboard grid.');
assertMatches(css, /\.module-card[\s\S]*background-color:\s*rgba\(255,\s*255,\s*255,\s*0\.03\)[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.06\)[\s\S]*border-radius:\s*16px[\s\S]*padding:\s*32px/i, 'Expected glass card baseline styles.');
assertMatches(css, /\.module-card:hover[\s\S]*border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.12\)[\s\S]*box-shadow:\s*0\s*12px\s*48px\s*rgba\(0,\s*0,\s*0,\s*0\.4\)/i, 'Expected hover border/box-shadow lift.');
assertMatches(css, /@keyframes\s+pulse-live-dot/i, 'Expected pulse animation keyframes.');
assertMatches(css, /\.post-row:hover[\s\S]*transform:\s*translateX\(8px\)/i, 'Expected post-row hover shift.');
assertMatches(css, /\.post-row:hover[\s\S]*\.post-chevron[\s\S]*opacity:\s*1/i, 'Expected arrow reveal on row hover.');
assertMatches(appScript, /month:\s*'short'/, 'Expected short month date formatting.');
assertMatches(appScript, /day:\s*'numeric'/, 'Expected short month-day date formatting.');
assertMatches(html, /class="post-stream module-card"/i, 'Expected recent posts to use shared card style.');
