// ABOUTME: Verifies the digital gothic styling rules for geometry and data typography.
// ABOUTME: Ensures metadata, overlays, and log layouts match the high-contrast spec.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  /\*,\s*\*::before,\s*\*::after[\s\S]*?border-radius:\s*0/i.test(css),
  'Expected a global border-radius reset for all elements.'
);

assert.ok(
  /body::after[\s\S]*?background:\s*var\(--backdrop\)/i.test(css),
  'Expected the overlay to use the backdrop theme variable.'
);

assert.ok(
  /\.post-card[\s\S]*?background:\s*transparent/i.test(css),
  'Expected post cards to use a transparent background.'
);

assert.ok(
  /\.post-snippet[\s\S]*?border-bottom:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.1\)/i.test(css),
  'Expected post snippets to use a single divider line.'
);

['nav-link', 'post-snippet__meta', 'post-meta'].forEach((className) => {
  const monoPattern = new RegExp(`\\.${className}[\\s\\S]*?font-family:\\s*var\\(--font-mono\\)`, 'i');
  const uppercasePattern = new RegExp(`\\.${className}[\\s\\S]*?text-transform:\\s*uppercase`, 'i');
  const spacingPattern = new RegExp(`\\.${className}[\\s\\S]*?letter-spacing:\\s*0\\.05em`, 'i');

  assert.ok(monoPattern.test(css), `Expected ${className} metadata to use the monospace font.`);
  assert.ok(uppercasePattern.test(css), `Expected ${className} metadata to be uppercase.`);
  assert.ok(spacingPattern.test(css), `Expected ${className} metadata to use wider letter spacing.`);
});

assert.ok(
  /\.track-grid[\s\S]*?grid-template-columns:\s*1fr/i.test(css),
  'Expected the track grid to render as a single-column log.'
);

assert.ok(
  /\.track-card[\s\S]*?background:\s*transparent/i.test(css),
  'Expected track cards to remove heavy backgrounds.'
);

assert.ok(
  /\.track-card[\s\S]*?border-bottom:\s*1px\s+solid\s+rgba\(255,\s*255,\s*255,\s*0\.1\)/i.test(css),
  'Expected track cards to use divider lines.'
);
