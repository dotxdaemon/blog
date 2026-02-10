// ABOUTME: Verifies dashboard visuals match the requested matrix music layout.
// ABOUTME: Checks hierarchy, glass cards, and energetic hover interactions.
const { assertMatches, readIndexHtml, readStyles, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appScript = readRepoFile('assets/js/app.js');
const matrixScript = readRepoFile('assets/js/matrix.js');

assertMatches(css, /background:\s*linear-gradient\(135deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i, 'Expected base linear background gradient.');
assertMatches(css, /body::after[\s\S]*radial-gradient\(ellipse at center,\s*rgba\(10,\s*10,\s*10,\s*0\)\s*0%,\s*rgba\(0,\s*0,\s*0,\s*0\.6\)\s*100%\)/i, 'Expected centered vignette radial gradient overlay.');
assertMatches(css, /body\s*\{[\s\S]*padding:\s*80px\s*40px/i, 'Expected dashboard body top padding increase.');
assertMatches(html, /<div class="site-title-block">[\s\S]*<h1 class="site-title">velvetdaemon<\/h1>[\s\S]*<hr class="site-title-rule"/i, 'Expected title block with matching horizontal rule.');
assertMatches(css, /\.site-title[\s\S]*font-size:\s*42px[\s\S]*font-weight:\s*600[\s\S]*letter-spacing:\s*-0\.02em/i, 'Expected site title sizing and spacing.');
assertMatches(css, /\.site-title\s*\{[\s\S]*linear-gradient\(180deg,\s*#ffffff\s*0%,\s*rgba\(255,\s*255,\s*255,\s*0\.85\)\s*100%\)/i, 'Expected title gradient text fill.');
assertMatches(css, /\.site-title-block[\s\S]*inline-flex[\s\S]*width:\s*fit-content/i, 'Expected content-width title container.');
assertMatches(css, /\.site-title-rule[\s\S]*rgba\(255,\s*255,\s*255,\s*0\.2\)[\s\S]*margin-top:\s*12px/i, 'Expected brighter title rule with spacing.');
assertMatches(css, /\.site-header[\s\S]*margin-bottom:\s*72px/i, 'Expected larger header-to-cards spacing.');
assertMatches(css, /\.site-main[\s\S]*gap:\s*40px[\s\S]*align-items:\s*start/i, 'Expected dashboard grid gap of 40px with aligned top edges.');
assertMatches(css, /@media\s*\(min-width:\s*768px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i, 'Expected two-column dashboard grid.');
assertMatches(css, /\.module-card[\s\S]*background-color:\s*rgba\(0,\s*0,\s*0,\s*0\.65\)[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.15\)[\s\S]*padding:\s*36px[\s\S]*backdrop-filter:\s*blur\(20px\)/i, 'Expected lighter glass card baseline styles.');
assertMatches(css, /\.module-card:hover[\s\S]*transform:\s*translateY\(-2px\)[\s\S]*border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.25\)/i, 'Expected lifted card hover treatment.');
assertMatches(css, /\.section-title[\s\S]*font-size:\s*10px[\s\S]*letter-spacing:\s*0\.12em[\s\S]*color:\s*rgba\(255,\s*255,\s*255,\s*0\.3\)/i, 'Expected dimmed compact section title style.');
assertMatches(css, /\.live-dot[\s\S]*width:\s*7px[\s\S]*box-shadow:\s*0\s*0\s*12px\s*rgba\(34,\s*197,\s*94,\s*0\.6\)/i, 'Expected stronger live dot glow.');
assertMatches(css, /@keyframes\s+pulse\s*\{[\s\S]*50%\s*\{[\s\S]*opacity:\s*0\.6;[\s\S]*scale\(0\.95\)/i, 'Expected pulse animation opacity and scale keyframes.');
assertMatches(css, /\.dashboard-track-empty[\s\S]*padding:\s*64px\s*24px/i, 'Expected larger empty state treatment.');
assertMatches(css, /\.dashboard-track-empty[\s\S]*rgba\(255,\s*255,\s*255,\s*0\.03\)/i, 'Expected brighter empty state background treatment.');
assertMatches(css, /\.dashboard-track-icon[\s\S]*width:\s*120px[\s\S]*height:\s*120px[\s\S]*animation:\s*float\s*6s\s*ease-in-out\s*infinite/i, 'Expected large floating music note icon.');
assertMatches(css, /\.dashboard-track-text[\s\S]*font-size:\s*15px[\s\S]*rgba\(255,\s*255,\s*255,\s*0\.45\)/i, 'Expected brighter empty state text without pulsing.');
assertMatches(css, /\.dashboard-fields[\s\S]*gap:\s*14px/i, 'Expected wider field spacing.');
assertMatches(css, /\.post-row:hover\s*\{[\s\S]*padding-left:\s*12px[\s\S]*background:\s*rgba\(139,\s*92,\s*246,\s*0\.05\)/i, 'Expected row hover tint and stronger shift.');
assertMatches(css, /\.post-chevron[\s\S]*opacity:\s*0[\s\S]*translateX\(-12px\)[\s\S]*font-size:\s*20px/i, 'Expected hidden chevron baseline state.');
assertMatches(css, /\.post-row:hover\s+\.post-chevron[\s\S]*drop-shadow\(0\s*0\s*8px\s*rgba\(139,\s*92,\s*246,\s*0\.6\)\)/i, 'Expected chevron glow on hover.');
assertMatches(appScript, /month:\s*'short'/, 'Expected short month date formatting.');
assertMatches(appScript, /day:\s*'numeric'/, 'Expected short month-day date formatting.');
assertMatches(matrixScript, /[ア-ン]/, 'Expected katakana glyphs in matrix characters.');
assertMatches(matrixScript, /[0-9]/, 'Expected numbers in matrix characters.');
assertMatches(matrixScript, /[△◇◆○●▲▼]/, 'Expected geometric shapes in matrix characters.');
assertMatches(matrixScript, /0\.1\s*\+\s*Math\.random\(\)\s*\*\s*0\.2/, 'Expected matrix glyph opacity variation between 10% and 30%.');
