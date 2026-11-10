import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadAll as loadYamlAll } from 'js-yaml'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { LIBRARY } from './src/data/books.js'
import { VINYL } from './src/data/site.js'

const ORIGIN = 'https://itbeard.com'
const root = import.meta.dirname

// GitHub Pages has no server-side rewrites: a deep link like /about would be
// served by 404.html with an HTTP 404 status, which keeps crawlers from
// indexing those pages. So every route gets its own copy of index.html — and
// since crawlers that run no JavaScript read only that copy, it carries the
// page's own title, description and canonical address (the Belarusian ones,
// like the rest of the static shell; useTitle.js takes over once the app runs).
//   route → the content file its texts come from; `canonical` for alias routes,
//   `noindex` for routes that only redirect
const ROUTES = {
  about: { page: 'about' },
  experience: { page: 'experience' },
  archive: { page: 'archive' },
  support: { page: 'support' },
  sponsorship: { page: 'support', canonical: 'support' },
  help: { page: 'support', canonical: 'support' },
  contacts: { page: 'contacts' },
  vinyl: { page: 'vinyl' },
  books: { page: 'books' },
  sites: { page: 'sites' },
  mediakit: { noindex: true },
}

// Nothing on the pages needs more than this: own scripts, Google Fonts, the
// YouTube embed on /about. It is added at build time only — the dev server
// relies on inline scripts for hot reload.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  'frame-src https://www.youtube-nocookie.com',
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const frontmatter = (name) => {
  const raw = readFileSync(resolve(root, 'content', `${name}.md`), 'utf8')
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  return fm ? loadYamlAll(fm[1])[0] || {} : {}
}

const attr = (text) =>
  String(text).replace(/\s+/g, ' ').trim().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// swaps the value of one tag, failing the build if index.html no longer has the tag
function swap(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`spa-route-pages: nothing in index.html matches ${pattern}`)
  return html.replace(pattern, (_, before, after) => before + value + after)
}

function routeHtml(html, route, { page, canonical, noindex }) {
  const url = `${ORIGIN}/${canonical ?? route}`
  let out = swap(html, /(<link rel="canonical" href=")[^"]*(")/, url)
  out = swap(out, /(<meta property="og:url" content=")[^"]*(")/, url)
  if (noindex) out = out.replace('<link rel="canonical"', '<meta name="robots" content="noindex" />\n    <link rel="canonical"')
  if (!page) return out

  const meta = frontmatter(page)
  const title = attr(`${meta.title.be} ${frontmatter('shared').titleSuffix.be}`)
  const description = attr(meta.description.be)
  out = swap(out, /(<title>)[^<]*(<\/title>)/, title)
  out = swap(out, /(<meta property="og:title" content=")[^"]*(")/, title)
  out = swap(out, /(<meta name="twitter:title" content=")[^"]*(")/, title)
  out = swap(out, /(<meta name="description"\s+content=")[^"]*(")/, description)
  out = swap(out, /(<meta property="og:description"\s+content=")[^"]*(")/, description)
  return out
}

// the day the newest book or record joined its shelf — those pages change with the data
const newest = (items) => items.map((i) => i.added).sort().at(-1)

function spaRoutePages() {
  return {
    name: 'spa-route-pages',
    apply: 'build',
    transformIndexHtml: (html) =>
      html.replace('<meta charset="utf-8" />', `<meta charset="utf-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
    closeBundle() {
      const dist = resolve(root, 'dist')
      const index = readFileSync(resolve(dist, 'index.html'), 'utf8')
      for (const [route, options] of Object.entries(ROUTES)) {
        const html = routeHtml(index, route, options)
        // /about/ and /about both answer: Pages serves about.html for the address
        // without the slash, so it needs no redirect to the folder
        mkdirSync(resolve(dist, route), { recursive: true })
        writeFileSync(resolve(dist, route, 'index.html'), html)
        writeFileSync(resolve(dist, `${route}.html`), html)
      }

      // /books and /vinyl are never older in the sitemap than their newest entry
      const sitemap = resolve(dist, 'sitemap.xml')
      let xml = readFileSync(sitemap, 'utf8')
      for (const [route, day] of [['books', newest(LIBRARY)], ['vinyl', newest(VINYL)]]) {
        xml = xml.replace(
          new RegExp(`(<loc>${ORIGIN}/${route}</loc>\\s*<lastmod>)([^<]*)(</lastmod>)`),
          (_, before, current, after) => before + (current > day ? current : day) + after
        )
      }
      writeFileSync(sitemap, xml)
    },
  }
}

export default defineConfig({
  plugins: [react(), spaRoutePages()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    include: ['src/**/*.test.{js,jsx}'],
  },
})
