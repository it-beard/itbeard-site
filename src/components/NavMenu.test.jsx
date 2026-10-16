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
      ['Кружэлкі', '/vinyl'],
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

  it('closes after a link is chosen, and stays hidden under the pointer until it leaves', async () => {
    const user = userEvent.setup()
    show()
    const group = shelves().parentElement
    await user.click(shelves())
    await user.click(screen.getByRole('link', { name: 'Кнігі' }))
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
    expect(group).toHaveClass('chosen')
    await user.unhover(group)
    expect(group).not.toHaveClass('chosen')
  })

  it('closes when the mouse leaves it', async () => {
    const user = userEvent.setup()
    show()
    await user.click(shelves())
    expect(shelves()).toHaveAttribute('aria-expanded', 'true')
    await user.unhover(shelves().parentElement)
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
  })

  it('stays open while the keyboard walks its links and closes when the focus moves on', async () => {
    const user = userEvent.setup()
    show()
    shelves().focus()
    await user.keyboard('{Enter}')
    expect(shelves()).toHaveAttribute('aria-expanded', 'true')
    await user.tab()
    expect(screen.getByRole('link', { name: 'Кнігі' })).toHaveFocus()
    await user.tab()
    expect(shelves()).toHaveAttribute('aria-expanded', 'true')
    await user.tab()
    expect(screen.getByRole('link', { name: 'Сувязь' })).toHaveFocus()
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
  })

  it('hands the focus back to its button on Escape', async () => {
    const user = userEvent.setup()
    show()
    shelves().focus()
    await user.keyboard('{Enter}')
    await user.tab()
    await user.keyboard('{Escape}')
    expect(shelves()).toHaveFocus()
    expect(shelves()).toHaveAttribute('aria-expanded', 'false')
  })

  // Regression: a clicked button or link keeps the focus, so a list shown on
  // :focus-within hung open until the next click somewhere else.
  it('is not held open by the focus alone', () => {
    const css = read('src/styles/main.css')
    expect(css).not.toMatch(/\.nav-group:focus-within/)
    expect(css).toMatch(/\.nav-group:not\(\.chosen\):hover \.nav-group-list/)
  })

  it('lights up while one of its pages is open', () => {
    show('/vinyl')
    expect(shelves()).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Кружэлкі' })).toHaveClass('active')
    cleanup()
    show('/about')
    expect(shelves()).not.toHaveClass('active')
  })

  it('is translated', () => {
    show('/', 'en')
    expect(screen.getByRole('button', { name: /Shelves/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Vinyl' })).toHaveAttribute('href', '/vinyl')
  })
})

// The pages used to be unlisted; now they are public and have to be discoverable everywhere.
describe.each(['books', 'vinyl'])('/%s is a public page', (route) => {
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
