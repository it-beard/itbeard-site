import { cpSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages has no server-side rewrites: a deep link like /about would be
// served by 404.html with an HTTP 404 status, which keeps crawlers from
// indexing those pages. Copying index.html into each route's folder makes
// Pages serve them with a proper 200.
const ROUTES = ['about', 'experience', 'archive', 'support', 'sponsorship', 'help', 'contacts', 'mediakit']

function spaRoutePages() {
  return {
    name: 'spa-route-pages',
    apply: 'build',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist')
      for (const route of ROUTES) {
        mkdirSync(resolve(dist, route), { recursive: true })
        cpSync(resolve(dist, 'index.html'), resolve(dist, route, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), spaRoutePages()],
})
