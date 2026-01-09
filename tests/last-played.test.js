// ABOUTME: Verifies the homepage exposes a last-played music slot for integrations.
// ABOUTME: Ensures the markup for the Apple Music status card exists.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

assert.ok(
  /id="last-played"/i.test(html),
  'Expected a last-played section on the homepage.'
);

assert.ok(
  /data-last-played/i.test(html),
  'Expected the last-played section to include data-last-played attributes.'
);

assert.ok(
  /Last played/i.test(html),
  'Expected the last-played section to label the music status.'
);
