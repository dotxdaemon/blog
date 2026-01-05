// ABOUTME: Verifies required blog posts are present in the data set.
// ABOUTME: Confirms the cooking recipes entry includes essential details.
const assert = require('assert');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'assets', 'js', 'posts.js');

global.window = {};

delete require.cache[postsPath];
require(postsPath);

const posts = Array.isArray(global.window.BLOG_POSTS) ? global.window.BLOG_POSTS : [];

assert.ok(Array.isArray(posts), 'Expected BLOG_POSTS to be an array.');

const cookingPost = posts.find(
  (post) => post && typeof post.title === 'string' && post.title === 'cooking recipes'
);

assert.ok(cookingPost, 'Expected a post titled "cooking recipes".');
assert.strictEqual(
  cookingPost.date,
  '2025-10-03',
  'Expected "cooking recipes" post to have date 2025-10-03.'
);
assert.ok(
  typeof cookingPost.body === 'string' && cookingPost.body.toLowerCase().includes('pantry'),
  'Expected "cooking recipes" post to describe pantry-friendly dishes.'
);
assert.ok(
  cookingPost.ambient && typeof cookingPost.ambient.hue === 'number',
  'Expected "cooking recipes" post to include ambient styling.'
);

const moviesPost = posts.find(
  (post) => post && typeof post.title === 'string' && post.title === 'movies I want to watch'
);

assert.ok(moviesPost, 'Expected a post titled "movies I want to watch".');
assert.strictEqual(
  moviesPost.date,
  '2025-09-26',
  'Expected "movies I want to watch" post to have date 2025-09-26.'
);
assert.ok(
  moviesPost.excerpt &&
    typeof moviesPost.excerpt === 'string' &&
    moviesPost.excerpt.toLowerCase().includes('movies'),
  'Expected "movies I want to watch" post to include an excerpt about the movies list.'
);
assert.ok(
  moviesPost.body &&
    typeof moviesPost.body === 'string' &&
    moviesPost.body.includes('Hamnet'),
  'Expected "movies I want to watch" post to include the film list.'
);
assert.ok(
  !posts.some(
    (post) => post && typeof post.title === 'string' && post.title === 'Field Log: Desert Recon Unit'
  ),
  'Did not expect a Field Log post to remain.'
);
