// ABOUTME: Verifies homepage visual structure aligns with the flat styling request.
// ABOUTME: Ensures gradients and featured module are removed.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appSource = readRepoFile('assets/js/app.js');

assertMatches(css, /body::before[\s\S]*background:\s*rgba\(0,\s*0,\s*0,\s*0\.9\)/i, 'Expected a flat scrim overlay over the background canvas.');
assertNotMatches(css, /gradient\(/i, 'Did not expect gradient usage in homepage styles.');
assertMatches(
  css,
  /\.layout[\s\S]*background-color:\s*var\(--surface\)[\s\S]*border:\s*var\(--border-width\)\s*solid\s*var\(--border\)[\s\S]*box-shadow:\s*var\(--shadow\)/i,
  'Expected the homepage to use a single primary surface container.'
);
assertMatches(
  css,
  /@media\s*\(min-width:\s*900px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.2fr\)\s*minmax\(0,\s*0\.8fr\)/i,
  'Expected the homepage main area to use a weighted two-column grid.'
);
assertNotMatches(html, /<section[^>]*class="[^"]*featured[^"]*"/i, 'Did not expect the featured module in homepage markup.');
assertNotMatches(appSource, /function createFeaturedPost\(post\)/i, 'Did not expect featured post rendering in homepage script.');
assertMatches(
  appSource,
  /className\s*=\s*['"]post-chevron['"]/i,
  'Expected recent post rows to include a subtle chevron affordance.'
);
