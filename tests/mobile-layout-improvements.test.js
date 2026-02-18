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
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.dashboard-track-icon\s*\{[\s\S]*width:\s*min\(100%,\s*220px\)/i,
  'Expected listening waveform width to stay compact on small screens.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*900px\)[\s\S]*\.site-main\s*\{[\s\S]*grid-template-columns:\s*1fr/i,
  'Expected the dashboard to collapse into one column under 900px.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*900px\)[\s\S]*\.post-stream\s*\{[\s\S]*border-left:\s*none/i,
  'Expected the right sidebar divider to be removed in stacked layout.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-footer\s*\{[\s\S]*position:\s*static/i,
  'Expected post footer to use static positioning on small screens.'
);
