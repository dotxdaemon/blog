// ABOUTME: Verifies the brutalist stylesheet avoids decorative effects.
// ABOUTME: Ensures no shadows, gradients, or opacity rules are present.
const { assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

assertNotMatches(css, /box-shadow\s*:/i, 'Did not expect box shadows in the stylesheet.');
assertNotMatches(css, /text-shadow\s*:/i, 'Did not expect text shadows in the stylesheet.');
assertNotMatches(css, /filter\s*:/i, 'Did not expect filters in the stylesheet.');
assertNotMatches(css, /opacity\s*:/i, 'Did not expect opacity changes in the stylesheet.');
assertNotMatches(css, /linear-gradient|radial-gradient/i, 'Did not expect gradients in the stylesheet.');
