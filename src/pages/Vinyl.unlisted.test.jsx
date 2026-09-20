import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// /vinils is meant to be reachable only by direct link. These guard the three
// ways it could accidentally become discoverable.
const ROOT = resolve(import.meta.dirname, '../..')
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8')

describe('/vinils stays unlisted', () => {
  it('is not linked from the nav, the footer or the home page', () => {
    for (const file of ['src/components/NavMenu.jsx', 'src/components/Footer.jsx', 'src/pages/Home.jsx']) {
      expect(read(file), `${file} links to /vinils`).not.toMatch(/vinils/)
    }
  })

  it('is absent from the sitemap, robots.txt and llms.txt', () => {
    for (const file of ['public/sitemap.xml', 'public/robots.txt', 'public/llms.txt']) {
      expect(read(file), `${file} mentions /vinils`).not.toMatch(/vinils/)
    }
  })

  it('still gets its own folder in the build, so the direct link does not 404', () => {
    expect(read('vite.config.js')).toMatch(/const ROUTES = \[[^\]]*'vinils'/)
  })

  it('is routed in the app', () => {
    expect(read('src/App.jsx')).toMatch(/path="\/vinils"/)
  })
})
