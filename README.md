# Neon Constellation Blog

A single-page futuristic blog built entirely with HTML and CSS. Every post lives right inside `index.html`, so updating your writing feels as simple as editing a document.

## Features

- **Futuristic design** – neon gradients, glassmorphism cards, and smooth hover effects.
- **No JavaScript editing** – type your stories directly into HTML `<article>` blocks.
- **Instant results** – save and refresh to see your new post, no build step required.

## Project structure

```
.
├── index.html          # main page and your posts
└── assets
    └── css
        └── main.css    # futuristic styling
```

## Write a new post

1. Open `index.html` in any text editor.
2. Find the `<section class="post-list">` element and duplicate one of the `<article class="post-card">` blocks inside it.
3. Paste the copy where you want the new story to appear (keep the newest entries nearest the top).
4. Update the contents:
   - The `<h2>` headline.
   - The `<time>` element text and its `datetime="YYYY-MM-DD"` attribute.
   - The teaser paragraph with class `excerpt`.
   - The paragraphs inside `<div class="body">`. Add more `<p>` elements if you need them.
5. Save the file and refresh your browser to view the post immediately.

> **Tip:** Draft in any editor you like—when you're ready, paste your words directly between the `<p>` tags.

## Preview locally

Because everything is static HTML and CSS, you can simply double-click `index.html` to open it in your browser. For a more realistic preview (with the same URL you will deploy), you can also run any simple static server, but it is optional.

## Host it for free

Because the blog is just static files, you can deploy it almost anywhere. Three easy options:

### 1. GitHub Pages

1. Push this repository to GitHub.
2. In the GitHub UI, go to **Settings → Pages**.
3. Choose the `main` (or whichever) branch, set the root folder, and save.
4. GitHub will provide a public URL after the first build (usually within a minute).

### 2. Netlify Drop

1. Zip the project folder or drag it directly into <https://app.netlify.com/drop>.
2. Netlify uploads the files and instantly returns a live URL.
3. Whenever you update posts, drag the folder again to redeploy.

### 3. Vercel

1. Install the [Vercel CLI](https://vercel.com/docs/cli) or connect the GitHub repo inside the Vercel dashboard.
2. Choose “Other” when asked for the project framework.
3. Deploy – Vercel detects it’s a static site and serves it globally with a CDN.

## Customize the look

- Change fonts or colors inside `assets/css/main.css`.
- Adjust the glow effects by tweaking the `.background-glow` gradients.
- Customize hover behavior in the `.post-card` styles.

Have fun filling the galaxy with your stories!
