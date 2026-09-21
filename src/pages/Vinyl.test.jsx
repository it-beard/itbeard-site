import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { VINYL } from '../data/site'
import Vinyl from './Vinyl'

const ROOT = resolve(import.meta.dirname, '../..')

function show(lang = 'be') {
  localStorage.setItem('siteLang', lang)
  return render(
    <LangProvider>
      <MemoryRouter initialEntries={['/vinyl']}>
        <Vinyl />
      </MemoryRouter>
    </LangProvider>
  )
}

// every sleeve is a button whose accessible name starts with the artist
const sleeves = () => screen.getAllByRole('button').filter((b) => b.classList.contains('vinyl-item'))
const chip = (name) => screen.getByRole('button', { name: new RegExp(`^${name}`) })

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
      const notes = getSection(getPage('vinyl', lang), 'intro').subs
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
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`(${VINYL.length})`)
  })

  it('labels each sleeve with its artist and title', () => {
    show()
    const first = sleeves()[0]
    expect(within(first).getByText(VINYL[0].title)).toBeInTheDocument()
    expect(first.querySelector('img')).toHaveAttribute('src', VINYL[0].image)
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
    expect(within(view).getByRole('heading', { level: 2 })).toHaveTextContent(VINYL[0].title)
    expect(within(view).getByText(String(VINYL[0].year))).toBeInTheDocument()
    expect(within(view).getByText(VINYL[0].catno)).toBeInTheDocument()
    expect(within(view).getByText('1 / 12')).toBeInTheDocument()
  })

  it('steps through the collection with the arrow keys and wraps around', async () => {
    const user = userEvent.setup()
    show()
    await user.click(sleeves()[0])
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveTextContent('2 / 12')
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveTextContent('12 / 12')
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
