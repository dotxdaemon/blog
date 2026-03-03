// ABOUTME: Verifies the movies page uses the shared artwork grid and movie dataset source.
// ABOUTME: Ensures the first movie entry and poster metadata are wired from static data.
const assert = require('assert');
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
  /id="album-list"[^>]*data-fit="cover"/i,
  'Expected movies grid to request cover-fit artwork for consistent poster framing.'
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
  movieDataScript,
  /title:\s*'Gone Girl'[\s\S]*director:\s*'David Fincher'/,
  'Expected movie data to include Gone Girl by David Fincher.'
);
assertMatches(
  movieDataScript,
  /title:\s*'The Dark Knight'[\s\S]*director:\s*'Christopher Nolan'/,
  'Expected movie data to include The Dark Knight by Christopher Nolan.'
);
assertMatches(
  movieDataScript,
  /title:\s*'La La Land'[\s\S]*director:\s*'Damien Chazelle'/,
  'Expected movie data to include La La Land by Damien Chazelle.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Kill Bill:\s*Vol\.\s*1'/,
  'Expected movie data to include Kill Bill: Vol. 1.'
);
assertMatches(
  movieDataScript,
  /title:\s*'\(500\)\s*Days of Summer'/,
  'Expected movie data to include (500) Days of Summer.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Crazy,\s*Stupid,\s*Love\.'/,
  'Expected movie data to include Crazy, Stupid, Love.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Whiplash'/,
  'Expected movie data to include Whiplash.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Fight Club'/,
  'Expected movie data to include Fight Club.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Spirited Away'/,
  'Expected movie data to include Spirited Away.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Eyes Wide Shut'/,
  'Expected movie data to include Eyes Wide Shut.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Tenet'/,
  'Expected movie data to include Tenet.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Inglourious Basterds'[\s\S]*director:\s*'Quentin Tarantino'/,
  'Expected movie data to include Inglourious Basterds by Quentin Tarantino.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Sin City'[\s\S]*director:\s*'Robert Rodriguez & Frank Miller'/,
  'Expected movie data to include Sin City by Robert Rodriguez and Frank Miller.'
);
assertMatches(
  movieDataScript,
  /title:\s*'The Handmaiden'[\s\S]*director:\s*'Park Chan-wook'/,
  'Expected movie data to include The Handmaiden by Park Chan-wook.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Oldboy'[\s\S]*director:\s*'Park Chan-wook'/,
  'Expected movie data to include Oldboy by Park Chan-wook.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Midnight in Paris'[\s\S]*director:\s*'Woody Allen'/,
  'Expected movie data to include Midnight in Paris by Woody Allen.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Blue Jasmine'[\s\S]*director:\s*'Woody Allen'/,
  'Expected movie data to include Blue Jasmine by Woody Allen.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Blue Jasmine'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/nsj0RLRI10351uYMoAKPur6Derd\.jpg'/,
  'Expected Blue Jasmine to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'School of Rock'[\s\S]*director:\s*'Richard Linklater'/,
  'Expected movie data to include School of Rock by Richard Linklater.'
);
assertMatches(
  movieDataScript,
  /title:\s*'School of Rock'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/zXLXaepIBvFVLU25DH3wv4IPSbe\.jpg'/,
  'Expected School of Rock to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Mad Max:\s*Fury Road'[\s\S]*director:\s*'George Miller'/,
  'Expected movie data to include Mad Max: Fury Road by George Miller.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Mad Max:\s*Fury Road'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/hA2ple9q4qnwxp3hKVNhroipsir\.jpg'/,
  'Expected Mad Max: Fury Road to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'The Killer'[\s\S]*director:\s*'David Fincher'/,
  'Expected movie data to include The Killer by David Fincher.'
);
assertMatches(
  movieDataScript,
  /title:\s*'The Killer'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/ipkcgvN7h3yZnbYowthloHLKsf4\.jpg'/,
  'Expected The Killer to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Uncut Gems'[\s\S]*director:\s*'Benny Safdie & Josh Safdie'/,
  'Expected movie data to include Uncut Gems with director metadata.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Uncut Gems'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/6XN1vxHc7kUSqNWtaQKN45J5x2v\.jpg'/,
  'Expected Uncut Gems to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'TAR'[\s\S]*director:\s*'Todd Field'/,
  'Expected movie data to include TAR by Todd Field.'
);
assertMatches(
  movieDataScript,
  /title:\s*'TAR'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/dRVAlaU0vbG6hMf2K45NSiIyoUe\.jpg'/,
  'Expected TAR to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Kill Bill:\s*Vol\.\s*2'[\s\S]*director:\s*'Quentin Tarantino'/,
  'Expected movie data to include Kill Bill: Vol. 2 by Quentin Tarantino.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Kill Bill:\s*Vol\.\s*2'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/2yhg0mZQMhDyvUQ4rG1IZ4oIA8L\.jpg'/,
  'Expected Kill Bill: Vol. 2 to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Melancholia'[\s\S]*director:\s*'Lars von Trier'/,
  'Expected movie data to include Melancholia by Lars von Trier.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Melancholia'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/fMneszMiQuTKY8JUXrGGB5vwqJf\.jpg'/,
  'Expected Melancholia to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Carol'[\s\S]*director:\s*'Todd Haynes'/,
  'Expected movie data to include Carol by Todd Haynes.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Carol'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/cJeled7EyPdur6TnCA5GYg0UVna\.jpg'/,
  'Expected Carol to use the correct TMDB poster URL.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Ex Machina'[\s\S]*director:\s*'Alex Garland'/,
  'Expected movie data to include Ex Machina by Alex Garland.'
);
assertMatches(
  movieDataScript,
  /title:\s*'Ex Machina'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/dmJW8IAKHKxFNiUnoDR7JfsK7Rp\.jpg'/,
  'Expected Ex Machina to use the correct TMDB poster URL.'
);
const laLaLandMatches = movieDataScript.match(/title:\s*'La La Land'/g) || [];
assert.strictEqual(
  laLaLandMatches.length,
  1,
  'Expected duplicate La La Land entries to be excluded from movie data.'
);
assertMatches(
  html,
  /\.movies-page\s+\.album-item\s*\{[\s\S]*aspect-ratio:\s*2\s*\/\s*3/i,
  'Expected movies page cards to use a standardized poster aspect ratio.'
);
