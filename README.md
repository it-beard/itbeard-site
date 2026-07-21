# itbeard.com

Open-source repository of ITBeard's personal website: https://itbeard.com

Built with **React + Vite**. All page texts live in Markdown files with both languages (Belarusian and English) side by side.

## Structure

```
content/          # page texts, one .md file per page, both languages in each file
src/
  components/     # header/nav, footer, layout
  pages/          # route components
  data/site.js    # language-independent data: URLs, images, crypto wallets, redirects
  lib/            # markdown content loader, language context
public/           # static assets (images, fonts, PDFs)
```

## Editing texts / translations

Open a file in `content/`:

- Frontmatter values are localized in place: `title: { be: Кантакты, en: Contacts }`
- Page body is split by `<!-- be -->` and `<!-- en -->` markers; each language block
  uses regular Markdown with `# Section {#id}` and `## Card {#id}` headings.

## Run locally

```
npm install
npm run dev
```

## Build

```
npm run build    # output in dist/
```

Deployed to GitHub Pages automatically on push to `main` (see `.github/workflows/deploy.yml`).
