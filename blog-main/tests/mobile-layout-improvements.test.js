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
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.site-nav\s*\{[\s\S]*gap:\s*10px/i,
  'Expected mobile navigation to tighten spacing for compact wrapping.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.site-nav a\s*\{[\s\S]*min-height:\s*36px/i,
  'Expected mobile navigation links to preserve a larger tap target.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.album-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected phones to show a 3-column grid at the general mobile breakpoint.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*420px\)[\s\S]*\.album-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected narrow phones to collapse the grid to 2 columns.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*900px\)[\s\S]*\.site-main\s*\{[\s\S]*grid-template-columns:\s*1fr/i,
  'Expected the dashboard to collapse into one column under 900px.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*900px\)[\s\S]*\.post-stream\s*\{[\s\S]*max-width:\s*none/i,
  'Expected posts stream to expand to full width in stacked layout.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.post-footer\s*\{[\s\S]*position:\s*static/i,
  'Expected post footer to use static positioning on small screens.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.site-header\s*\{[\s\S]*margin-bottom:\s*var\(--space-4\)/i,
  'Expected mobile header spacing to be denser than desktop spacing.'
);

assertMatches(
  css,
  /@media\s*\(max-width:\s*767px\)[\s\S]*\.module-card,\s*[\s\S]*\.post-stream,\s*[\s\S]*\.post-page \.post-detail\s*\{[\s\S]*padding:\s*24px\s+var\(--space-2\)/i,
  'Expected mobile card padding to be reduced for a denser vertical rhythm.'
);
