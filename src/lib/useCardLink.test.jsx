import { afterEach, describe, expect, it } from 'vitest'
import { act, cleanup, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useCardLink } from './useCardLink'

// The hook under a real browser history, so the entries it leaves can be counted.
let card
function Probe() {
  const [openId, setOpenId] = useCardLink('book')
  card = { openId, setOpenId }
  return <p>{openId ?? 'closed'}</p>
}
const show = (address) => {
  window.history.pushState(null, '', address)
  return render(
    <BrowserRouter>
      <Probe />
    </BrowserRouter>
  )
}
const set = (id) => act(() => card.setOpenId(id))
// history.back() reports asynchronously
const settle = () => act(() => new Promise((done) => setTimeout(done, 20)))

afterEach(cleanup)

describe('useCardLink', () => {
  it('opens the card named in the address', () => {
    show('/books?book=dune')
    expect(card.openId).toBe('dune')
  })

  it('adds one history entry for a card opened from the page, however many cards are walked', () => {
    show('/books')
    const before = window.history.length
    set('dune')
    expect(window.location.search).toBe('?book=dune')
    set('road')
    set('martian')
    expect(window.location.search).toBe('?book=martian')
    expect(window.history.length).toBe(before + 1)
  })

  it('goes back to the page when such a card is closed, so Back does not open it again', async () => {
    show('/books?tag=sf')
    const before = window.history.length
    set('dune')
    set(null)
    await settle()
    expect(card.openId).toBeNull()
    expect(window.location.search).toBe('?tag=sf')
    expect(window.history.length).toBe(before + 1) // the entry is still there, ahead of us, for Forward
    set('road')
    expect(window.history.length).toBe(before + 1) // and the next card takes its place
  })

  it('leaves no entry behind when a card that came by a link is closed', () => {
    show('/books?book=dune')
    const before = window.history.length
    set(null)
    expect(window.location.search).toBe('')
    expect(card.openId).toBeNull()
    expect(window.history.length).toBe(before)
  })

  it('does not touch the history when there is nothing to change', () => {
    show('/vinyl')
    const before = window.history.length
    set(null)
    set(null)
    expect(window.history.length).toBe(before)
  })
})
