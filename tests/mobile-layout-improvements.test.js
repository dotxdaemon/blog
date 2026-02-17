// ABOUTME: Verifies mobile rules keep key homepage and post UI elements readable on narrow screens.
// ABOUTME: Ensures dashboard status, artwork, and post footer adjust layout within the mobile breakpoint.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.dashboard-status\s*\{[\s\S]*position:\s*static/i,
  'Expected dashboard status to use static positioning on small screens.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.dashboard-track-artwork,[\s\S]*\.dashboard-track-icon\s*\{[\s\S]*width:\s*min\(100%,\s*320px\)/i,
  'Expected dashboard artwork and icon width to scale within small screens.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-footer\s*\{[\s\S]*position:\s*static/i,
  'Expected post footer to use static positioning on small screens.'
);
