# YoRHa Archives

A single-page YoRHa-inspired archive rendered with plain HTML, CSS, and JavaScript. Capture bunker transmissions without build tooling or server-side dependencies.

## Features

- **NieR:Automata aesthetic** – sepia-toned panels, mechanical borders, and utilitarian typography evocative of the bunker briefing rooms.
- **Zero build step** – all posts live in `assets/js/posts.js`; no frameworks or bundlers are required.
- **Instant drafting console** – use the in-page form to preview entries and grab a ready-to-paste data packet.
- **Automatic sorting** – posts render newest-first based on the ISO date you provide.
- **Lightweight formatting** – add emphasis with `**double asterisks**` and inline code with backticks.

## Project structure

```
.
├── index.html          # main page
├── assets
│   ├── css
│   │   └── main.css    # YoRHa styling tokens and components
│   └── js
│       ├── app.js      # renders posts and powers the drafting console
│       └── posts.js    # populate this array with your live content
```

## Write a new post

1. Scroll to the **Log a new entry** section on `index.html`.
2. Fill out the drafting console. Title and date are required; excerpt and body are optional.
3. Press **Render preview**. The post will appear immediately in the archive and a JSON packet will display beneath the form.
4. Copy the packet into the `window.BLOG_POSTS` array inside `assets/js/posts.js`, keeping one object per post:

   ```js
   window.BLOG_POSTS = [
     {
       "title": "Unit 2B – Recon Debrief",
       "date": "2024-07-17",
       "excerpt": "Quick summary of the desert recon sweep.",
       "body": "Encountered minimal resistance.\n\nRecovered encrypted cache; forwarding to Operator 6O.",
     },
   ];
   ```

5. Commit the change (or save locally) and redeploy. Reloading the page will now include the transmission by default.

> **Tip:** Separate paragraphs in the body with a blank line. The renderer splits on double newlines and wraps each paragraph automatically.

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

- Adjust fonts, borders, and palette tokens inside `assets/css/main.css`.
- Tweak the glow fields by modifying the `.background-glow` gradients.
- Refine card animations or spacing in the `.post-card` rule set.

Glory to mankind.
