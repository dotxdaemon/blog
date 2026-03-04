// ABOUTME: Verifies the games page uses the shared artwork grid and game dataset source.
// ABOUTME: Ensures requested game titles and cover URLs are wired from static data.
const assert = require('assert');
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('games.html');
const appScript = readRepoFile('assets/js/app.js');
const gameDataScript = readRepoFile('assets/js/games-i-like.js');
const css = readStyles();

assertMatches(
  html,
  /<ul[^>]*id="album-list"[^>]*>/i,
  'Expected games.html to include the artwork grid list target.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-source="GAMES_I_LIKE"/i,
  'Expected games grid to load from the GAMES_I_LIKE source.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-overlay="title"/i,
  'Expected games grid to use title-only overlay labels.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-fit="contain"/i,
  'Expected games grid to use contain fit so covers are not cropped.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/games-i-like\.js"[^>]*><\/script>/i,
  'Expected games page to load the games data script.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/app\.js"[^>]*type="module"[^>]*><\/script>/i,
  'Expected games page to load app.js as a module.'
);
assertMatches(
  appScript,
  /albumList\.dataset\.source/i,
  'Expected app.js to support selecting the artwork source key from dataset attributes.'
);
assertMatches(
  gameDataScript,
  /window\.GAMES_I_LIKE\s*=\s*\[\s*\{\s*title:\s*'Legend of Zelda - Twilight Princess'/,
  'Expected the first game entry to be Legend of Zelda - Twilight Princess.'
);

const requiredTitles = [
  'Legend of Zelda - Twilight Princess',
  'Persona 5 Royal',
  'No More Heroes 2',
  'Legend of Zelda - Skyward Sword',
  'Resident Evil 4 Wii',
  'Jak and Daxter 1',
  'Jak and Daxter 2',
  'Jak and Daxter 3',
  'Super Smash Bros Ultimate',
  'Super Smash Bros Melee',
];

requiredTitles.forEach((title) => {
  assert.ok(
    gameDataScript.includes(`title: '${title}'`),
    `Expected games data to include "${title}".`
  );
});

assertMatches(
  gameDataScript,
  /artwork:\s*'https:\/\/images\.igdb\.com\/igdb\/image\/upload\/t_original\/co3mtv\.jpg'/,
  'Expected Twilight Princess to use the configured high-resolution cover artwork URL.'
);

const highResArtworkMatches = gameDataScript.match(
  /artwork:\s*'https:\/\/images\.igdb\.com\/igdb\/image\/upload\/t_original\/co[a-z0-9]+\.(jpg|png)'/g
) || [];
assert.strictEqual(
  highResArtworkMatches.length,
  10,
  'Expected all game entries to use IGDB t_original high-resolution artwork URLs.'
);

assertNotMatches(
  gameDataScript,
  /upload\.wikimedia\.org|m\.media-amazon\.com/i,
  'Did not expect games data to keep low-resolution cover sources.'
);

assertMatches(
  css,
  /\.games-page\s+\.album-item\s*\{[\s\S]*aspect-ratio:\s*2\s*\/\s*3/i,
  'Expected games page cards to use a standardized cover aspect ratio.'
);

const titleMatches = gameDataScript.match(/title:\s*'/g) || [];
assert.strictEqual(titleMatches.length, 10, 'Expected exactly 10 game entries in the dataset.');
