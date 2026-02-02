// ABOUTME: Verifies the digital gothic styling rules for geometry and data typography.
// ABOUTME: Ensures metadata, overlays, and log layouts match the high-contrast spec.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  /--radius:\s*\d+px/i.test(css),
  'Expected a radius token for rounded surfaces.'
);

assert.ok(
  /body::after[\s\S]*?background:\s*transparent/i.test(css),
  'Expected the overlay to avoid competing with the matrix veil.'
);

assert.ok(
  /\.grid-panel[\s\S]*?background:\s*var\(--panel\)/i.test(css),
  'Expected panels to use the panel color.'
);

assert.ok(
  /\.grid-panel[\s\S]*?border:\s*var\(--borderWidth\)\s+solid\s+var\(--border\)/i.test(css),
  'Expected panels to use the primary border color with a consistent weight.'
);

const navLinkSansPattern = /\.nav-link[\s\S]*?font-family:\s*var\(--font-sans\)/i;
assert.ok(navLinkSansPattern.test(css), 'Expected nav links to use the sans-serif font.');

['post-snippet__meta', 'post-meta'].forEach((className) => {
  const monoPattern = new RegExp(`\\.${className}[\\s\\S]*?font-family:\\s*var\\(--font-mono\\)`, 'i');
  const uppercasePattern = new RegExp(`\\.${className}[\\s\\S]*?text-transform:\\s*none`, 'i');
  const spacingPattern = new RegExp(`\\.${className}[\\s\\S]*?letter-spacing:\\s*0`, 'i');

  assert.ok(monoPattern.test(css), `Expected ${className} metadata to use the monospace font.`);
  assert.ok(uppercasePattern.test(css), `Expected ${className} metadata to avoid uppercase.`);
  assert.ok(spacingPattern.test(css), `Expected ${className} metadata to avoid wide letter spacing.`);
});

assert.ok(
  /\.track-grid[\s\S]*?grid-template-columns:\s*1fr/i.test(css),
  'Expected the track grid to render as a single-column log.'
);

assert.ok(
  /\.panel-row[\s\S]*?color:\s*var\(--text\)/i.test(css),
  'Expected panel rows to use the primary text color.'
);

assert.ok(
  /\.panel-row[\s\S]*?border-bottom:\s*var\(--borderWidth\)\s+solid\s+var\(--border\)/i.test(css),
  'Expected panel rows to use the primary divider border color.'
);
