import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Keeps the id of the open card in a query parameter (`?book=…`, `?record=…`), so a card
// can be shared by its address: opening the link opens the card, closing it clears the
// parameter, and the browser's Back returns to the page as it was.
// Returns [openId, setOpenId]; `setOpenId(null)` closes.
export function useCardLink(param) {
  const { search } = useLocation()
  const navigate = useNavigate()
  const fromUrl = new URLSearchParams(search).get(param)
  const [openId, setState] = useState(fromUrl)

  // the address is the source of truth: Back/Forward and pasted links land here
  useEffect(() => setState(fromUrl), [fromUrl])

  const setOpenId = useCallback(
    (id) => {
      const params = new URLSearchParams(window.location.search)
      if (id) params.set(param, id)
      else params.delete(param)
      const qs = params.toString()
      navigate({ search: qs ? `?${qs}` : '' }, { replace: Boolean(id && fromUrl) })
      setState(id)
    },
    [navigate, param, fromUrl]
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
