# CodeSnap ⚡

**HTML → Image, PDF & Carousels.** Zero backend, zero cost.

A single-file web app that converts HTML/CSS into high-quality social media images and PDFs using the [Browserless.io](https://www.browserless.io) REST API directly from the browser.

## Features

- 📸 **Instant PNG** — Render HTML at Standard, High, or Ultra quality
- 📄 **PDF Export** — Multi-slide carousels stitched into LinkedIn-ready PDFs
- 📋 **6 Templates** — Quote cards, data slides, listicle carousels, and more
- 🎛️ **Slide Navigator** — Preview and navigate multi-slide content
- ℹ️ **Reference Guide** — Full output dimension map for every preset × quality combo
- 🔒 **Privacy First** — API token stored in your browser only

## Architecture

```
Browser (index.html)
    ↓  REST API call
Browserless.io (cloud Chromium)
    ↓  PNG response
Browser (download / PDF stitch)
```

No backend. No serverless functions. No compute credits. Just static HTML on GitHub Pages.

## Setup

1. **Get a free Browserless token** at [browserless.io](https://www.browserless.io) (1,000 renders/month free)
2. Open the app → click **⚙️ Settings** → paste your token → Save
3. Start creating!

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/codesnap.git
git push -u origin main
```

Then go to **Settings → Pages → Source: Deploy from branch → main → / (root) → Save**.

Your app will be live at `https://YOUR_USERNAME.github.io/codesnap/`

## Presets

| Preset | Dimensions | Best For |
| :--- | :--- | :--- |
| Instagram Square | 1080×1080 | IG feed posts |
| LinkedIn Carousel | 1080×1350 | LinkedIn doc posts |
| LinkedIn Post | 1200×627 | LinkedIn image posts |
| Story / Reel | 1080×1920 | IG/FB/WA stories |

## License

MIT
