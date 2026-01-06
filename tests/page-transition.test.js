// ABOUTME: Confirms the site applies a fade-in animation to soften page loads.
// ABOUTME: Verifies the transition respects reduced motion preferences.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const hasFadeKeyframes = /@keyframes\s+page-fade-in[\s\S]*?from\s*{[^}]*opacity:\s*0/i.test(css);
assert.ok(hasFadeKeyframes, 'Expected a page fade-in keyframe starting from zero opacity.');

const endsAtFullOpacity = /@keyframes\s+page-fade-in[\s\S]*?to\s*{[^}]*opacity:\s*1/i.test(css);
assert.ok(endsAtFullOpacity, 'Expected the page fade-in animation to end at full opacity.');

const bodyAnimates = /body[^{]*{[\s\S]*?animation:\s*[^;]*page-fade-in/i.test(css);
assert.ok(bodyAnimates, 'Expected the body to use the page fade-in animation.');

const respectsReducedMotion = /prefers-reduced-motion:\s*reduce[\s\S]*body[^{]*{[\s\S]*animation:\s*none/i.test(
  css
);
assert.ok(
  respectsReducedMotion,
  'Expected reduced motion preferences to disable the page fade animation.'
);
