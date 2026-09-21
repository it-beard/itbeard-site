import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Md from '../lib/Md'
import Ornament from './Ornament'

// Full-screen view of one item from a cover gallery (records, books): the cover
// on the left, facts and the note on the right. Arrow keys and the footer
// buttons walk the list; `onStep` receives -1 / +1. `facts` is a list of
// [term, value] pairs — empty values are skipped. `children` land under the note.
// Without an `image`, the `fallback` node (a typeset cover) takes its place.
export default function CoverView({
  image,
  fallback,
  overline,
  title,
  facts = [],
  note,
  labels,
  position,
  total,
  portrait = false,
  onClose,
  onStep,
  children,
}) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onStep(-1)
      else if (e.key === 'ArrowRight') onStep(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onStep])

  const full = `${overline} — ${title}`
  const shownFacts = facts.filter(([, value]) => value)

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={full} onClick={onClose}>
      <div
        className={`lightbox-body cover-view${portrait ? ' cover-view-portrait' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="lightbox-close" aria-label={labels.close} onClick={onClose}>
          ✕
        </button>
        {/* the figure scrolls on short screens; the frame around it must not clip,
            or the ✕ that hangs off its corner gets cut */}
        <figure className="cover-view-scroll">
          {image ? <img src={image} alt={full} /> : fallback}
          <figcaption className="cover-view-info">
            {/* on phones this block is the column beside the cover; the note runs full width below */}
            <div className="cover-view-head">
              <p className="cover-overline">{overline}</p>
              <h2 className="cover-view-title">{title}</h2>
              <Ornament />
              {shownFacts.length > 0 && (
                <dl className="cover-facts">
                  {shownFacts.map(([term, value]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            {note && <Md className="prose cover-note" html={note} />}
            {children}
            <div className="cover-steps">
              <button type="button" aria-label={labels.prev} onClick={() => onStep(-1)}>
                ‹
              </button>
              <span>
                {position} / {total}
              </span>
              <button type="button" aria-label={labels.next} onClick={() => onStep(1)}>
                ›
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>,
    document.body,
  )
}
