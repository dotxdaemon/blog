// ABOUTME: Verifies the movies page uses the shared artwork grid and movie dataset source.
// ABOUTME: Ensures the first movie entry and poster metadata are wired from static data.
const { assertMatches, readRepoFile } = require('./helpers');

const html = readRepoFile('movies.html');
const appScript = readRepoFile('assets/js/app.js');
const movieDataScript = readRepoFile('assets/js/movies-i-like.js');

assertMatches(
  html,
  /<ul[^>]*id="album-list"[^>]*>/i,
  'Expected movies.html to include the artwork grid list target.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-source="MOVIES_I_LIKE"/i,
  'Expected movies grid to load from the MOVIES_I_LIKE source.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-overlay="title"/i,
  'Expected movies grid to use title-only overlay labels.'
);
assertMatches(
  html,
  /id="album-list"[^>]*data-fit="contain"/i,
  'Expected movies grid to request contain-fit artwork so tall posters are not cropped.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/movies-i-like\.js"[^>]*><\/script>/i,
  'Expected movies page to load the movies data script.'
);
assertMatches(
  html,
  /<script[^>]*src="assets\/js\/app\.js"[^>]*type="module"[^>]*><\/script>/i,
  'Expected movies page to load app.js as a module.'
);
assertMatches(
  appScript,
  /albumList\.dataset\.source/i,
  'Expected app.js to read a configurable source key from album list dataset attributes.'
);
assertMatches(
  appScript,
  /albumList\.dataset\.overlay/i,
  'Expected app.js to read configurable overlay mode from album list dataset attributes.'
);
assertMatches(
  appScript,
  /albumList\.dataset\.fit/i,
  'Expected app.js to read configurable artwork fit mode from album list dataset attributes.'
);
assertMatches(
  movieDataScript,
  /window\.MOVIES_I_LIKE\s*=\s*\[\s*\{\s*title:\s*'The Girl with the Dragon Tattoo'/,
  'Expected the first movie entry to be The Girl with the Dragon Tattoo.'
);
assertMatches(
  movieDataScript,
  /director:\s*'David Fincher'/,
  'Expected the first movie entry to list David Fincher as director.'
);
assertMatches(
  movieDataScript,
  /artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/8bokS83zGdhaXgN9tjidUKmAftW\.jpg'/,
  'Expected the first movie entry to use the higher-resolution poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'The Social Network'[\s\S]*director:\s*'David Fincher'/,
  'Expected movie data to include The Social Network by David Fincher.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Watchmen'[\s\S]*director:\s*'Zack Snyder'/,
  'Expected movie data to include Watchmen by Zack Snyder.'
);
assertMatches(
  movieDataScript,
  /title:\s*'The Matrix'[\s\S]*director:\s*'The Wachowskis'/,
  'Expected movie data to include The Matrix with director metadata.'
);
assertMatches(
  html,
  /\.movies-page\s+\.album-item\s*\{[\s\S]*aspect-ratio:\s*2\s*\/\s*3/i,
  'Expected movies page cards to use a standardized poster aspect ratio.'
);
