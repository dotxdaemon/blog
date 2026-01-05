// ABOUTME: Ensures post detail rendering preserves mixed content with lists.
// ABOUTME: Verifies text before and after lists appears alongside list items.
const assert = require('assert');
const path = require('path');

const postDetail = require(path.join(__dirname, '..', 'assets', 'js', 'post-detail.js'));
const { renderFullContent } = postDetail;

const mixedBody = `Lead-in line
- first item
- second item
Closing remark`;

const html = renderFullContent(mixedBody);

assert.ok(
  html.includes('<p>Lead-in line</p>'),
  'Expected intro text to render before the list.'
);

assert.ok(
  html.includes('<li>first item</li>') && html.includes('<li>second item</li>'),
  'Expected list items to remain in a list.'
);

assert.ok(
  html.includes('Closing remark'),
  'Expected trailing text after the list to render.'
);
