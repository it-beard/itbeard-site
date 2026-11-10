import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Keeps the id of the open card in a query parameter (`?book=…`, `?record=…`), so a card
// can be shared by its address: opening the link opens the card, closing it clears the
// parameter. The history gets one entry per opened card and none for anything else:
//   - opening a card from the page adds an entry, so the browser's Back closes it;
//   - walking from card to card replaces that entry;
//   - closing a card opened from the page steps back onto the page's own entry, and
//     closing one that came by a link replaces the entry — either way Back then
//     leaves the page instead of opening the card again;
//   - asking for what the address already says does nothing.
// Returns [openId, setOpenId]; `setOpenId(null)` closes.
export function useCardLink(param) {
  const location = useLocation()
  const navigate = useNavigate()
  const fromUrl = new URLSearchParams(location.search).get(param)
  const [openId, setState] = useState(fromUrl)

  // the address is the source of truth: Back/Forward and pasted links land here
  useEffect(() => setState(fromUrl), [fromUrl])

  // the callback reads the address as it is at the moment of the call
  const here = useRef(location)
  here.current = location

  const setOpenId = useCallback(
    (id) => {
      const { search, state } = here.current
      const params = new URLSearchParams(search)
      const current = params.get(param)
      if ((id ?? null) === current) return

      if (id) {
        params.set(param, id)
        // `openedHere` marks the entry of a card opened from the page itself
        const options = current ? { replace: true, state } : { state: { ...state, openedHere: param } }
        navigate({ search: `?${params}` }, options)
      } else if (state?.openedHere === param) {
        navigate(-1)
      } else {
        params.delete(param)
        const qs = params.toString()
        navigate({ search: qs ? `?${qs}` : '' }, { replace: true })
      }
      setState(id)
    },
    [navigate, param]
  )

  return [openId, setOpenId]
}

// The address to share for a card: the current page with only the card's parameter,
// so the reader gets the card and not the sender's filters.
export const cardUrl = (param, id) => {
  const url = new URL(window.location.href)
  url.search = ''
  url.searchParams.set(param, id)
  return url.toString()
}
