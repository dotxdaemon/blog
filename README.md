# YoRHa Archives

A single-page YoRHa field archive built with only HTML, CSS, and JavaScript. Sepia-toned gradients, mechanical grids, and utilitarian typography keep each log aligned with Bunker aesthetics. Log transmissions by editing one file, then deploy anywhere that serves static sites.

## Features

- **YoRHa aesthetic** – desaturated sepia gradients, mechanical borders, and utilitarian typography inspired by Bunker terminals.
- **Zero build step** – all posts live in `assets/js/posts.js`; no frameworks or command-line tooling required.
- **Automatic sorting** – posts render with the newest entry first based on the ISO date you provide.
- **Lightweight formatting** – add bold text with `**double asterisks**` and inline code with backticks.

## Project structure

```
.
├── index.html          # main page
├── assets
│   ├── css
│   │   └── main.css    # sepia YoRHa styling and layout
│   └── js
│       ├── app.js      # renders posts onto the page
│       └── posts.js    # the file you edit to add content
```

## Write a new post

1. Open `assets/js/posts.js` in any text editor.
2. Find the `window.BLOG_POSTS = [ ... ];` declaration.
3. Add a fresh object to the array with your mission data:
   - `title`: the headline shown on the card.
   - `date`: use `YYYY-MM-DD` so the archive keeps entries in chronological order.
   - `excerpt`: a brief teaser for list views.
   - `body`: your full transmission. Separate paragraphs with a blank line. Use `**bold**` for emphasis and \`backticks\` for inline code when needed.
4. Save the file and refresh `index.html` in your browser. The new post will render immediately.

If you're starting from an empty array, this template object can be copied as-is and customized:

```js
{
  title: 'Unit 2B Recon Log',
  date: '11945-07-03',
  excerpt: 'Summary of reconnaissance activity near the collapsed highway.',
  body: `Primary objective completed without resistance interference.

Secondary scans detected dormant machine signatures beneath the concrete lattice.

Recommend a follow-up sweep with scanner models.`,
}
```

> **Tip:** Draft anywhere you like. When you're finished, paste the final copy into the `body` string to keep formatting consistent.

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

- Tweak the sepia palette and brass accents via the CSS variables at the top of `assets/css/main.css`.
- Adjust the mechanical grid, borders, and ambient haze by editing `.background-grid`, `.background-glow`, and the card frame styles.
- Modify the staggered entry animations in the `.post-card` rules to match your preferred cadence.

Glory to mankind, and happy logging.
