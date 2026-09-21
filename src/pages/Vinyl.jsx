import { useCallback, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import CoverRail from '../components/CoverRail'
import { VINYL, WANTED_VINYL } from '../data/site'

export default function Vinyl() {
  const { lang } = useLang()
  const page = getPage('vinyl', lang)
  useTitle(page.title, page.description)

  const intro = getSection(page, 'intro')
  const wanted = getSection(page, 'wanted')
  const collection = getSection(page, 'collection')
  const noteOf = (id) => [...wanted.subs, ...collection.subs].find((s) => s.id === id)?.html
  // Cyrillic sleeve credits get a transliteration on the English page
  const artistOf = (r) => page.artists?.[r.id] ?? r.artist

  const total = VINYL.length
  const [filter, setFilter] = useState('all')
  // the open card: an index into the list it was opened from
  const [active, setActive] = useState(null)
  const [fromWanted, setFromWanted] = useState(false)

  const tagCount = (tag) => (tag === 'all' ? total : VINYL.filter((r) => r.tags.includes(tag)).length)
  const shown = VINYL.filter((r) => filter === 'all' || r.tags.includes(filter))

  const pick = (tag) => {
    setFilter(filter === tag ? 'all' : tag)
    setActive(null)
  }
  // wraps around, so the arrows never dead-end
  const list = fromWanted ? WANTED_VINYL : shown
  const step = useCallback((delta) => setActive((i) => (i + delta + list.length) % list.length), [list.length])
  const openFrom = (wantedList, index) => {
    setFromWanted(wantedList)
    setActive(index)
  }
  const record = active !== null ? list[active] : null

  const tile = (r, onClick) => (
    <button key={r.id} type="button" className="vinyl-item" title={page.labels.openHint} onClick={onClick}>
      <span className="vinyl-sleeve">
        <span className={`vinyl-disc${r.disc ? ` vinyl-disc-${r.disc}` : ''}`} aria-hidden="true" />
        <img src={r.image} alt="" width="600" height="600" loading="lazy" />
      </span>
      <span className="cover-cap">
        <span className="cover-overline">{artistOf(r)}</span>
        <span className="cover-title">{r.title}</span>
        {r.year && <span className="cover-sub">{r.year}</span>}
      </span>
    </button>
  )

  return (
    <main>
      <section className="container section page-head">
        <h1>{intro.title}</h1>
        <Ornament />
        <Md className="prose intro" html={intro.html} />
      </section>

      <section className="container section">
        <h2>
          {wanted.title}{' '}
          <sup className="pahost-count" title={page.wantedHint.replace('{total}', WANTED_VINYL.length)}>
            ({WANTED_VINYL.length})
          </sup>
        </h2>
        <Ornament small />
        <Md className="prose intro book-lead" html={wanted.html} />
        <CoverRail labels={page.labels}>{WANTED_VINYL.map((r, i) => tile(r, () => openFrom(true, i)))}</CoverRail>
      </section>

      <section className="container section">
        <h2>
          {collection.title}{' '}
          <sup className="pahost-count" title={page.counterHint.replace('{total}', total)}>
            ({total})
          </sup>
        </h2>
        <Ornament small />
        <Md className="prose intro book-lead" html={collection.html} />
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
        <div key={filter} className="vinyl-grid cards-fade vinyl-grid-spaced">
          {shown.map((r, i) => tile(r, () => openFrom(false, i)))}
        </div>
        {shown.length === 0 && <p className="cover-empty">{page.labels.empty}</p>}
      </section>

      {record && (
        <CoverView
          image={record.image}
          overline={artistOf(record)}
          title={record.title}
          facts={[
            [page.labels.year, record.year],
            [page.labels.label, record.label],
            [page.labels.catno, record.catno],
            [page.labels.format, record.format],
          ]}
          note={noteOf(record.id)}
          labels={page.labels}
          position={active + 1}
          total={list.length}
          onClose={() => setActive(null)}
          onStep={step}
        >
          {record.url && (
            <p className="cover-source">
              <a href={record.url} target="_blank" rel="noopener">
                {page.labels.shop} ↗
              </a>
            </p>
          )}
        </CoverView>
      )}
    </main>
  )
}
