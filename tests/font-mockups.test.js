// ABOUTME: Verifies the font mockup page includes clear samples for each candidate.
// ABOUTME: Ensures the mockup sections are labeled for reliable screenshots.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const mockupPath = path.join(__dirname, '..', 'docs', 'font-mockups.html');
const html = fs.readFileSync(mockupPath, 'utf8');

['Inter', 'Source Serif 4', 'Space Grotesk', 'IBM Plex Sans', 'Merriweather'].forEach((fontName) => {
  const pattern = new RegExp(`<section[^>]*data-font=\"${fontName}\"`, 'i');
  assert.ok(
    pattern.test(html),
    `Expected a mockup section to declare data-font="${fontName}".`
  );
});

assert.ok(
  /class=\"font-sample\"/i.test(html),
  'Expected the mockups to include a font-sample block for readability.'
);
