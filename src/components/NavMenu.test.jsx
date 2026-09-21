import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import NavMenu from './NavMenu'

const ROOT = resolve(import.meta.dirname, '../..')
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8')

function show(path = '/', lang = 'be') {
  localStorage.setItem('siteLang', lang)
  return render(
    <LangProvider>
      <MemoryRouter initialEntries={[path]}>
        <NavMenu />
      </MemoryRouter>
    </LangProvider>
  )
}

const shelves = () => screen.getByRole('button', { name: /Паліцы/ })

beforeEach(() => localStorage.clear())
afterEach(cleanup)

describe('«Паліцы» in the nav', () => {
  it('links to the books and the vinyl pages, as plain text', () => {
    show()
    const list = document.getElementById('shelves-menu')
    const links = within(list).getAllByRole('link')
    expect(links.map((a) => [a.textContent, a.getAttribute('href')])).toEqual([
      ['Кнігі', '/books'],
      ['Кружэлкі', '/vinils'],
    ])
  })

  it('sits between the archive and the contacts', () => {
    show()
    const order = [...document.querySelectorAll('#menu > *')].map((el) => el.textContent.trim())
    expect(order.indexOf('Пагост')).toBeLessThan(order.findIndex((t) => t.startsWith('Паліцы')))
    expect(order.findIndex((t) => t.startsWith('Паліцы'))).toBeLessThan(order.indexOf('Сувязь'))
  })

  it('opens on click and closes on Escape and on an outside click', async () => {
    const user = userEvent.setup()
    show()
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
    await user.click(shelves())
    expect(shelves()).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
    await user.click(shelves())
    await user.click(document.body)
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes after a link is chosen', async () => {
    const user = userEvent.setup()
    show()
    await user.click(shelves())
    await user.click(screen.getByRole('link', { name: 'Кнігі' }))
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
  })

  it('lights up while one of its pages is open', () => {
    show('/vinils')
    expect(shelves()).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Кружэлкі' })).toHaveClass('active')
    cleanup()
    show('/about')
    expect(shelves()).not.toHaveClass('active')
  })

  it('is translated', () => {
    show('/', 'en')
    expect(screen.getByRole('button', { name: /Shelves/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Vinyl' })).toHaveAttribute('href', '/vinils')
  })
})

// The pages used to be unlisted; now they are public and have to be discoverable everywhere.
describe.each(['books', 'vinils'])('/%s is a public page', (route) => {
  it('is in the sitemap, llms.txt and the noscript fallback', () => {
    for (const file of ['public/sitemap.xml', 'public/llms.txt', 'index.html']) {
      expect(read(file), `${file} does not mention /${route}`).toMatch(new RegExp(`/${route}\\b`))
    }
  })

  it('gets its own folder in the build and a route in the app', () => {
    expect(read('vite.config.js')).toMatch(new RegExp(`const ROUTES = \\[[^\\]]*'${route}'`))
    expect(read('src/App.jsx')).toContain(`path="/${route}"`)
  })

  it('no longer asks search engines to stay away', () => {
    expect(read('src/pages/Books.jsx') + read('src/pages/Vinyl.jsx')).not.toMatch(/noindex/i)
  })
})
