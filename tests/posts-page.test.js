// ABOUTME: Confirms the posts page exists and hosts the post list container.
// ABOUTME: Ensures the posts page loads the shared homepage rendering script.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'posts.html');
const html = fs.readFileSync(postsPath, 'utf8');

assert.ok(
  /id="posts"/i.test(html),
  'Expected the posts page to include the post list container.'
);

assert.ok(
  /assets\/js\/posts\.js/i.test(html),
  'Expected the posts page to load the post data script.'
);

assert.ok(
  /assets\/js\/app\.js/i.test(html),
  'Expected the posts page to load the shared rendering script.'
);
