import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { BOOKS } from '../data/site'
import Books from './Books'

const ROOT = resolve(import.meta.dirname, '../..')

function show(lang = 'be') {
  localStorage.setItem('siteLang', lang)
  return render(
    <LangProvider>
      <MemoryRouter initialEntries={['/books']}>
        <Books />
      </MemoryRouter>
    </LangProvider>
  )
}

const covers = () => screen.getAllByRole('button').filter((b) => b.classList.contains('book-item'))

beforeEach(() => localStorage.clear())
afterEach(cleanup)

describe('book wishlist data', () => {
  it('has unique ids', () => {
    const ids = BOOKS.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('ships a cover file for every book', () => {
    for (const b of BOOKS) {
      expect(b.image).toBe(`/images/books/${b.id}.webp`)
      expect(existsSync(resolve(ROOT, `public${b.image}`)), `missing cover for ${b.id}`).toBe(true)
    }
  })

  it('gives every book a title, a series and a part number', () => {
    for (const b of BOOKS) {
      expect(b.title, b.id).toBeTruthy()
      expect(b.series, b.id).toBeTruthy()
      expect(Number.isInteger(b.part), b.id).toBe(true)
    }
  })

  it('has an author, a translator, a publisher and a note for every book in both languages', () => {
    for (const lang of ['be', 'en']) {
      const page = getPage('books', lang)
      const notes = getSection(page, 'intro').subs
      for (const b of BOOKS) {
        const details = page.details[b.id]
        expect(details, `${b.id} has no ${lang} details`).toBeDefined()
        for (const field of ['author', 'translator', 'publisher']) {
          expect(details[field], `${b.id} ${lang} ${field}`).toBeTruthy()
        }
        expect(notes.find((s) => s.id === b.id)?.html.trim(), `${b.id} has no ${lang} note`).toBeTruthy()
      }
    }
  })

  it('links every source over https', () => {
    for (const b of BOOKS) expect(b.url, b.id).toMatch(/^https:\/\//)
  })
})

describe('book wishlist page', () => {
  it('renders every book and counts them in the heading', () => {
    show()
    expect(covers()).toHaveLength(BOOKS.length)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`(${BOOKS.length})`)
  })

  it('captions a cover with the author, the title and the series line', () => {
    show()
    const first = covers()[0]
    expect(within(first).getByText('К. С. Льюіс')).toBeInTheDocument()
    expect(within(first).getByText(BOOKS[0].title)).toBeInTheDocument()
    expect(within(first).getByText('Хронікі Нарніі · частка 1')).toBeInTheDocument()
  })

  it('transliterates people on the English page', () => {
    show('en')
    expect(screen.getAllByText('J. R. R. Tolkien')).toHaveLength(2)
    expect(screen.queryByText('Дж. Р. Р. Толкін')).not.toBeInTheDocument()
  })

  it('invites owners to get in touch', () => {
    show()
    expect(screen.getByRole('link', { name: 'напішыце мне' })).toHaveAttribute('href', '/contacts')
  })

  it('opens a book with its translators, print run and a source link', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[1])
    const view = screen.getByRole('dialog')
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent('Дзьве вежы')
    expect(within(view).getByText('Дзьмітры Магілеўцаў, Крысьціна Курчанкова')).toBeInTheDocument()
    expect(within(view).getByText('500 ас.')).toBeInTheDocument()
    expect(within(view).getByText('2008')).toBeInTheDocument()
    const source = within(view).getByRole('link', { name: /Пра выданьне/ })
    expect(source).toHaveAttribute('href', BOOKS[1].url)
    expect(source).toHaveAttribute('target', '_blank')
  })

  it('leaves out facts a book does not have', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[0]) // the Narnia volume has an ISBN but no known print run
    const view = screen.getByRole('dialog')
    expect(within(view).getByText(BOOKS[0].isbn)).toBeInTheDocument()
    expect(within(view).queryByText('Наклад')).not.toBeInTheDocument()
  })

  it('steps through the list with the arrow keys, wraps around, and closes on Escape', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[0])
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveTextContent(`${BOOKS.length} / ${BOOKS.length}`)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${BOOKS.length}`)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('keeps the page out of search indexes while it is open', () => {
    const { unmount } = show()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    unmount()
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
  })
})
