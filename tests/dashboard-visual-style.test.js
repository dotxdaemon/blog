// ABOUTME: Verifies dashboard visuals match the refined matrix music layout.
// ABOUTME: Checks header rule, card treatment, and interactive post row behavior.
const { assertMatches, readIndexHtml, readStyles, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appScript = readRepoFile('assets/js/app.js');

assertMatches(css, /background:\s*linear-gradient\(180deg,\s*#000000\s*0%,\s*#0a0a0a\s*100%\)/i, 'Expected dark gradient background.');
assertMatches(html, /<div class="site-title-block">[\s\S]*<h1 class="site-title">velvetdaemon<\/h1>[\s\S]*<hr class="site-title-rule"/i, 'Expected title block with matching horizontal rule.');
assertMatches(css, /\.site-main[\s\S]*gap:\s*32px[\s\S]*align-items:\s*start/i, 'Expected dashboard grid gap of 32px with aligned top edges.');
assertMatches(css, /@media\s*\(min-width:\s*768px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i, 'Expected two-column 1fr dashboard grid.');
assertMatches(css, /\.module-card[\s\S]*background-color:\s*rgba\(0,\s*0,\s*0,\s*0\.85\)[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.12\)[\s\S]*border-radius:\s*16px[\s\S]*padding:\s*32px[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected card baseline styles.');
assertMatches(css, /\.module-card:hover[\s\S]*border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.2\)[\s\S]*box-shadow:\s*0\s*12px\s*48px\s*rgba\(0,\s*0,\s*0,\s*0\.7\)/i, 'Expected hover border and shadow lift.');
assertMatches(css, /@keyframes\s+pulse\s*\{[\s\S]*50%\s*\{\s*opacity:\s*0\.5;/i, 'Expected pulse animation keyframes.');
assertMatches(css, /\.post-row:hover[\s\S]*padding-left:\s*8px/i, 'Expected post-row hover shift via left padding.');
assertMatches(css, /\.post-row:hover[\s\S]*\.post-chevron[\s\S]*opacity:\s*1/i, 'Expected arrow reveal on row hover.');
assertMatches(appScript, /month:\s*'short'/, 'Expected short month date formatting.');
assertMatches(appScript, /day:\s*'numeric'/, 'Expected short month-day date formatting.');
assertMatches(appScript, /new Intl\.DateTimeFormat\(undefined,\s*\{[\s\S]*month:\s*'short'[\s\S]*day:\s*'numeric'[\s\S]*\}\)/, 'Expected date format without year.');
