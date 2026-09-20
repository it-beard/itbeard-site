import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import { VINYL } from '../data/site'

// The page is unlisted: no nav entry, no sitemap row. A noindex tag keeps it out
// of search results for anyone who stumbles on the URL anyway.
function useNoIndex() {
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [])
}

// Full-screen sleeve view: cover on the left, facts and the note on the right.
// Arrow keys and the footer buttons walk the currently filtered list.
function SleeveView({ record, artist, note, labels, position, total, onClose, onStep }) {
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

  const full = `${artist} — ${record.title}`
  const facts = [
    [labels.year, record.year],
    [labels.label, record.label],
    [labels.catno, record.catno],
  ].filter(([, value]) => value)

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={full} onClick={onClose}>
      <figure className="lightbox-body vinyl-view" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" aria-label={labels.close} onClick={onClose}>
          ✕
        </button>
        <img src={record.image} alt={full} />
        <figcaption className="vinyl-view-info">
          <p className="vinyl-artist">{artist}</p>
          <h2 className="vinyl-view-title">{record.title}</h2>
          <Ornament small />
          {facts.length > 0 && (
            <dl className="vinyl-facts">
              {facts.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {note && <Md className="prose vinyl-note" html={note} />}
          <div className="vinyl-steps">
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
    </div>,
    document.body
  )
}

export default function Vinyl() {
  const { lang } = useLang()
  const page = getPage('vinyl', lang)
  useTitle(page.title, page.description)
  useNoIndex()

  const intro = getSection(page, 'intro')
  const noteOf = (id) => intro.subs.find((s) => s.id === id)?.html
  // Cyrillic sleeve credits get a transliteration on the English page
  const artistOf = (r) => page.artists?.[r.id] ?? r.artist

  const total = VINYL.length
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const tagCount = (tag) => (tag === 'all' ? total : VINYL.filter((r) => r.tags.includes(tag)).length)
  const shown = VINYL.filter((r) => filter === 'all' || r.tags.includes(filter))

  const pick = (tag) => {
    setFilter(filter === tag ? 'all' : tag)
    setActive(null)
  }
  // wraps around, so the arrows never dead-end
  const step = useCallback((delta) => setActive((i) => (i + delta + shown.length) % shown.length), [shown.length])

  return (
    <main>
      <section className="container section page-head">
        <h1>
          {intro.title}{' '}
          <sup className="pahost-count" title={page.counterHint.replace('{total}', total)}>
            ({total})
          </sup>
        </h1>
        <Ornament />
        <Md className="prose intro" html={intro.html} />
        <div className="filter-chips" role="group" aria-label={page.filtersLabel}>
          {Object.keys(page.filters).map((tag) => (
            <button
              key={tag}
              type="button"
              className="filter-chip"
              aria-pressed={filter === tag}
              onClick={() => pick(tag)}
            >
              {page.filters[tag]} <span className="chip-count">{tagCount(tag)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container section">
        <div key={filter} className="vinyl-grid cards-fade">
          {shown.map((r, i) => (
            <button
              key={r.id}
              type="button"
              className="vinyl-item"
              title={page.labels.openHint}
              onClick={() => setActive(i)}
            >
              <span className="vinyl-sleeve">
                <span className="vinyl-disc" aria-hidden="true" />
                <img src={r.image} alt="" width="600" height="600" loading="lazy" />
              </span>
              <span className="vinyl-cap">
                <span className="vinyl-artist">{artistOf(r)}</span>
                <span className="vinyl-title">{r.title}</span>
                {r.year && <span className="vinyl-year">{r.year}</span>}
              </span>
            </button>
          ))}
        </div>
        {shown.length === 0 && <p className="vinyl-empty">{page.labels.empty}</p>}
      </section>

      {active !== null && shown[active] && (
        <SleeveView
          record={shown[active]}
          artist={artistOf(shown[active])}
          note={noteOf(shown[active].id)}
          labels={page.labels}
          position={active + 1}
          total={shown.length}
          onClose={() => setActive(null)}
          onStep={step}
        />
      )}
    </main>
  )
}
