# Deployment

The site is a static build (Vite + React) published to GitHub Pages at https://itbeard.com.

## How it runs

Every push to `main` (or a manual run from the Actions tab) starts
[`.github/workflows/deploy.yml`](workflows/deploy.yml):

1. `npm ci` on Node 22
2. `npm test` — the deploy stops if a test fails
3. `npm run build` — output in `dist/`
4. `.nojekyll`, `CNAME` (`itbeard.com`) and `404.html` (a copy of `index.html`, the SPA fallback) are added to `dist/`
5. `dist/` is uploaded and published with `actions/deploy-pages`

## What the build adds

GitHub Pages has no rewrites and no custom headers, so the build (see `vite.config.js`) does this itself:

- every route gets its own HTML — `about/index.html` and `about.html` — with that page's title,
  description and canonical address, so a deep link answers 200 and reads right without JavaScript;
- a Content-Security-Policy `<meta>` goes into every page;
- `sitemap.xml` gets the date of the newest book and record for `/books` and `/vinyl`.

A new route needs an entry in `ROUTES` in `vite.config.js`, a `<Route>` in `src/App.jsx`
and a line in `public/sitemap.xml`, `public/llms.txt` and the `<noscript>` block of `index.html`.

## One-time setup

**Settings → Pages → Source: GitHub Actions**, custom domain `itbeard.com`, "Enforce HTTPS" on.
