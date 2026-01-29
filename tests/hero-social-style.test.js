// ABOUTME: Ensures the homepage hero aligns the social links with the title baseline.
// ABOUTME: Confirms the landing hero alignment behavior at larger breakpoints.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const landingHeroAlignmentPattern =
  /\.landing-grid\s+\.hero\s*{[^}]*align-items:\s*baseline/i;

let cursor = 0;
let foundAlignment = false;

while (cursor < css.length) {
  const mediaQueryStart = css.indexOf('@media (min-width: 640px)', cursor);
  if (mediaQueryStart === -1) {
    break;
  }

  const mediaBlockStart = css.indexOf('{', mediaQueryStart);
  if (mediaBlockStart === -1) {
    break;
  }

  let braceDepth = 0;
  let mediaBlockEnd = -1;
  for (let index = mediaBlockStart; index < css.length; index += 1) {
    const char = css[index];
    if (char === '{') {
      braceDepth += 1;
    }
    if (char === '}') {
      braceDepth -= 1;
      if (braceDepth === 0) {
        mediaBlockEnd = index;
        break;
      }
    }
  }

  if (mediaBlockEnd === -1) {
    break;
  }

  const mediaBlock = css.slice(mediaBlockStart, mediaBlockEnd + 1);
  if (landingHeroAlignmentPattern.test(mediaBlock)) {
    foundAlignment = true;
    break;
  }

  cursor = mediaBlockEnd + 1;
}

assert.ok(
  foundAlignment,
  'Expected the landing hero to align items on the text baseline at larger widths.'
);
