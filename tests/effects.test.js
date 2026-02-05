// ABOUTME: Verifies the refined stylesheet uses subtle depth cues.
// ABOUTME: Ensures shadows are present while avoiding heavy filters.
const { assertMatches, assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /box-shadow\s*:\s*var\(--shadow\)/i, 'Expected shared shadow tokens to be used.');
assertNotMatches(css, /text-shadow\s*:/i, 'Did not expect text shadows in the stylesheet.');
assertNotMatches(css, /filter\s*:/i, 'Did not expect filters in the stylesheet.');
assertNotMatches(css, /opacity\s*:/i, 'Did not expect opacity changes in the stylesheet.');
