import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useDialogFocus } from '../lib/useDialogFocus'

// Reusable image lightbox: dimmed backdrop, framed image, optional caption.
// Closes on backdrop click, the ✕ button, or the Escape key. Mount it to open it;
// `closeLabel` names the ✕ for screen readers.
export default function Lightbox({ src, alt = '', caption, closeLabel = 'Close', onClose }) {
  const dialog = useDialogFocus()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={caption || alt}
      tabIndex={-1}
      ref={dialog}
      onClick={onClose}
    >
      <figure className="lightbox-body" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" aria-label={closeLabel} onClick={onClose}>
          ✕
        </button>
        <img src={src} alt={alt} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>,
    document.body
  )
}
