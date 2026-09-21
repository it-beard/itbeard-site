import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// These pages are meant to be reachable only by direct link. The checks guard
// the ways one could accidentally become discoverable.
const UNLISTED = ['vinils', 'books']

const ROOT = resolve(import.meta.dirname, '../..')
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8')

describe.each(UNLISTED)('/%s stays unlisted', (route) => {
  it('is not linked from the nav, the footer or the home page', () => {
    for (const file of ['src/components/NavMenu.jsx', 'src/components/Footer.jsx', 'src/pages/Home.jsx']) {
      expect(read(file), `${file} links to /${route}`).not.toMatch(new RegExp(`/${route}\\b`))
    }
  })

  it('is absent from the sitemap, robots.txt and llms.txt', () => {
    for (const file of ['public/sitemap.xml', 'public/robots.txt', 'public/llms.txt']) {
      expect(read(file), `${file} mentions /${route}`).not.toMatch(new RegExp(`/${route}\\b`))
    }
  })

  it('still gets its own folder in the build, so the direct link answers 200', () => {
    expect(read('vite.config.js')).toMatch(new RegExp(`const ROUTES = \\[[^\\]]*'${route}'`))
  })

  it('is routed in the app', () => {
    expect(read('src/App.jsx')).toContain(`path="/${route}"`)
  })
})
