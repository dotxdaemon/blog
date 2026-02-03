// ABOUTME: Confirms the posts page exists and hosts the post list container.
// ABOUTME: Ensures the posts page loads the shared homepage rendering script.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'posts.html');
const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const html = fs.readFileSync(postsPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

assert.ok(
  /id="posts"/i.test(html),
  'Expected the posts page to include the post list container.'
);

assert.ok(
  /data-layout="posts"/i.test(html),
  'Expected the posts page to include a posts layout marker.'
);

assert.ok(
  /\.page\[data-layout='posts'\]/.test(css) || /\.page\[data-layout="posts"\]/.test(css),
  'Expected posts page layout styles to be defined.'
);

assert.ok(
  /\.page\[data-layout=['"]posts['"]\][\s\S]*?\.post-feature[\s\S]*?border-bottom/i.test(
    css
  ),
  'Expected post entries to render as list-like rows on the posts page.'
);
assert.ok(
  /\.page\[data-layout=['"]posts['"]\][\s\S]*?\.post-feature[\s\S]*?border-left/i.test(
    css
  ),
  'Expected post entries to include a left-side rule for the posts list.'
);
assert.ok(
  /\.page\[data-layout=['"]posts['"]\][\s\S]*?\.post-feature[\s\S]*?display:\s*grid/i.test(
    css
  ),
  'Expected posts entries to use a grid layout.'
);

assert.ok(
  /assets\/js\/posts\.js/i.test(html),
  'Expected the posts page to load the post data script.'
);

assert.ok(
  /assets\/js\/app\.js/i.test(html),
  'Expected the posts page to load the shared rendering script.'
);
