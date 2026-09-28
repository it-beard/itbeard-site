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
// the shelf as the page shows it by default: by year, oldest first
const byYear = [...VINYL].sort((a, b) => (a.year ?? Infinity) - (b.year ?? Infinity) || compareText(a.title, b.title, 'be'))
const oldest = byYear[0]

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

  it('stands the shelf by year, oldest first, and by title on request', async () => {
    const user = userEvent.setup()
    show()
    const year = screen.getByRole('button', { name: 'Па годзе' })
    const title = screen.getByRole('button', { name: 'Па назьве' })
    expect(year).toHaveAttribute('aria-pressed', 'true')
    expect(title).toHaveAttribute('aria-pressed', 'false')
    expect(titlesShown()).toEqual(byYear.map((r) => r.title))

    await user.click(title)
    expect(title).toHaveAttribute('aria-pressed', 'true')
    expect(year).toHaveAttribute('aria-pressed', 'false')
    expect(titlesShown()).toEqual([...VINYL].sort((a, b) => compareText(a.title, b.title, 'be')).map((r) => r.title))

    await user.click(year)
    expect(titlesShown()).toEqual(byYear.map((r) => r.title))
  })

  it('keeps the chosen order inside a filter, and walks the card in that order', async () => {
    const user = userEvent.setup()
    show()
    await user.click(screen.getByRole('button', { name: 'Па назьве' }))
    await user.click(chip('Рок'))
    const rock = VINYL.filter((r) => r.tags.includes('rock')).sort((a, b) => compareText(a.title, b.title, 'be'))
    expect(titlesShown()).toEqual(rock.map((r) => r.title))
    await user.click(sleeves()[0])
    await user.keyboard('{ArrowRight}')
    expect(within(screen.getByRole('dialog')).getByRole('heading', { level: 2 })).toHaveTextContent(rock[1].title)
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
