// ABOUTME: Verifies Vercel serves the same static site folder as GitHub Pages.
// ABOUTME: Keeps root project deployments from resolving stale root files before routing rules.
const assert = require('assert');
const { readRepoFile } = require('./helpers');

const vercelConfig = JSON.parse(readRepoFile('vercel.json'));

assert.strictEqual(
  vercelConfig.outputDirectory,
  'blog-main',
  'Expected Vercel to serve blog-main as the static output directory.'
);

assert.deepStrictEqual(
  vercelConfig.rewrites || [],
  [],
  'Did not expect Vercel to rely on root-to-blog-main rewrites.'
);
