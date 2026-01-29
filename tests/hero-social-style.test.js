// ABOUTME: Ensures the homepage hero aligns the social links with the title baseline.
// ABOUTME: Confirms the landing hero alignment behavior at larger breakpoints.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  /\.landing-grid\s+\.hero[\s\S]*align-items:\s*flex-start/i.test(css),
  'Expected the landing hero to align items to the start edge.'
);
assert.ok(
  /\.hero__social[\s\S]*gap:\s*0\.75rem/i.test(css),
  'Expected the hero social links to keep consistent spacing.'
);
