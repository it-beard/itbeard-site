import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { LANG_ORDER, LIBRARY, compareText, langsOf, surnameOf, WANTED } from '../data/books'
import Books from './Books'
import CoverView from '../components/CoverView'

const ROOT = resolve(import.meta.dirname, '../..')

function show(lang = 'be', path = '/books') {
  localStorage.setItem('siteLang', lang)
  return render(
    <LangProvider>
      <MemoryRouter initialEntries={[path]}>
        <Books />
      </MemoryRouter>
    </LangProvider>
  )
}

const covers = () => screen.getAllByRole('button').filter((b) => b.classList.contains('book-item'))
const spines = () => screen.queryAllByRole('button').filter((b) => b.classList.contains('spine'))
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

  it('gives every book a title, and every volume of a series its part number', () => {
    for (const b of WANTED) {
      expect(b.title, b.id).toBeTruthy()
      if (b.series) expect(Number.isInteger(b.part), b.id).toBe(true)
    }
  })

  it('has an author, a publisher and a note for every book in both languages', () => {
    for (const lang of ['be', 'en']) {
      const page = getPage('books', lang)
      const notes = getSection(page, 'wanted').subs
      for (const b of WANTED) {
        const details = page.details[b.id]
        expect(details, `${b.id} has no ${lang} details`).toBeDefined()
        for (const field of ['author', 'publisher']) {
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

  it('has a note for every book in both languages', () => {
    for (const lang of ['be', 'en']) {
      const notes = getSection(getPage('library', lang), 'notes').subs
      for (const b of LIBRARY) {
        expect(notes.find((s) => s.id === b.id)?.html.trim(), `${b.id} has no ${lang} note`).toBeTruthy()
      }
    }
  })

  it('ships a cover file for every book', () => {
    const withCover = LIBRARY.filter((b) => b.image)
    expect(withCover).toHaveLength(LIBRARY.length)
    for (const b of withCover) {
      expect(b.image).toBe(`/images/library/${b.id}.webp`)
      expect(existsSync(resolve(ROOT, `public${b.image}`)), `missing cover for ${b.id}`).toBe(true)
    }
  })

  it('knows the publisher of nearly every book and keeps the facts well-formed', () => {
    // a few editions name no publisher anywhere — those stay blank rather than guessed
    expect(LIBRARY.filter((b) => b.publisher).length).toBeGreaterThan(LIBRARY.length * 0.95)
    for (const b of LIBRARY) {
      if (b.year) expect(b.year, b.id).toBeGreaterThan(1900)
      if (b.pages) expect(Number.isInteger(b.pages), b.id).toBe(true)
    }
  })

  it('marks bilingual editions with known languages, never repeating the main one', () => {
    const { langNames } = getPage('shared', 'be').labels
    const bilingual = LIBRARY.filter((b) => b.also)
    expect(bilingual.length).toBeGreaterThan(2)
    for (const b of bilingual) {
      expect(b.also, b.title).not.toContain(b.lang)
      for (const code of b.also) expect(langNames[code], `${b.title}: ${code}`).toBeTruthy()
    }
    expect(langsOf(LIBRARY.find((b) => b.id === 'mysl-bialoruska-xx-wieku'))).toEqual(['be', 'pl'])
  })

  it('sorts by language first: Belarusian, English, Polish, Russian', () => {
    const langs = LIBRARY.map((b) => LANG_ORDER.indexOf(b.lang))
    expect(langs.every((n) => n >= 0)).toBe(true)
    expect(langs).toEqual([...langs].sort((a, b) => a - b))
    expect(LIBRARY[0].lang).toBe('be')
    expect(LIBRARY.at(-1).lang).toBe('ru')
  })

  it('puts the series first within a language, by name, volume by volume', () => {
    for (const lang of LANG_ORDER) {
      const books = LIBRARY.filter((b) => b.lang === lang)
      const firstSingle = books.findIndex((b) => !b.series)
      const inSeries = firstSingle === -1 ? books : books.slice(0, firstSingle)
      expect(books.slice(inSeries.length).every((b) => !b.series), lang).toBe(true)
      const names = [...new Set(inSeries.map((b) => b.series))]
      expect(names, lang).toEqual([...names].sort((a, b) => a.localeCompare(b, lang)))
      for (const name of names) {
        const parts = inSeries.filter((b) => b.series === name).map((b) => b.part)
        expect(parts, name).toEqual([...parts].sort((a, b) => a - b))
      }
    }
  })

  it('files the single books under the author\'s surname, then by title', () => {
    const singles = LIBRARY.filter((b) => b.lang === 'be' && !b.series && b.author)
    const surnames = singles.map((b) => surnameOf(b.author))
    expect(surnames).toEqual([...surnames].sort((a, b) => a.localeCompare(b, 'be')))
    expect(surnameOf('Уладзімір Караткевіч')).toBe('Караткевіч')
    expect(surnameOf('Дж. Р. Р. Толкін')).toBe('Толкін')
    expect(surnameOf('Уладзімір Арлоў, Зьміцер Герасімовіч')).toBe('Арлоў')
    expect(surnameOf('Антуан дэ Сент-Экзюперы')).toBe('Сент Экзюперы')
    expect(surnameOf('Владстон Феррейра Фило')).toBe('Феррейра Фило')

    // one author's books stand together, by title
    const karatkievich = singles.filter((b) => b.author === 'Уладзімір Караткевіч')
    const from = singles.indexOf(karatkievich[0])
    expect(singles.slice(from, from + karatkievich.length)).toEqual(karatkievich)
    const titles = karatkievich.map((b) => b.title)
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, 'be')))
    const homer = singles.filter((b) => b.author === 'Гамер').map((b) => b.title)
    expect(homer).toEqual(['Адысея', 'Іліяда'])
  })

  it('orders scripts itself instead of trusting the browser: digits, Cyrillic, then Latin', () => {
    // under the 'en' locale plain localeCompare would put Latin first — the rank must win
    expect('Irdorath'.localeCompare('Шапран', 'en')).toBeLessThan(0)
    expect(compareText('Irdorath', 'Шапран', 'en')).toBeGreaterThan(0)
    expect(compareText('1984', 'Ферма жывёлаў', 'be')).toBeLessThan(0)
    const authors = LIBRARY.filter((b) => b.lang === 'be' && !b.series && b.author).map((b) => b.author)
    expect(authors.at(-1)).toBe('Irdorath')
  })

  it('closes each language with the books that name no author, by title', () => {
    for (const lang of LANG_ORDER) {
      const singles = LIBRARY.filter((b) => b.lang === lang && !b.series)
      const firstAnonymous = singles.findIndex((b) => !b.author)
      if (firstAnonymous === -1) continue
      const tail = singles.slice(firstAnonymous)
      expect(tail.every((b) => !b.author), lang).toBe(true)
      const titles = tail.map((b) => b.title)
      expect(titles, lang).toEqual([...titles].sort((a, b) => a.localeCompare(b, lang)))
    }
  })

  it('paints all volumes of one series the same colour', () => {
    const colours = {}
    for (const b of LIBRARY.filter((x) => x.series)) (colours[b.series] ??= new Set()).add(`${b.spine}/${b.ink}`)
    expect(Object.keys(colours).length).toBeGreaterThan(5)
    for (const [series, set] of Object.entries(colours)) expect([...set], series).toHaveLength(1)
  })

  it('numbers the volumes of a series without repeats', () => {
    const parts = {}
    for (const b of LIBRARY.filter((x) => x.series)) {
      expect(Number.isInteger(b.part), b.title).toBe(true)
      expect((parts[b.series] ??= new Set()).has(b.part), `${b.series} has two parts ${b.part}`).toBe(false)
      parts[b.series].add(b.part)
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

  it('gives every book a profile: a genre, themes and a form', () => {
    for (const b of LIBRARY) {
      expect(Array.isArray(b.genre) && b.genre.length > 0, `${b.id} has no genre`).toBe(true)
      expect(Array.isArray(b.themes) && b.themes.length > 0, `${b.id} has no themes`).toBe(true)
      expect(Array.isArray(b.mood), `${b.id} has no mood list`).toBe(true)
      expect(typeof b.form, `${b.id} has no form`).toBe('string')
      for (const key of [...b.genre, ...b.themes, ...b.mood, b.form]) {
        expect(new Set([...b.genre, ...b.themes, ...b.mood, b.form]).size, `${b.id} repeats a key`).toBe(
          b.genre.length + b.themes.length + b.mood.length + 1
        )
        expect(typeof key, `${b.id} has a malformed key`).toBe('string')
      }
    }
  })

  it('only uses profile keys that the concept dictionary labels in both languages', () => {
    const be = getPage('books', 'be').concepts
    const en = getPage('books', 'en').concepts
    for (const b of LIBRARY) {
      for (const key of [...b.genre, ...b.themes, ...b.mood, b.form]) {
        expect(be[key]?.label, `${b.id}: «${key}» is not in the dictionary`).toBeTruthy()
        expect(en[key]?.label, `${b.id}: «${key}» has no English label`).toBeTruthy()
        expect(be[key].aka.length, `«${key}» has no search words`).toBeGreaterThan(0)
        expect(be[key].aka.every((w) => typeof w === 'string'), `«${key}» has a non-word in aka`).toBe(true)
      }
    }
  })

  it('uses every concept of the dictionary in at least one profile', () => {
    const used = new Set(LIBRARY.flatMap((b) => [...b.genre, ...b.themes, ...b.mood, b.form]))
    const unused = Object.keys(getPage('books', 'be').concepts).filter((k) => !used.has(k))
    expect(unused).toEqual([])
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

  it('captions a book outside any series with its subtitle instead of a part number', () => {
    show()
    const pravapis = covers()[WANTED.findIndex((b) => b.id === 'bielaruski-klasycny-pravapis')]
    expect(within(pravapis).getByText('Беларускі клясычны правапіс')).toBeInTheDocument()
    expect(within(pravapis).getByText('Збор правілаў. Сучасная нармалізацыя')).toBeInTheDocument()
    expect(within(pravapis).queryByText(/частка/)).not.toBeInTheDocument()
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

  it('opens a book outside any series with its page count and without a translator line', async () => {
    const user = userEvent.setup()
    show()
    await user.click(covers()[WANTED.findIndex((b) => b.id === 'bielaruski-klasycny-pravapis')])
    const view = screen.getByRole('dialog')
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent('Беларускі клясычны правапіс')
    expect(within(view).getByText('Юрась Бушлякоў, Вінцук Вячорка, Зьміцер Санько, Зьміцер Саўка')).toBeInTheDocument()
    expect(within(view).getByText('158')).toBeInTheDocument()
    expect(within(view).getByText('Вільня — Менск')).toBeInTheDocument()
    expect(within(view).queryByText('Пераклад')).not.toBeInTheDocument()
    expect(within(view).queryByText(/частка/)).not.toBeInTheDocument()
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
    const spine = spines().find((el) => within(el).queryByText('Сабакі Эўропы'))
    expect(within(spine).getByText('Альгерд Бахарэвіч')).toBeInTheDocument()
    expect(within(spine).getByText('бел')).toBeInTheDocument()
  })

  it('names the series on the spine unless the title already does', () => {
    show()
    const witcher = spines().find((el) => within(el).queryByText('Кроў эльфаў'))
    expect(within(witcher).getByText('Анджэй Сапкоўскі · Вядзьмар')).toBeInTheDocument()
    const potter = spines().find((el) => within(el).queryByText('Гары Потэр і Келіх агню'))
    expect(within(potter).getByText('Дж. К. Роўлінг')).toBeInTheDocument()
  })

  it('opens a card for a book, with the series line and the language', async () => {
    const user = userEvent.setup()
    show()
    await user.click(spines().find((el) => within(el).queryByText('Час ганьбы')))
    const view = screen.getByRole('dialog')
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent('Час ганьбы')
    // the author also appears on the typeset stand-in cover, so ask for the credit line itself
    expect(view.querySelector('.cover-overline')).toHaveTextContent('Анджэй Сапкоўскі')
    expect(within(view).getByText('Вядзьмар · частка 4')).toBeInTheDocument()
    expect(within(view).getByText('Беларуская')).toBeInTheDocument()
    // facts, a real cover and the note come from the research
    expect(within(view).getByText('Янушкевіч', { exact: false })).toBeInTheDocument()
    expect(within(view).getByRole('img')).toHaveAttribute('src', '/images/library/sapkowski-4-cas-pahardy.webp')
    expect(view.querySelector('.cover-note')).not.toBeEmptyDOMElement()
  })

  it('walks the filtered list from an open card, wrapping around', async () => {
    const user = userEvent.setup()
    show()
    await user.click(chip('Паэзія'))
    const poetry = LIBRARY.filter((b) => b.tags.includes('poetry'))
    await user.click(spines()[0])
    expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${poetry.length}`)
    await user.keyboard('{ArrowLeft}')
    const view = screen.getByRole('dialog')
    expect(view).toHaveTextContent(`${poetry.length} / ${poetry.length}`)
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent(poetry.at(-1).title)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
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
    expect(spines().every((el) => /Быкаў/.test(el.textContent))).toBe(true)
  })

  it('filters by year and by page count typed into the same box', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), '2023')
    expect(spines()).toHaveLength(LIBRARY.filter((b) => b.year === 2023).length)
    await user.clear(search())
    await user.type(search(), '>500')
    expect(spines()).toHaveLength(LIBRARY.filter((b) => b.pages > 500).length)
    await user.clear(search())
    await user.type(search(), 'толкін 2008')
    expect(spines()).toHaveLength(1)
    expect(screen.getByText('Уладар Пярсьцёнкаў. 1. Зьвяз Пярсьцёнка')).toBeInTheDocument()
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
    expect(spines()).toHaveLength(
      LIBRARY.filter((b) => b.tags.includes('tech') && langsOf(b).includes('en')).length
    )
    await user.type(search(), 'clean')
    expect(spines()).toHaveLength(1)
    expect(screen.getByText('Clean Architecture')).toBeInTheDocument()
  })

  it('offers only the languages that are actually on the shelves', () => {
    show()
    expect(chip('Ангельская')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Нямецкая/ })).not.toBeInTheDocument()
  })

  it('files a bilingual book under its main language but finds it under both', async () => {
    const user = userEvent.setup()
    show()
    const spine = spines().find((el) => /Беларуская думка/.test(el.textContent))
    expect(within(spine).getByText('бел · пол')).toBeInTheDocument()

    // Polish has no books of its own, so its chip exists only thanks to the bilingual ones
    const polish = LIBRARY.filter((b) => langsOf(b).includes('pl'))
    expect(polish.every((b) => b.lang === 'be')).toBe(true)
    await user.click(chip('Польская'))
    expect(spines()).toHaveLength(polish.length)
    await user.click(spines().find((el) => /Беларуская думка/.test(el.textContent)))
    expect(within(screen.getByRole('dialog')).getByText('Беларуская, Польская')).toBeInTheDocument()
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


  it('finds a book by a theme word, a typo and a Russian spelling', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), 'марс')
    const titles = spines().map((el) => el.textContent)
    expect(titles.some((t) => /Марсіянін/.test(t))).toBe(true)
    expect(titles.some((t) => /Марсіянскія хронікі/.test(t))).toBe(true)
    await user.clear(search())
    await user.type(search(), 'тлокін')
    expect(spines().length).toBeGreaterThan(0)
    expect(spines().every((el) => /Толкін/.test(el.textContent))).toBe(true)
    await user.clear(search())
    await user.type(search(), 'Дюна')
    expect(spines()).toHaveLength(1)
    expect(screen.getByText('Фрэнк Герберт')).toBeInTheDocument()
  })

  it('reads «па-беларуску» and «кароткае» as filters, not as words', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), 'кароткае па-беларуску')
    const expected = LIBRARY.filter((b) => langsOf(b).includes('be') && b.pages != null && b.pages <= 200).length
    expect(spines()).toHaveLength(expected)
  })

  it('proposes books like the ones found, with the reasons, and opens one on click', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), 'толкін')
    expect(screen.getByText('Магчыма, вам падыдзе')).toBeInTheDocument()
    const proposed = screen.getAllByRole('button').filter((b) => b.classList.contains('suggest-item'))
    expect(proposed.length).toBeGreaterThan(0)
    expect(proposed.length).toBeLessThanOrEqual(5)
    expect(proposed.every((el) => !/Толкін/.test(el.textContent))).toBe(true)
    expect(proposed[0].querySelector('.suggest-why').textContent).toMatch(/як «|жанр: /)
    await user.click(proposed[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('offers the partial matches when no book matches every word', async () => {
    const user = userEvent.setup()
    show()
    await user.type(search(), 'толкін вершы')
    expect(spines()).toHaveLength(0)
    expect(screen.getByText('Магчыма, вы шукалі')).toBeInTheDocument()
    const proposed = screen.getAllByRole('button').filter((b) => b.classList.contains('suggest-item'))
    expect(proposed.some((el) => /Толкін/.test(el.textContent))).toBe(true)
  })

  it('shows the genre on a card and the similar books under the note', async () => {
    const user = userEvent.setup()
    show()
    await user.click(spines().find((el) => /Дзюна/.test(el.textContent)))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('Жанр')).toBeInTheDocument()
    expect(within(dialog).getByText(/навуковая фантастыка/, { selector: 'dd' })).toBeInTheDocument()
    expect(within(dialog).getByText('Падобныя кнігі')).toBeInTheDocument()
    const similar = within(dialog).getAllByRole('button').filter((b) => b.classList.contains('suggest-item'))
    expect(similar.length).toBeGreaterThan(0)
    expect(similar.every((el) => !/Дзюна/.test(el.textContent))).toBe(true)
    await user.click(similar[0])
    expect(within(screen.getByRole('dialog')).queryByText('Дзюна', { selector: 'h2' })).not.toBeInTheDocument()
  })

  it('translates the chrome but keeps titles as printed on the English page', () => {
    show('en')
    expect(screen.getByRole('heading', { level: 2, name: /My library/ })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search: author, title, year, pages')).toBeInTheDocument()
    expect(screen.getByText('Сабакі Эўропы')).toBeInTheDocument()
    // the wanted captions: two volumes of the Lord of the Rings and the Hobbit
    expect(screen.getAllByText('J. R. R. Tolkien')).toHaveLength(3)
  })
})

describe('books page: housekeeping', () => {

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
    const rail = /\.cover-rail \{[^}]*\}/.exec(css)[0]
    expect(rail).toMatch(/overflow-x: auto/)
    expect(rail).toMatch(/padding: \d+px \d+px \d+px/)
  })
})

// Every library book has a cover now, so the stand-in is exercised on the component itself.
describe('cover view without an image', () => {
  it('shows the typeset stand-in instead of a broken picture', () => {
    render(
      <MemoryRouter>
        <CoverView
          fallback={<div className="cover-typeset">Кніга без вокладкі</div>}
          overline="Аўтар"
          title="Кніга без вокладкі"
          labels={{ close: 'Зачыніць', prev: 'Назад', next: 'Далей' }}
          position={1}
          total={1}
          onClose={() => {}}
          onStep={() => {}}
        />
      </MemoryRouter>
    )
    const view = screen.getByRole('dialog')
    expect(within(view).queryByRole('img')).not.toBeInTheDocument()
    expect(view.querySelector('.cover-typeset')).toHaveTextContent('Кніга без вокладкі')
  })
})

describe('books page: card links', () => {
  it('opens the card named in the address', () => {
    show('be', '/books?book=orwell-1984')
    const view = screen.getByRole('dialog')
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent('1984')
  })

  it('opens a wanted book from the address and walks the wanted list', async () => {
    const user = userEvent.setup()
    show('be', '/books?book=lotr-two-towers')
    expect(screen.getByRole('dialog')).toHaveTextContent(`2 / ${WANTED.length}`)
    await user.keyboard('{ArrowRight}')
    expect(within(screen.getByRole('dialog')).getByRole('heading', { level: 2 })).toHaveTextContent('Вяртаньне караля')
  })

  it('ignores an id that is not a book', () => {
    show('be', '/books?book=no-such-book')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('offers a share button that copies the card address', async () => {
    const user = userEvent.setup()
    const written = []
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: (t) => (written.push(t), Promise.resolve()) } })
    show()
    await user.click(spines().find((el) => within(el).queryByText('1984')))
    await user.click(screen.getByRole('button', { name: /Падзяліцца/ }))
    expect(written).toHaveLength(1)
    expect(new URL(written[0]).searchParams.get('book')).toBe('orwell-1984')
    expect(screen.getByText('Спасылка скапіяваная')).toBeInTheDocument()
  })
})
