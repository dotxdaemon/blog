// ABOUTME: Verifies dashboard visuals match the requested matrix music layout.
// ABOUTME: Checks texture overlays, glass cards, and active-state interactions.
const { assertMatches, readIndexHtml, readStyles, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appScript = readRepoFile('assets/js/app.js');
const matrixScript = readRepoFile('assets/js/matrix.js');

assertMatches(css, /background:\s*linear-gradient\(135deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i, 'Expected base linear background gradient.');
assertMatches(css, /body::after[\s\S]*radial-gradient\(circle,\s*transparent\s*60%,\s*black\s*100%\)/i, 'Expected vignette darkening at viewport edges.');
assertMatches(css, /body::before[\s\S]*opacity:\s*0\.05/i, 'Expected subtle grain/noise overlay opacity.');
assertMatches(html, /class="matrix-rain"/i, 'Expected matrix canvas to be present.');
assertMatches(css, /\.module-card[\s\S]*background-color:\s*rgba\(10,\s*10,\s*10,\s*0\.8\)/i, 'Expected translucent card background treatment.');
assertMatches(css, /\.module-card[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.15\)/i, 'Expected micro-borders on cards.');
assertMatches(css, /\.module-card[\s\S]*border-radius:\s*8px/i, 'Expected tighter card corners.');
assertMatches(css, /\.module-card[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected glass blur depth on cards.');
assertMatches(css, /\.section-title[\s\S]*font-family:\s*'JetBrains Mono'/i, 'Expected monospace labels for interface metadata.');
assertMatches(css, /\.post-date[\s\S]*color:\s*#888/i, 'Expected deemphasized date styling.');
assertMatches(css, /@keyframes\s+pulse\s*\{[\s\S]*50%\s*\{[\s\S]*opacity:\s*0\.5;[\s\S]*scale\(1\.2\)/i, 'Expected live status pulse scale and opacity animation.');
assertMatches(html, /class="dashboard-track-icon"[\s\S]*<svg/i, 'Expected placeholder icon to use SVG artwork.');
assertMatches(css, /\.dashboard-scrub/i, 'Expected a scrub bar container in dashboard styles.');
assertMatches(css, /\.post-list::before[\s\S]*1px\s*solid\s*#333/i, 'Expected timeline guide line for recent posts.');
assertMatches(css, /\.post-row:hover\s+\.post-link[\s\S]*color:\s*#00ff00/i, 'Expected hover state to use green accent color.');
assertMatches(css, /\.post-chevron\s*\{[\s\S]*color:\s*rgba\(255,\s*255,\s*255,\s*0\.35\)/i, 'Expected post chevron to remain neutral when inactive.');
assertMatches(css, /\.post-link::before[\s\S]*content:\s*["']>["']/i, 'Expected terminal cursor indicator on post links.');
assertMatches(css, /\.post-row:nth-child\(odd\)[\s\S]*rgba\(255,\s*255,\s*255,\s*0\.03\)/i, 'Expected subtle zebra striping for scannability.');
assertMatches(appScript, /month:\s*'short'/, 'Expected short month date formatting.');
assertMatches(appScript, /day:\s*'numeric'/, 'Expected short month-day date formatting.');
assertMatches(matrixScript, /0\.1\s*\+\s*Math\.random\(\)\s*\*\s*0\.05/, 'Expected matrix glyph opacity variation between 10% and 15%.');
assertMatches(matrixScript, /const\s+headAlpha\s*=\s*0\.1\s*\+\s*Math\.random\(\)\s*\*\s*0\.05/, 'Expected matrix head glyph opacity to match the attenuated 10-15% range.');
