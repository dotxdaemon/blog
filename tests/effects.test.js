// ABOUTME: Verifies the dashboard stylesheet uses layered depth and subtle motion.
// ABOUTME: Ensures glow, contrast, and transition effects are present and constrained.
const { assertMatches, assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /text-shadow\s*:\s*0\s*0\s*40px\s*rgba\(255,\s*255,\s*255,\s*0\.1\)/i, 'Expected subtle header glow shadow.');
assertMatches(css, /box-shadow\s*:\s*0\s*(8|12)px\s*(32|40)px\s*rgba\(0,\s*0,\s*0,\s*0\.(5|6)\)/i, 'Expected card drop shadow styling.');
assertMatches(css, /backdrop-filter\s*:\s*blur\(12px\)/i, 'Expected card backdrop blur for contrast.');
assertMatches(css, /transition\s*:[^;]*cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)/i, 'Expected smooth cubic-bezier transitions.');
