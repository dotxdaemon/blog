// ABOUTME: Verifies the digital gothic styling rules for geometry and data typography.
// ABOUTME: Ensures metadata, overlays, and log layouts match the high-contrast spec.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  /--radius-lg:\s*\d+px/i.test(css),
  'Expected a large radius token for rounded surfaces.'
);

assert.ok(
  /body::after[\s\S]*?background:\s*var\(--backdrop\)/i.test(css),
  'Expected the overlay to use the backdrop theme variable.'
);

assert.ok(
  /\.grid-panel[\s\S]*?background:\s*var\(--panel-surface\)/i.test(css),
  'Expected panels to use the panel surface color.'
);

assert.ok(
  /\.grid-panel[\s\S]*?border:\s*var\(--border-width\)\s+solid\s+var\(--border-subtle\)/i.test(css),
  'Expected panels to use the subtle border color with a consistent weight.'
);

const navLinkSansPattern = /\.nav-link[\s\S]*?font-family:\s*var\(--font-sans\)/i;
assert.ok(navLinkSansPattern.test(css), 'Expected nav links to use the sans-serif font.');

['post-snippet__meta', 'post-meta'].forEach((className) => {
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
  /\.recent-track[\s\S]*?color:\s*var\(--text-primary\)/i.test(css),
  'Expected recent tracks to use the primary text color.'
);

assert.ok(
  /\.recent-track[\s\S]*?border-bottom:\s*var\(--border-width\)\s+solid\s+var\(--border-subtle\)/i.test(css),
  'Expected recent tracks to use the subtle divider border color.'
);
