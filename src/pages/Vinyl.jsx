import { useCallback, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import { useNoIndex } from '../lib/useNoIndex'
import { VINYL } from '../data/site'

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
              <span className="cover-cap">
                <span className="cover-overline">{artistOf(r)}</span>
                <span className="cover-title">{r.title}</span>
                {r.year && <span className="cover-sub">{r.year}</span>}
              </span>
            </button>
          ))}
        </div>
        {shown.length === 0 && <p className="cover-empty">{page.labels.empty}</p>}
      </section>

      {active !== null && shown[active] && (
        <CoverView
          image={shown[active].image}
          overline={artistOf(shown[active])}
          title={shown[active].title}
          facts={[
            [page.labels.year, shown[active].year],
            [page.labels.label, shown[active].label],
            [page.labels.catno, shown[active].catno],
          ]}
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
