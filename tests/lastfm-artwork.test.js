// ABOUTME: Ensures the listening section renders album entries from script data.
// ABOUTME: Confirms the page script builds album title and artist lines.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(script, /className\s*=\s*['"]album-item['"]/i, 'Expected listening entries to use the album-item class.');
assertMatches(script, /className\s*=\s*['"]album-title['"]/i, 'Expected listening entries to include an album title line.');
assertMatches(script, /className\s*=\s*['"]album-artist['"]/i, 'Expected listening entries to include an album artist line.');
assertNotMatches(script, /track-image/i, 'Did not expect track artwork rendering classes in the script.');
