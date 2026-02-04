// ABOUTME: Verifies the blog posts data includes the expected entries.
// ABOUTME: Ensures the restored posts list is populated.
const assert = require('assert');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'assets', 'js', 'posts.js');

global.window = {};

delete require.cache[postsPath];
require(postsPath);

const posts = Array.isArray(global.window.BLOG_POSTS) ? global.window.BLOG_POSTS : [];

assert.ok(Array.isArray(posts), 'Expected BLOG_POSTS to be an array.');

['hi everybody', 'movies I want to watch', 'cooking recipes'].forEach((title) => {
  assert.ok(
    posts.some((post) => post && post.title === title),
    `Expected a post titled "${title}".`
  );
});
