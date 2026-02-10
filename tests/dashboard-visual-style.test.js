// ABOUTME: Verifies dashboard visuals match the requested matrix music layout.
// ABOUTME: Checks vignette background, card styles, and post hierarchy interactions.
const { assertMatches, readIndexHtml, readStyles, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appScript = readRepoFile('assets/js/app.js');
const matrixScript = readRepoFile('assets/js/matrix.js');

assertMatches(css, /background:\s*linear-gradient\(135deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i, 'Expected base linear background gradient.');
assertMatches(css, /body::after[\s\S]*radial-gradient\(ellipse at center,\s*rgba\(10,\s*10,\s*10,\s*0\)\s*0%,\s*rgba\(0,\s*0,\s*0,\s*0\.6\)\s*100%\)/i, 'Expected centered vignette radial gradient overlay.');
assertMatches(html, /<div class="site-title-block">[\s\S]*<h1 class="site-title">velvetdaemon<\/h1>[\s\S]*<hr class="site-title-rule"/i, 'Expected title block with matching horizontal rule.');
assertMatches(css, /\.site-title[\s\S]*font-size:\s*42px[\s\S]*font-weight:\s*600[\s\S]*letter-spacing:\s*-0\.02em/i, 'Expected site title sizing and spacing.');
assertMatches(css, /\.site-title\s*\{[\s\S]*linear-gradient\(180deg,\s*#ffffff\s*0%,\s*rgba\(255,\s*255,\s*255,\s*0\.85\)\s*100%\)/i, 'Expected title gradient text fill.');
assertMatches(css, /\.site-main[\s\S]*gap:\s*32px[\s\S]*align-items:\s*start/i, 'Expected dashboard grid gap of 32px with aligned top edges.');
assertMatches(css, /@media\s*\(min-width:\s*768px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i, 'Expected two-column dashboard grid.');
assertMatches(css, /\.section-title[\s\S]*font-size:\s*11px[\s\S]*letter-spacing:\s*0\.1em[\s\S]*color:\s*rgba\(255,\s*255,\s*255,\s*0\.35\)/i, 'Expected dimmed uppercase section title style.');
assertMatches(css, /\.live-dot[\s\S]*box-shadow:\s*0\s*0\s*8px\s*rgba\(34,\s*197,\s*94,\s*0\.4\)/i, 'Expected live dot glow.');
assertMatches(css, /@keyframes\s+pulse\s*\{[\s\S]*50%\s*\{\s*opacity:\s*0\.5;[\s\S]*\}/i, 'Expected pulse animation keyframes.');
assertMatches(css, /\.dashboard-track-empty[\s\S]*box-shadow:\s*inset\s*0\s*2px\s*8px\s*rgba\(0,\s*0,\s*0,\s*0\.3\)/i, 'Expected recessed empty state treatment.');
assertMatches(css, /@keyframes\s+wobble\s*\{[\s\S]*25%\s*\{\s*transform:\s*rotate\(-3deg\);[\s\S]*75%\s*\{\s*transform:\s*rotate\(3deg\);/i, 'Expected wobble animation keyframes.');
assertMatches(css, /\.post-row[\s\S]*border-bottom:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.04\)/i, 'Expected subtle post row separators.');
assertMatches(css, /\.post-row:first-child[\s\S]*padding:\s*28px\s*0[\s\S]*\.post-title[\s\S]*font-size:\s*17px[\s\S]*font-weight:\s*600/i, 'Expected first post emphasis styling.');
assertMatches(css, /\.post-chevron[\s\S]*color:\s*#8b5cf6[\s\S]*opacity:\s*0[\s\S]*translateX\(-8px\)/i, 'Expected hidden purple chevron defaults.');
assertMatches(css, /\.post-row:hover\s+\.post-title[\s\S]*text-shadow:\s*0\s*0\s*12px\s*rgba\(139,\s*92,\s*246,\s*0\.3\)/i, 'Expected purple hover glow on post titles.');
assertMatches(appScript, /month:\s*'short'/, 'Expected short month date formatting.');
assertMatches(appScript, /day:\s*'numeric'/, 'Expected short month-day date formatting.');
assertMatches(matrixScript, /[ア-ン]/, 'Expected katakana glyphs in matrix characters.');
assertMatches(matrixScript, /[0-9]/, 'Expected numbers in matrix characters.');
assertMatches(matrixScript, /[△◇◆○●▲▼]/, 'Expected geometric shapes in matrix characters.');
assertMatches(matrixScript, /0\.1\s*\+\s*Math\.random\(\)\s*\*\s*0\.2/, 'Expected matrix glyph opacity variation between 10% and 30%.');
