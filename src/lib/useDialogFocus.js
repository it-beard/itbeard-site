import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'

// Keeps the keyboard inside an open dialog. Focus moves onto the dialog when it opens,
// Tab and Shift+Tab walk its controls in a circle, and closing hands focus back to
// whatever opened it (the tile, the link in the text). Put the returned ref on the
// dialog element and give that element tabIndex={-1}.
export function useDialogFocus() {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const opener = document.activeElement
    dialog.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const items = Array.from(dialog.querySelectorAll(FOCUSABLE))
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const at = document.activeElement
      const outside = !dialog.contains(at) || at === dialog
      if (e.shiftKey ? outside || at === items[0] : outside || at === items.at(-1)) {
        e.preventDefault()
        ;(e.shiftKey ? items.at(-1) : items[0]).focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (opener instanceof HTMLElement && opener !== document.body && opener.isConnected) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [])

  return ref
}
