// ABOUTME: Validates the monochrome palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const lightPalette = [
  ['--background', '#fdfdfc'],
  ['--foreground', '#282728'],
  ['--accent', '#3f6db5'],
  ['--muted', '#f1f2f4'],
  ['--border', '#e6e7eb'],
  ['--muted-strong', '#4e5766'],
  ['--surface', 'rgba(253, 253, 252, 0.9)'],
  ['--shadow-soft', '0 12px 36px rgba(0, 0, 0, 0.04)'],
];

const darkStart = css.indexOf("body[data-theme='dark']");
assert.ok(darkStart >= 0, 'Expected to find a dark theme block in the stylesheet.');
const darkSlice = css.slice(darkStart);
const openBrace = darkSlice.indexOf('{');
const closeBrace = darkSlice.indexOf('}', openBrace);
const darkBlock = darkSlice.slice(openBrace + 1, closeBrace);

const darkPalette = [
  ['--background', '#212737'],
  ['--foreground', '#eaedf3'],
  ['--accent', '#9bb7ff'],
  ['--muted', '#2b3245'],
  ['--border', '#3c4357'],
  ['--muted-strong', '#c5ccda'],
  ['--surface', 'rgba(33, 39, 55, 0.9)'],
  ['--shadow-soft', '0 16px 44px rgba(0, 0, 0, 0.35)'],
];

lightPalette.forEach(([token, value]) => {
  assert.ok(
    css.includes(`${token}: ${value};`),
    `Expected light palette to set ${token} to ${value}.`
  );
});

darkPalette.forEach(([token, value]) => {
  assert.ok(
    darkBlock.includes(`${token}: ${value};`),
    `Expected dark palette to set ${token} to ${value}.`
  );
});
