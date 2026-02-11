// ABOUTME: Validates the core tokens that drive the refined site theme.
// ABOUTME: Ensures the base colors, spacing, and depth tokens are defined and used.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /--ink:\s*#ffffff/i, 'Expected the ink token to be defined.');
assertMatches(css, /--paper:\s*#000000/i, 'Expected the paper token to be defined.');
assertMatches(css, /--card-bg:\s*rgba\(10,\s*10,\s*10,\s*0\.8\)/i, 'Expected the surface token to be defined.');
assertMatches(css, /--border:\s*rgba\(255,\s*255,\s*255,\s*0\.12\)/i, 'Expected the border token to be defined.');
assertMatches(css, /--radius-1:\s*8px/i, 'Expected the radius scale token to be defined.');
assertMatches(css, /--space-1:\s*8px/i, 'Expected the spacing scale to start at 8px.');
assertMatches(css, /--accent:\s*#00f0ff/i, 'Expected a single accent token to be defined.');

assertMatches(
  css,
  /body[\s\S]*background:\s*linear-gradient/i,
  'Expected the body background to use the shared gradient surface.'
);
assertMatches(
  css,
  /body[\s\S]*color:\s*var\(--ink\)/i,
  'Expected the body text color to use the ink token.'
);
assertMatches(
  css,
  /body[\s\S]*font-family:[^;]*(var\(--font-body\)|Inter)/i,
  'Expected the body to use the Inter font stack.'
);
