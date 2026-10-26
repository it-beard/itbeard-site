import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LangProvider } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { ARCHIVE_PROJECTS, PROJECTS, SITES } from '../data/site'
import Sites from './Sites'

function show(lang = 'be') {
  localStorage.setItem('siteLang', lang)
  return render(
    <LangProvider>
      <MemoryRouter initialEntries={['/sites']}>
        <Sites />
      </MemoryRouter>
    </LangProvider>
  )
}

beforeEach(() => localStorage.clear())
afterEach(cleanup)

describe('sites on itbeard.com', () => {
  it('are every project whose url sits on an itbeard.com subdomain, and nothing else', () => {
    const expected = [...PROJECTS, ...ARCHIVE_PROJECTS].filter((p) => /^https?:\/\/[^/]+\.itbeard\.com\//.test(p.url ?? ''))
    expect(SITES.map((p) => p.id)).toEqual(expected.map((p) => p.id))
    expect(SITES.length).toBeGreaterThan(0)
  })

  it('each get a short card: the cover opens the site, the foot leads to the full story', () => {
    show()
    const labels = getPage('sites', 'be').more
    const cards = document.querySelectorAll('.card-site')
    expect(cards).toHaveLength(SITES.length)
    SITES.forEach((p, i) => {
      const cover = cards[i].querySelector('a.card-cover')
      expect(cover).toHaveAttribute('href', p.url)
      expect(cover).toHaveAttribute('target', '_blank')
      expect(within(cards[i]).getByText(new URL(p.url).hostname)).toBeInTheDocument()
      expect(within(cards[i]).getByRole('link', { name: labels[p.page] })).toHaveAttribute('href', p.card)
      // only the first paragraph of the pahost card
      expect(cards[i].querySelectorAll('.card-body p')).toHaveLength(1)
    })
  })

  it('is translated', () => {
    show('en')
    expect(screen.getByRole('heading', { level: 1, name: 'Sites on itbeard.com' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'The full story in the pahost' })).toHaveLength(
      SITES.filter((p) => p.page === 'archive').length
    )
  })
})
