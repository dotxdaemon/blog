// ABOUTME: Verifies the movies page uses the shared artwork grid and movie dataset source.
// ABOUTME: Ensures the first movie entry and poster metadata are wired from static data.
const assert = require('assert');
const { assertMatches, assertNotMatches, readRepoFile, readStyles } = require('./helpers');

const html = readRepoFile('movies.html');
const artworkGridScript = readRepoFile('assets/js/artwork-grid.js');
const movieDataScript = readRepoFile('assets/js/movies-i-like.js');
const css = readStyles();

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
  html,
  /<script[^>]*src="assets\/js\/artwork-grid\.js"[^>]*type="module"[^>]*><\/script>/i,
  'Expected movies page to load artwork-grid.js as a module.'
);
assertMatches(
  artworkGridScript,
  /albumList\.dataset\.source/i,
  'Expected artwork-grid.js to read a configurable source key from album list dataset attributes.'
);
assertMatches(
  artworkGridScript,
  /albumList\.dataset\.overlay/i,
  'Expected artwork-grid.js to read configurable overlay mode from album list dataset attributes.'
);
assertMatches(
  artworkGridScript,
  /albumList\.dataset\.fit/i,
  'Expected artwork-grid.js to read configurable artwork fit mode from album list dataset attributes.'
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
  'Expected the first movie entry to use the official TMDB poster URL.'
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
  /title:\s*'Gone Girl'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/ts996lKsxvjkO2yiYG0ht4qAicO\.jpg'/,
  'Expected Gone Girl to use the correct TMDB poster URL.'
);
assertNotMatches(
  movieDataScript,
  /title:\s*'Gone Girl'[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/lv5xShBIDPe7m4ufdlV0IAc7Avk\.jpg'/,
  'Expected Gone Girl to avoid the non-primary TMDB poster URL.'
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
assertMatches(
  movieDataScript,
  /title:\s*'The Devil Wears Prada'[\s\S]*director:\s*'David Frankel'[\s\S]*year:\s*2006[\s\S]*artwork:\s*'https:\/\/image\.tmdb\.org\/t\/p\/original\/8912AsVuS7Sj915apArUFbv6F9L\.jpg'/,
  'Expected movie data to include The Devil Wears Prada with the verified TMDB poster URL.'
);
assertNotMatches(
  movieDataScript,
  /title:\s*'Cloud Atlas'/,
  'Expected Cloud Atlas to be excluded from movie data.'
);
const escapeForRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const jsStringPattern = (value) => {
  const escapedValue = escapeForRegExp(value).replace(/'/g, "\\\\?'").replace(/"/g, '\\\\?"');
  return `(?:'${escapedValue}'|"${escapedValue}")`;
};
const posterMappings = [
  {
    title: 'The Girl with the Dragon Tattoo',
    director: 'David Fincher',
    year: 2011,
    artwork: 'https://image.tmdb.org/t/p/original/8bokS83zGdhaXgN9tjidUKmAftW.jpg',
  },
  {
    title: 'The Social Network',
    director: 'David Fincher',
    year: 2010,
    artwork: 'https://image.tmdb.org/t/p/original/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
  },
  {
    title: 'Watchmen',
    director: 'Zack Snyder',
    year: 2009,
    artwork: 'https://image.tmdb.org/t/p/original/aVURelN3pM56lFM7Dgfs5TixcIf.jpg',
  },
  {
    title: 'The Matrix',
    director: 'The Wachowskis',
    year: 1999,
    artwork: 'https://image.tmdb.org/t/p/original/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg',
  },
  {
    title: 'Gone Girl',
    director: 'David Fincher',
    year: 2014,
    artwork: 'https://image.tmdb.org/t/p/original/ts996lKsxvjkO2yiYG0ht4qAicO.jpg',
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
    artwork: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    title: 'La La Land',
    director: 'Damien Chazelle',
    year: 2016,
    artwork: 'https://image.tmdb.org/t/p/original/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
  },
  {
    title: 'Kill Bill: Vol. 1',
    director: 'Quentin Tarantino',
    year: 2003,
    artwork: 'https://image.tmdb.org/t/p/original/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg',
  },
  {
    title: '(500) Days of Summer',
    director: 'Marc Webb',
    year: 2009,
    artwork: 'https://image.tmdb.org/t/p/original/qXAuQ9hF30sQRsXf40OfRVl0MJZ.jpg',
  },
  {
    title: 'Crazy, Stupid, Love.',
    director: 'Glenn Ficarra & John Requa',
    year: 2011,
    artwork: 'https://image.tmdb.org/t/p/original/p4RafgAPk558muOjnBMHhMArjS2.jpg',
  },
  {
    title: 'Whiplash',
    director: 'Damien Chazelle',
    year: 2014,
    artwork: 'https://image.tmdb.org/t/p/original/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
  },
  {
    title: 'Fight Club',
    director: 'David Fincher',
    year: 1999,
    artwork: 'https://image.tmdb.org/t/p/original/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg',
  },
  {
    title: 'Spirited Away',
    director: 'Hayao Miyazaki',
    year: 2001,
    artwork: 'https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  },
  {
    title: 'Eyes Wide Shut',
    director: 'Stanley Kubrick',
    year: 1999,
    artwork: 'https://image.tmdb.org/t/p/original/knEIz1eNGl5MQDbrEAVWA7iRqF9.jpg',
  },
  {
    title: 'Tenet',
    director: 'Christopher Nolan',
    year: 2020,
    artwork: 'https://image.tmdb.org/t/p/original/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg',
  },
  {
    title: 'Inglourious Basterds',
    director: 'Quentin Tarantino',
    year: 2009,
    artwork: 'https://image.tmdb.org/t/p/original/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg',
  },
  {
    title: 'Sin City',
    director: 'Robert Rodriguez & Frank Miller',
    year: 2005,
    artwork: 'https://image.tmdb.org/t/p/original/i66G50wATMmPrvpP95f0XP6ZdVS.jpg',
  },
  {
    title: 'The Handmaiden',
    director: 'Park Chan-wook',
    year: 2016,
    artwork: 'https://image.tmdb.org/t/p/original/dLlH4aNHdnmf62umnInL8xPlPzw.jpg',
  },
  {
    title: 'Oldboy',
    director: 'Park Chan-wook',
    year: 2003,
    artwork: 'https://image.tmdb.org/t/p/original/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg',
  },
  {
    title: 'Midnight in Paris',
    director: 'Woody Allen',
    year: 2011,
    artwork: 'https://image.tmdb.org/t/p/original/4wBG5kbfagTQclETblPRRGihk0I.jpg',
  },
  {
    title: 'Blue Jasmine',
    director: 'Woody Allen',
    year: 2013,
    artwork: 'https://image.tmdb.org/t/p/original/nsj0RLRI10351uYMoAKPur6Derd.jpg',
  },
  {
    title: 'School of Rock',
    director: 'Richard Linklater',
    year: 2003,
    artwork: 'https://image.tmdb.org/t/p/original/zXLXaepIBvFVLU25DH3wv4IPSbe.jpg',
  },
  {
    title: 'Mad Max: Fury Road',
    director: 'George Miller',
    year: 2015,
    artwork: 'https://image.tmdb.org/t/p/original/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
  },
  {
    title: 'The Killer',
    director: 'David Fincher',
    year: 2023,
    artwork: 'https://image.tmdb.org/t/p/original/ipkcgvN7h3yZnbYowthloHLKsf4.jpg',
  },
  {
    title: 'Uncut Gems',
    director: 'Benny Safdie & Josh Safdie',
    year: 2019,
    artwork: 'https://image.tmdb.org/t/p/original/6XN1vxHc7kUSqNWtaQKN45J5x2v.jpg',
  },
  {
    title: 'TAR',
    director: 'Todd Field',
    year: 2022,
    artwork: 'https://image.tmdb.org/t/p/original/dRVAlaU0vbG6hMf2K45NSiIyoUe.jpg',
  },
  {
    title: 'Kill Bill: Vol. 2',
    director: 'Quentin Tarantino',
    year: 2004,
    artwork: 'https://image.tmdb.org/t/p/original/2yhg0mZQMhDyvUQ4rG1IZ4oIA8L.jpg',
  },
  {
    title: 'The Devil Wears Prada',
    director: 'David Frankel',
    year: 2006,
    artwork: 'https://image.tmdb.org/t/p/original/8912AsVuS7Sj915apArUFbv6F9L.jpg',
  },
  {
    title: "Molly's Game",
    director: 'Aaron Sorkin',
    year: 2017,
    artwork: 'https://image.tmdb.org/t/p/original/h9hUP5ZJGsjL2wbERrGlj4dMjZq.jpg',
  },
  {
    title: 'Melancholia',
    director: 'Lars von Trier',
    year: 2011,
    artwork: 'https://image.tmdb.org/t/p/original/fMneszMiQuTKY8JUXrGGB5vwqJf.jpg',
  },
  {
    title: 'Carol',
    director: 'Todd Haynes',
    year: 2015,
    artwork: 'https://image.tmdb.org/t/p/original/cJeled7EyPdur6TnCA5GYg0UVna.jpg',
  },
  {
    title: 'Ex Machina',
    director: 'Alex Garland',
    year: 2015,
    artwork: 'https://image.tmdb.org/t/p/original/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg',
  },
  {
    title: 'Hellboy',
    director: 'Guillermo del Toro',
    year: 2004,
    artwork: 'https://image.tmdb.org/t/p/original/lbaTEneOofwvAyg77R8HbFML2zT.jpg',
  },
];
posterMappings.forEach(({ title, director, year, artwork }) => {
  assertMatches(
    movieDataScript,
    new RegExp(
      `title:\\s*${jsStringPattern(title)}[\\s\\S]*director:\\s*${jsStringPattern(director)}[\\s\\S]*year:\\s*${year}[\\s\\S]*artwork:\\s*${jsStringPattern(artwork)}`
    ),
    `Expected ${title} to use the verified TMDB poster URL.`
  );
});
const laLaLandMatches = movieDataScript.match(/title:\s*'La La Land'/g) || [];
assert.strictEqual(
  laLaLandMatches.length,
  1,
  'Expected duplicate La La Land entries to be excluded from movie data.'
);
assertMatches(
  css,
  /\.movies-page\s+\.album-item\s*\{[\s\S]*aspect-ratio:\s*2\s*\/\s*3/i,
  'Expected movies page cards to use a standardized poster aspect ratio.'
);
assertMatches(
  css,
  /\.movies-page\s+\.album-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected movies page posters to use a wider desktop grid so poster typography stays legible.'
);
assertMatches(
  css,
  /@media\s*\(max-width:\s*420px\)[\s\S]*\.movies-page\s+\.album-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/i,
  'Expected narrow movie pages to preserve two poster columns.'
);
assertNotMatches(
  html,
  /<style>[\s\S]*\.movies-page\s+\.album-item[\s\S]*<\/style>/i,
  'Did not expect movies page to keep an inline poster style block.'
);
