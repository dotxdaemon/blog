// ABOUTME: Confirms the site applies a fade-in animation to soften page loads.
// ABOUTME: Verifies the transition respects reduced motion preferences.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const hasFadeKeyframes = /@keyframes\s+page-fade-out[\s\S]*?from\s*{[^}]*opacity:\s*1/i.test(css);
assert.ok(hasFadeKeyframes, 'Expected a page fade-out keyframe starting at full opacity.');

const endsAtZeroOpacity = /@keyframes\s+page-fade-out[\s\S]*?to\s*{[^}]*opacity:\s*0/i.test(css);
assert.ok(endsAtZeroOpacity, 'Expected the page fade-out animation to end at zero opacity.');

const overlayAnimates = /body\s*::before[^{]*{[\s\S]*animation:[^;]*page-fade-out/i.test(css);
assert.ok(overlayAnimates, 'Expected a page overlay to use the fade-out animation.');

const respectsReducedMotion = /prefers-reduced-motion:\s*reduce[\s\S]*body\s*::before[^{]*{[\s\S]*animation:\s*none/i.test(
  css
);
assert.ok(
  respectsReducedMotion,
  'Expected reduced motion preferences to disable the overlay fade animation.'
);
