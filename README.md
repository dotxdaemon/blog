# Neon Constellation Blog

A single-page futuristic blog built with only HTML, CSS, and JavaScript. Write posts by editing one file, then deploy anywhere that hosts static sites.

## Features

- **Futuristic design** – neon gradients, glassmorphism cards, and smooth entry animations.
- **Zero build step** – all posts live in `assets/js/posts.js`; no frameworks or command-line tooling required.
- **Automatic sorting** – posts render with the newest entry first based on the ISO date you provide.
- **Lightweight formatting** – add bold text with `**double asterisks**` and inline code with backticks.

## Project structure

```
.
├── index.html          # main page
├── assets
│   ├── css
│   │   └── main.css    # futuristic styling
│   └── js
│       ├── app.js      # renders posts onto the page
│       └── posts.js    # the file you edit to add content
```

## Write a new post

1. Open `assets/js/posts.js` in any text editor.
2. Duplicate one of the sample post objects inside the `window.BLOG_POSTS` array.
3. Update the fields:
   - `title`: the headline shown on the card.
   - `date`: use `YYYY-MM-DD` so the posts stay in chronological order.
   - `excerpt`: a short teaser sentence.
   - `body`: write your full post. Separate paragraphs with a blank line. Use `**bold**` for emphasis and \`backticks\` for inline code.
4. Save the file and refresh `index.html` in your browser. The new post will fade into view automatically.

> **Tip:** If you prefer Markdown editors, you can still draft there. Paste the finished content into the `body` string when you are ready.

## Preview locally

Modern browsers block JavaScript from reading local files when a page is opened with a `file://` URL. Use a tiny local server instead:

```bash
# If you have Node.js installed
npx serve .
```

Then open the URL shown in the terminal (usually <http://localhost:3000>) to see the blog.

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
- Modify the animation timings in the `.post-card` styles.

Have fun filling the galaxy with your stories!
