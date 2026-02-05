// ABOUTME: Validates the core tokens that drive the refined site theme.
// ABOUTME: Ensures the base colors, spacing, and depth tokens are defined and used.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /--ink:\s*#EADFFF/i, 'Expected the ink token to be defined.');
assertMatches(css, /--paper:\s*#0B0814/i, 'Expected the paper token to be defined.');
assertMatches(css, /--surface:\s*#161125/i, 'Expected the surface token to be defined.');
assertMatches(css, /--border:\s*#3A2D55/i, 'Expected the border token to be defined.');
assertMatches(css, /--border-width:\s*0px/i, 'Expected the border width token to be 0px.');
assertMatches(css, /--radius:\s*18px/i, 'Expected the radius token to be defined.');
assertMatches(css, /--shadow:\s*0 18px 40px rgba\(10, 6, 20, 0.6\)/i, 'Expected the shadow token to be defined.');

assertMatches(
  css,
  /body[\s\S]*background-color:\s*var\(--paper\)/i,
  'Expected the body background to use the paper token.'
);
assertMatches(
  css,
  /body[\s\S]*color:\s*var\(--ink\)/i,
  'Expected the body text color to use the ink token.'
);
assertMatches(
  css,
  /body[\s\S]*font-family:[^;]*Merriweather/i,
  'Expected the body to use the Merriweather font.'
);
