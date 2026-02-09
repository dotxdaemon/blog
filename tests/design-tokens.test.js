// ABOUTME: Validates the core tokens that drive the refined site theme.
// ABOUTME: Ensures the base colors, spacing, and depth tokens are defined and used.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /--ink:\s*#ffffff/i, 'Expected the ink token to be defined.');
assertMatches(css, /--paper:\s*#000000/i, 'Expected the paper token to be defined.');
assertMatches(css, /--surface:\s*rgba\(0,\s*0,\s*0,\s*0\.94\)/i, 'Expected the surface token to be defined.');
assertMatches(css, /--border:\s*rgba\(255,\s*255,\s*255,\s*0\.08\)/i, 'Expected the border token to be defined.');
assertMatches(css, /--border-width:\s*1px/i, 'Expected the border width token to be 0px.');
assertMatches(css, /--radius:\s*0px/i, 'Expected the radius token to be flat.');
assertMatches(css, /--shadow:\s*none/i, 'Expected the shadow token to be removed.');

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
  /body[\s\S]*font-family:[^;]*Inter/i,
  'Expected the body to use the Inter font stack.'
);
