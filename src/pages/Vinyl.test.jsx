import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { VINYL, WANTED_VINYL } from '../data/site'
import { compareText } from '../data/books'
import Vinyl from './Vinyl'

const ROOT = resolve(import.meta.dirname, '../..')

function show(lang = 'be', path = '/vinyl') {
  localStorage.setItem('siteLang', lang)
  return render(
    <LangProvider>
      <MemoryRouter initialEntries={[path]}>
        <Vinyl />
      </MemoryRouter>
    </LangProvider>
  )
}

// every sleeve is a button whose accessible name starts with the artist
const tiles = () => screen.getAllByRole('button').filter((b) => b.classList.contains('vinyl-item'))
const sleeves = () => tiles().filter((b) => !b.closest('.cover-rail'))
const wantedSleeves = () => tiles().filter((b) => b.closest('.cover-rail'))
const chip = (name) => screen.getByRole('button', { name: new RegExp(`^${name}`) })
const titlesShown = () => sleeves().map((el) => el.querySelector('.cover-title').textContent)
const artistsShown = () => sleeves().map((el) => el.querySelector('.cover-overline').textContent)
const yearsShown = () => sleeves().map((el) => Number(el.querySelector('.cover-sub')?.textContent))
const option = (name) => screen.getByRole('button', { name: new RegExp(`^${name}`) })
const nonDecreasing = (xs) => xs.every((x, i) => i === 0 || xs[i - 1] <= x)
// the shelf as the page shows it by default: by year, oldest first
const oldest = [...VINYL].sort((a, b) => (a.year ?? Infinity) - (b.year ?? Infinity))[0]

beforeEach(() => localStorage.clear())
afterEach(cleanup)

describe('vinyl data', () => {
  it('has unique ids', () => {
    const ids = VINYL.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('ships a cover file for every record', () => {
    for (const r of VINYL) {
      expect(r.image).toBe(`/images/vinyl/${r.id}.webp`)
      expect(existsSync(resolve(ROOT, `public${r.image}`)), `missing cover for ${r.id}`).toBe(true)
    }
  })

  it('gives every record an artist, a title and at least one tag', () => {
    for (const r of VINYL) {
      expect(r.artist, r.id).toBeTruthy()
      expect(r.title, r.id).toBeTruthy()
      expect(r.tags.length, r.id).toBeGreaterThan(0)
    }
  })

  it('only uses tags that have a filter chip', () => {
    const chips = Object.keys(getPage('vinyl', 'be').filters)
    for (const r of VINYL) {
      for (const tag of r.tags) expect(chips, `${r.id} → ${tag}`).toContain(tag)
    }
  })

  it('has a note for every record in both languages', () => {
    for (const lang of ['be', 'en']) {
      const notes = getSection(getPage('vinyl', lang), 'collection').subs
      for (const r of VINYL) {
        const note = notes.find((s) => s.id === r.id)
        expect(note, `${r.id} has no ${lang} note`).toBeDefined()
        expect(note.html.trim().length, `${r.id} ${lang} note is empty`).toBeGreaterThan(0)
      }
    }
  })
})

describe('vinyl page', () => {
  it('renders every sleeve and counts them in the heading', () => {
    show()
    expect(sleeves()).toHaveLength(VINYL.length)
    expect(screen.getByRole('heading', { level: 2, name: /Мая калекцыя/ })).toHaveTextContent(`(${VINYL.length})`)
  })

  it('labels each sleeve with its artist and title', () => {
    show()
    const first = sleeves()[0]
    expect(within(first).getByText(oldest.title)).toBeInTheDocument()
    expect(first.querySelector('img')).toHaveAttribute('src', oldest.image)
  })

  it('stands the shelf by year, oldest first, and turns it around on a second press', async () => {
    const user = userEvent.setup()
    show()
    const year = option('Па годзе')
    expect(year).toHaveAttribute('aria-pressed', 'true')
    expect(year).toHaveAccessibleName('Па годзе: ад старых да новых')
    expect(option('Па гурце')).toHaveAttribute('aria-pressed', 'false')
    expect(nonDecreasing(yearsShown())).toBe(true)
    expect(titlesShown()[0]).toBe(oldest.title)

    await user.click(year)
    expect(year).toHaveAttribute('aria-pressed', 'true')
    expect(year).toHaveAccessibleName('Па годзе: ад новых да старых')
    expect(nonDecreasing([...yearsShown()].reverse())).toBe(true)
    expect(titlesShown().at(-1)).toBe(oldest.title)

    await user.click(year)
    expect(year).toHaveAccessibleName('Па годзе: ад старых да новых')
    expect(titlesShown()[0]).toBe(oldest.title)
  })

  it('files the records by artist — a person under the surname, a band without «The» — and by album within one', async () => {
    const user = userEvent.setup()
    show()
    await user.click(option('Па гурце'))
    expect(option('Па гурце')).toHaveAccessibleName('Па гурце: ад А да Я')
    expect(option('Па годзе')).toHaveAttribute('aria-pressed', 'false')
    const at = (artist) => artistsShown().indexOf(artist)
    // Cyrillic names open the Belarusian shelf, in alphabetical order
    expect(at('Лявон Вольскі')).toBeLessThan(at('Генадзь Гладкоў · Юры Энцін'))
    expect(at('Генадзь Гладкоў · Юры Энцін')).toBeLessThan(at('Песьняры'))
    expect(at('Песьняры')).toBeLessThan(at('Ludwig van Beethoven · Wilhelm Kempff'))
    // Beethoven under B, Brown under B after him, Ravel under R, Prodigy under P after Pink Floyd
    expect(at('Ludwig van Beethoven · Wilhelm Kempff')).toBeLessThan(at('James Brown'))
    expect(at('James Brown')).toBeLessThan(at('MEUTE'))
    expect(at('Pink Floyd')).toBeLessThan(at('The Prodigy'))
    expect(at('The Prodigy')).toBeLessThan(at('Maurice Ravel · Leonard Bernstein'))
    // the three Pink Floyd sleeves stand together, albums A to Z
    const floyd = titlesShown().filter((_, i) => artistsShown()[i] === 'Pink Floyd')
    expect(floyd).toEqual([...floyd].sort((a, b) => compareText(a, b, 'be')))

    await user.click(option('Па гурце'))
    expect(option('Па гурце')).toHaveAccessibleName('Па гурце: ад Я да А')
    expect(artistsShown()[0]).toBe('Maurice Ravel · Leonard Bernstein')
    expect(artistsShown().at(-1)).toBe('Лявон Вольскі')
    // the albums of one artist keep their order even when the shelf is turned around
    expect(titlesShown().filter((_, i) => artistsShown()[i] === 'Pink Floyd')).toEqual(floyd)

    // another order starts its default way up
    await user.click(option('Па годзе'))
    expect(option('Па годзе')).toHaveAccessibleName('Па годзе: ад старых да новых')
    expect(titlesShown()[0]).toBe(oldest.title)
  })

  it('sorts the English page by the transliterated names it shows', async () => {
    const user = userEvent.setup()
    show('en')
    await user.click(option('By artist'))
    const shown = artistsShown()
    expect(shown.indexOf('Gennady Gladkov · Yuri Entin')).toBeLessThan(shown.indexOf('Pesniary'))
    expect(shown.indexOf('Pesniary')).toBeLessThan(shown.indexOf('Lavon Volski'))
  })

  it('keeps the chosen order inside a filter, and walks the card in that order', async () => {
    const user = userEvent.setup()
    show()
    await user.click(option('Па гурце'))
    await user.click(option('Па гурце'))
    await user.click(chip('Рок'))
    const shown = titlesShown()
    expect(shown).toHaveLength(VINYL.filter((r) => r.tags.includes('rock')).length)
    expect(artistsShown()[0]).toBe('Pink Floyd')
    await user.click(sleeves()[0])
    await user.keyboard('{ArrowRight}')
    expect(within(screen.getByRole('dialog')).getByRole('heading', { level: 2 })).toHaveTextContent(shown[1])
  })

  it('transliterates Cyrillic credits on the English page', () => {
    show('en')
    expect(screen.getByText('Pesniary')).toBeInTheDocument()
    expect(screen.queryByText('Песьняры')).not.toBeInTheDocument()
  })

  it('narrows the grid to the chosen tag and back', async () => {
    const user = userEvent.setup()
    show()
    const expected = VINYL.filter((r) => r.tags.includes('classic')).length
    await user.click(chip('Класіка'))
    expect(sleeves()).toHaveLength(expected)
    await user.click(chip('Класіка'))
    expect(sleeves()).toHaveLength(VINYL.length)
  })

  it('opens a sleeve view with the facts and the note', async () => {
    const user = userEvent.setup()
    show()
    await user.click(sleeves()[0])
    const view = screen.getByRole('dialog')
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent(oldest.title)
    expect(within(view).getByText(String(oldest.year))).toBeInTheDocument()
    expect(within(view).getByText(oldest.catno)).toBeInTheDocument()
    expect(within(view).getByText(`1 / ${VINYL.length}`)).toBeInTheDocument()
  })

  it('steps through the collection with the arrow keys and wraps around', async () => {
    const user = userEvent.setup()
    show()
    await user.click(sleeves()[0])
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveTextContent(`2 / ${VINYL.length}`)
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveTextContent(`${VINYL.length} / ${VINYL.length}`)
  })

  it('steps only within the active filter', async () => {
    const user = userEvent.setup()
    show()
    await user.click(chip('Класіка'))
    await user.click(sleeves()[0])
    expect(screen.getByRole('dialog')).toHaveTextContent('1 / 2')
  })

  it('closes the sleeve view on Escape', async () => {
    const user = userEvent.setup()
    show()
    await user.click(sleeves()[0])
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

})

describe('vinyl page: wanted carousel', () => {
  it('ships a cover, a shop link and a note in both languages for every wanted record', () => {
    for (const r of WANTED_VINYL) {
      expect(existsSync(resolve(ROOT, `public${r.image}`)), `missing cover for ${r.id}`).toBe(true)
      expect(r.url, r.id).toMatch(/^https:\/\//)
      for (const lang of ['be', 'en']) {
        const note = getSection(getPage('vinyl', lang), 'wanted').subs.find((s) => s.id === r.id)
        expect(note?.html.trim(), `${r.id} has no ${lang} note`).toBeTruthy()
      }
    }
  })

  it('sits above the collection with its own counter', () => {
    show()
    const [wantedHead, collectionHead] = screen.getAllByRole('heading', { level: 2 })
    expect(wantedHead).toHaveTextContent(`Шукаю (${WANTED_VINYL.length})`)
    expect(wantedHead.compareDocumentPosition(collectionHead) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(wantedSleeves()).toHaveLength(WANTED_VINYL.length)
  })

  it('shows the wanted pressing with its own kind of record', () => {
    show()
    expect(wantedSleeves()[0].querySelector('.vinyl-disc')).toHaveClass('vinyl-disc-yolk')
    expect(sleeves()[0].querySelector('.vinyl-disc')).not.toHaveClass('vinyl-disc-yolk')
  })

  it('opens the wanted record with the reason it is wanted and a link to the shop', async () => {
    const user = userEvent.setup()
    show()
    await user.click(wantedSleeves()[0])
    const view = screen.getByRole('dialog')
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent('Выход в город')
    expect(view).toHaveTextContent('Вояджер-1')
    expect(view).toHaveTextContent(`1 / ${WANTED_VINYL.length}`)
    expect(within(view).getByRole('link', { name: /У краме/ })).toHaveAttribute('href', WANTED_VINYL[0].url)
  })

  it('keeps the two lists apart: a collection card has no shop link and counts the collection', async () => {
    const user = userEvent.setup()
    show()
    await user.click(sleeves()[0])
    const view = screen.getByRole('dialog')
    expect(view).toHaveTextContent(`1 / ${VINYL.length}`)
    expect(within(view).queryByRole('link', { name: /У краме/ })).not.toBeInTheDocument()
  })
})

describe('vinyl page: card links', () => {
  it('opens the record named in the address, from either list', () => {
    show('be', '/vinyl?record=pink-floyd-animals')
    expect(within(screen.getByRole('dialog')).getByRole('heading', { level: 2 })).toHaveTextContent('Animals')
    cleanup()
    show('be', `/vinyl?record=${WANTED_VINYL[0].id}`)
    expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${WANTED_VINYL.length}`)
  })

  it('shares the record address', async () => {
    const user = userEvent.setup()
    const written = []
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: (t) => (written.push(t), Promise.resolve()) } })
    show()
    await user.click(sleeves()[0])
    await user.click(screen.getByRole('button', { name: /Падзяліцца/ }))
    expect(new URL(written[0]).searchParams.get('record')).toBe(VINYL[0].id)
  })
})
