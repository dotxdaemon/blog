// ABOUTME: Validates the homepage against the requested visual checklist.
// ABOUTME: Confirms scrim, layout, spacing, typography, and module structure requirements.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const app = readRepoFile('assets/js/app.js');

// 1) Background treatment over the matrix canvas.
assertMatches(css, /body::before[\s\S]*linear-gradient\(180deg,[\s\S]*0\.86[\s\S]*0\.82\)/i, 'Expected a dark scrim overlay.');
assertMatches(css, /body::after[\s\S]*radial-gradient\([\s\S]*circle at center[\s\S]*0\.03[\s\S]*0\.56[\s\S]*0\.9[\s\S]*\)/i, 'Expected a radial mask overlay.');
assertMatches(readRepoFile('assets/js/matrix.js'), /fadeFill\s*=\s*'rgba\(11, 8, 20, 0\.4\)'/i, 'Expected reduced matrix contrast.');

// 2) Single centered container and aligned grid.
assertMatches(css, /\.layout[\s\S]*max-width:\s*1120px/i, 'Expected centered container width between 1040 and 1200.');
assertMatches(css, /\.site-header[\s\S]*padding:\s*var\(--space-4\)/i, 'Expected top bar to use shared card spacing.');
assertMatches(css, /@media\s*\(min-width:\s*900px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*0\.95fr\)\s*minmax\(0,\s*1\.05fr\)/i, 'Expected two-column layout with consistent gap.');

// 3) Spacing scale consistency.
assertMatches(css, /--space-2:\s*16px/i, 'Expected 16px spacing increment token.');
assertMatches(css, /--space-3:\s*24px/i, 'Expected 24px spacing increment token.');
assertMatches(css, /--space-4:\s*32px/i, 'Expected 32px spacing increment token.');
assertMatches(css, /--space-5:\s*40px/i, 'Expected 40px spacing increment token.');

// 4) Reduced non-interactive pills.
assertMatches(css, /button,\s*\ninput[\s\S]*border-radius:\s*9999px/i, 'Expected pills to remain for interactive inputs.');
assertNotMatches(css, /\.site-main\s*\{[^}]*border-radius:\s*9999px/i, 'Did not expect giant non-interactive pills in layout containers.');

// 5) Typography hierarchy.
assertMatches(css, /\.site-title[\s\S]*font-size:\s*1\.75rem[\s\S]*font-weight:\s*700/i, 'Expected page title hierarchy.');
assertMatches(css, /\.section-title[\s\S]*font-size:\s*1\.05rem[\s\S]*font-weight:\s*600/i, 'Expected section title hierarchy.');
assertMatches(css, /\.post-title[\s\S]*font-size:\s*0\.98rem[\s\S]*font-weight:\s*600/i, 'Expected row title hierarchy.');
assertMatches(css, /\.post-date[\s\S]*font-size:\s*0\.78rem[\s\S]*font-weight:\s*500[\s\S]*line-height:\s*1\.5/i, 'Expected compact muted metadata styles.');

// 6) Recent posts as a real list row shape.
assertMatches(app, /className\s*=\s*'post-chevron'/i, 'Expected row affordance chevron.');
assertMatches(css, /\.post-row:hover,[\s\S]*border-color:[\s\S]*transform:\s*translateY\(-1px\)/i, 'Expected consistent row hover/focus state.');

// 7) Left module simplified from 2x2 to one feature.
assertMatches(css, /\.featured-card[\s\S]*min-height:\s*280px/i, 'Expected one featured card column.');
assertMatches(app, /function createFeaturedPost\(post\)/i, 'Expected one featured post item.');

// 8) Unified radii, borders, and shadows.
assertMatches(css, /--radius:\s*14px/i, 'Expected one primary radius token.');
assertMatches(css, /--radius-sm:\s*var\(--radius\)/i, 'Expected one shared radius token across components.');
assertMatches(css, /--border:\s*rgba\(255,\s*255,\s*255,\s*0\.08\)/i, 'Expected low-opacity unified border color.');
assertMatches(css, /--shadow:\s*0\s*12px\s*40px\s*rgba\(0,\s*0,\s*0,\s*0\.45\)/i, 'Expected soft shared shadow token.');

// 9) Main surface model and footer cleanup.
assertMatches(html, /<main[^>]*class="site-main"/i, 'Expected one main surface card wrapper.');
assertMatches(html, /<footer[^>]*class="site-footer"[^>]*><\/footer>/i, 'Expected compact footer container without oversized content pill.');
