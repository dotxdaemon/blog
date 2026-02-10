// ABOUTME: Verifies homepage visual structure aligns with the dashboard styling request.
// ABOUTME: Ensures gradients, shared cards, and hover affordances are active.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appSource = readRepoFile('assets/js/app.js');

assertMatches(css, /background:\s*linear-gradient\(135deg,\s*#0a0a0a\s*0%,\s*#000000\s*100%\)/i, 'Expected gradient usage in homepage styles.');
assertMatches(css, /\.module-card[\s\S]*background-color:\s*rgba\(10,\s*10,\s*10,\s*0\.8\)/i, 'Expected translucent shared card surface.');
assertMatches(css, /@media\s*\(min-width:\s*768px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/i, 'Expected homepage main area to use an equal two-column grid.');
assertNotMatches(html, /<section[^>]*class="[^"]*featured[^"]*"/i, 'Did not expect the featured module in homepage markup.');
assertMatches(appSource, /className\s*=\s*['"]post-chevron['"]/i, 'Expected recent post rows to include a chevron affordance.');
