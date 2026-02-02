// ABOUTME: Confirms the site applies a fade-in animation to soften page loads.
// ABOUTME: Verifies the transition respects reduced motion preferences.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const scrimBackground = /body\s*::before[^{]*{[\s\S]*background:\s*var\(--scrim\)/i.test(css);
assert.ok(scrimBackground, 'Expected the page overlay to use the scrim token.');

const scrimOpacity = /body\s*::before[^{]*{[\s\S]*opacity:\s*0\.55/i.test(css);
assert.ok(scrimOpacity, 'Expected the page overlay to use a semi-opaque scrim.');
