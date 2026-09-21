import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { LIBRARY, WANTED } from '../data/books'
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
const spines = () => screen.queryAllByRole('listitem').filter((li) => li.classList.contains('spine'))
const chip = (name) => screen.getByRole('button', { name: new RegExp(`^${name}`) })
const search = () => screen.getByRole('searchbox')

beforeEach(() => localStorage.clear())
afterEach(cleanup)

describe('wanted list data', () => {
  it('has unique ids', () => {
    const ids = WANTED.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('ships a cover file for every book', () => {
    for (const b of WANTED) {
      expect(b.image).toBe(`/images/books/${b.id}.webp`)
      expect(existsSync(resolve(ROOT, `public${b.image}`)), `missing cover for ${b.id}`).toBe(true)
    }
  })

  it('gives every book a title, a series and a part number', () => {
    for (const b of WANTED) {
      expect(b.title, b.id).toBeTruthy()
      expect(b.series, b.id).toBeTruthy()
      expect(Number.isInteger(b.part), b.id).toBe(true)
    }
  })

  it('has an author, a translator, a publisher and a note for every book in both languages', () => {
    for (const lang of ['be', 'en']) {
      const page = getPage('books', lang)
      const notes = getSection(page, 'wanted').subs
      for (const b of WANTED) {
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
    for (const b of WANTED) expect(b.url, b.id).toMatch(/^https:\/\//)
  })
})

describe('library data', () => {
  it('has unique ids', () => {
    expect(new Set(LIBRARY.map((b) => b.id)).size).toBe(LIBRARY.length)
  })

  it('gives every book a title, a language the site can label, and at least one tag', () => {
    const { langNames, langCodes } = getPage('shared', 'be').labels
    for (const b of LIBRARY) {
      expect(b.title, b.id).toBeTruthy()
      expect(langNames[b.lang], `${b.title}: no name for «${b.lang}»`).toBeTruthy()
      expect(langCodes[b.lang], `${b.title}: no code for «${b.lang}»`).toBeTruthy()
      expect(b.tags.length, b.title).toBeGreaterThan(0)
    }
  })

  it('only uses tags that have a filter chip', () => {
    const chips = Object.keys(getPage('books', 'be').filters)
    for (const b of LIBRARY) {
      for (const tag of b.tags) expect(chips, `${b.title} → ${tag}`).toContain(tag)
    }
  })

  it('gives every filter chip at least one book', () => {
    const chips = Object.keys(getPage('books', 'be').filters).filter((t) => t !== 'all')
    for (const tag of chips) {
      expect(LIBRARY.some((b) => b.tags.includes(tag)), `no books tagged ${tag}`).toBe(true)
    }
  })

  it('paints every spine with valid colours and a known thickness', () => {
    for (const b of LIBRARY) {
      expect(b.spine, b.title).toMatch(/^#[0-9a-f]{6}$/)
      expect(b.ink, b.title).toMatch(/^#[0-9a-f]{6}$/)
      expect([1, 2, 3], b.title).toContain(b.size)
    }
  })

  it('keeps the lettering readable against the spine', () => {
    // WCAG relative luminance; 3:1 is the floor for large bold text
    const lum = (hex) => {
      const [r, g, b] = [1, 3, 5].map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    for (const b of LIBRARY) {
      const [hi, lo] = [lum(b.spine), lum(b.ink)].sort((x, y) => y - x)
      expect((hi + 0.05) / (lo + 0.05), `${b.title}: ${b.ink} on ${b.spine}`).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('books page: wanted carousel', () => {
  it('shows the wanted books above the library, each section with its counter', () => {
    show()
    const [wantedHead, libraryHead] = screen.getAllByRole('heading', { level: 2 })
    expect(wantedHead).toHaveTextContent(`Шукаю (${WANTED.length})`)
    expect(libraryHead).toHaveTextContent(`Мая бібліятэка (${LIBRARY.length})`)
    expect(covers()).toHaveLength(WANTED.length)
    expect(wantedHead.compareDocumentPosition(libraryHead) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('captions a cover with the author, the title and the series line', () => {
    show()
    const first = covers()[0]
    expect(within(first).getByText('К. С. Льюіс')).toBeInTheDocument()
    expect(within(first).getByText(WANTED[0].title)).toBeInTheDocument()
    expect(within(first).getByText('Хронікі Нарніі · частка 1')).toBeInTheDocument()
  })

  it('hides both arrows while the strip has nothing to scroll', () => {
    show()
    expect(screen.queryByRole('button', { name: 'Пракруціць назад' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Пракруціць далей' })).not.toBeInTheDocument()
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
    expect(source).toHaveAttribute('href', WANTED[1].url)
    expect(source).toHaveAttribute('target', '_blank')
  })

  it('leaves out facts a book does not have', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[0]) // the Narnia volume has an ISBN but no known print run
    const view = screen.getByRole('dialog')
    expect(within(view).getByText(WANTED[0].isbn)).toBeInTheDocument()
    expect(within(view).queryByText('Наклад')).not.toBeInTheDocument()
  })

  it('steps through the list with the arrow keys, wraps around, and closes on Escape', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[0])
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveTextContent(`${WANTED.length} / ${WANTED.length}`)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${WANTED.length}`)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('books page: library', () => {
  it('lists every book without pagination', () => {
    show()
    expect(spines()).toHaveLength(LIBRARY.length)
    expect(screen.getByText(`Знойдзена: ${LIBRARY.length} з ${LIBRARY.length}`)).toBeInTheDocument()
  })

  it('prints the author, the title and the language code on a spine', () => {
    show()
    const spine = spines().find((li) => within(li).queryByText('Сабакі Эўропы'))
    expect(within(spine).getByText('Альгерд Бахарэвіч')).toBeInTheDocument()
    expect(within(spine).getByText('бел')).toBeInTheDocument()
  })

  it('finds books by title', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), 'дзюна')
    expect(spines()).toHaveLength(1)
    expect(screen.getByText('Фрэнк Герберт')).toBeInTheDocument()
  })

  it('finds books by author, ignoring case and the ў/у, ё/е slips', async () => {
    const user = userEvent.setup()
    const expected = LIBRARY.filter((b) => b.author === 'Уладзімір Караткевіч').length
    show()
    await user.type(search(), 'УЛАДЗІМІР КАРАТКЕВІЧ')
    expect(spines()).toHaveLength(expected)
    await user.clear(search())
    await user.type(search(), 'быкау')
    expect(spines().length).toBeGreaterThan(0)
    expect(spines().every((li) => /Быкаў/.test(li.textContent))).toBe(true)
  })

  it('finds books by series, even though it is not part of the title', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), 'хронікі нарніі')
    expect(spines()).toHaveLength(LIBRARY.filter((b) => b.series === 'Хронікі Нарніі').length)
    expect(screen.getByText('Прынц Каспіян')).toBeInTheDocument()
  })

  it('narrows by subject and by language, and combines both with the search', async () => {
    const user = userEvent.setup()
    show()
    await user.click(chip('IT і праца'))
    expect(spines()).toHaveLength(LIBRARY.filter((b) => b.tags.includes('tech')).length)
    await user.click(chip('Ангельская'))
    expect(spines()).toHaveLength(LIBRARY.filter((b) => b.tags.includes('tech') && b.lang === 'en').length)
    await user.type(search(), 'clean')
    expect(spines()).toHaveLength(1)
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument()
  })

  it('offers only the languages that are actually on the shelves', () => {
    show()
    expect(chip('Польская')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Нямецкая/ })).not.toBeInTheDocument()
  })

  it('says so when nothing matches, and resets everything in one click', async () => {
    const user = userEvent.setup()
    show()
    await user.click(chip('Паэзія'))
    await user.type(search(), 'няма такой кнігі')
    expect(spines()).toHaveLength(0)
    expect(screen.getByText('Такой кнігі на паліцах няма.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Скінуць' }))
    expect(spines()).toHaveLength(LIBRARY.length)
    expect(search()).toHaveValue('')
    expect(screen.queryByRole('button', { name: 'Скінуць' })).not.toBeInTheDocument()
  })

  it('translates the chrome but keeps titles as printed on the English page', () => {
    show('en')
    expect(screen.getByRole('heading', { level: 2, name: /My library/ })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search by author or title')).toBeInTheDocument()
    expect(screen.getByText('Сабакі Эўропы')).toBeInTheDocument()
    expect(screen.getAllByText('J. R. R. Tolkien')).toHaveLength(2)
  })
})

describe('books page: housekeeping', () => {
  it('keeps the page out of search indexes while it is open', () => {
    const { unmount } = show()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    unmount()
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
  })

  // Regression: the ✕ hangs off the frame's corner, so the frame must not be the
  // scroll container — `overflow` there clipped half of the button.
  it('keeps the cover view close button outside the scrolling element', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[0])
    const close = within(screen.getByRole('dialog')).getByRole('button', { name: 'Зачыніць' })
    expect(close.closest('.cover-view-scroll')).toBeNull()
    expect(close.parentElement).toHaveClass('cover-view')
    const css = readFileSync(resolve(ROOT, 'src/styles/main.css'), 'utf8')
    expect(/\.cover-view \{[^}]*\}/.exec(css)[0]).not.toMatch(/overflow/)
  })

  // Same trap, different place: the rail is a scroll container, so without padding
  // it would clip the swinging cover and its shadow.
  it('pads the carousel so the scroll container cannot clip the covers', () => {
    const css = readFileSync(resolve(ROOT, 'src/styles/main.css'), 'utf8')
    const rail = /\.book-rail \{[^}]*\}/.exec(css)[0]
    expect(rail).toMatch(/overflow-x: auto/)
    expect(rail).toMatch(/padding: \d+px \d+px \d+px/)
  })
})
