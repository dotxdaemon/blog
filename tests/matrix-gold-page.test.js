// ABOUTME: Ensures the standalone matrix rain demo is present and wired for visual polish.
// ABOUTME: Confirms aesthetic requirements like a lavender palette, glow, trails, and katakana glyphs exist in source.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'matrix-gold-rain.html');

assert.ok(fs.existsSync(pagePath), 'Expected the matrix rain demo page to exist.');

const html = fs.readFileSync(pagePath, 'utf8');

assert.ok(/<canvas[^>]+id="golden-matrix"/i.test(html), 'Expected a matrix canvas with the golden identifier.');
assert.ok(/#0d0d0d/i.test(html), 'Expected a deep black background color.');
assert.ok(/#e6e6fa/i.test(html), 'Expected the primary lavender color to be defined.');
assert.ok(/Courier\s+New/i.test(html), 'Expected the monospace font to be Courier New.');
assert.ok(/shadowBlur/i.test(html), 'Expected glow or bloom styling via shadow blur.');
assert.ok(/rgba\(13,\s*13,\s*13,\s*0\.05\)/i.test(html), 'Expected smooth trails drawn with a translucent black overlay.');
assert.ok(/[\u30a0-\u30ff]/.test(html), 'Expected Katakana characters in the custom character set.');
