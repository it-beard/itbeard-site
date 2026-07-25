import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// Reusable image lightbox: dimmed backdrop, framed image, optional caption.
// Closes on backdrop click, the ✕ button, or the Escape key.
// Render it with a truthy `src` to open; it renders nothing otherwise.
export default function Lightbox({ src, alt = '', caption, onClose }) {
  useEffect(() => {
    if (!src) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [src, onClose])

  if (!src) return null

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={caption || alt} onClick={onClose}>
      <figure className="lightbox-body" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <img src={src} alt={alt} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>,
    document.body
  )
}
