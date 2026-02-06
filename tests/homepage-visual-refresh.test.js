// ABOUTME: Verifies homepage visual structure aligns with the readability-focused layout.
// ABOUTME: Ensures background treatment, featured module, and post list hierarchy are consistent.
const { assertMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appSource = readRepoFile('assets/js/app.js');

assertMatches(
  css,
  /body::before[\s\S]*background:\s*linear-gradient\(180deg,\s*rgba\(7,\s*5,\s*14,\s*0\.78\),\s*rgba\(5,\s*4,\s*10,\s*0\.72\)\)/i,
  'Expected a dark scrim overlay over the background canvas.'
);
assertMatches(
  css,
  /body::after[\s\S]*radial-gradient\([\s\S]*circle at center[\s\S]*0\.08\)[\s\S]*0\.62\)[\s\S]*0\.88\)/i,
  'Expected a radial fade mask that keeps the center calmer than the edges.'
);
assertMatches(
  css,
  /@media\s*\(min-width:\s*900px\)[\s\S]*\.site-main[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected the homepage main area to use a weighted two-column grid.'
);
assertMatches(
  css,
  /\.featured-card[\s\S]*min-height:\s*280px/i,
  'Expected the featured module to use a single primary card block.'
);
assertMatches(
  appSource,
  /function createFeaturedPost\(post\)/i,
  'Expected the page script to build a featured post block.'
);
assertMatches(
  appSource,
  /className\s*=\s*['"]post-chevron['"]/i,
  'Expected recent post rows to include a subtle chevron affordance.'
);
