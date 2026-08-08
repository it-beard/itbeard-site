import { useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import { ARCHIVE_PROJECTS } from '../data/site'

// «5 гадоў»: 1 год / 2–4 гады / інакш гадоў, respecting 11–14
function formatDuration(years, labels) {
  if (years < 1) return labels.lessThanYear
  const mod10 = years % 10
  const mod100 = years % 100
  if (mod10 === 1 && mod100 !== 11) return `${years} ${labels.yearOne}`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${years} ${labels.yearFew}`
  return `${years} ${labels.yearMany}`
}

const NOW = new Date().getFullYear()

// `lang` is a single code or an array for multilingual projects
const langsOf = (p) => (Array.isArray(p.lang) ? p.lang : p.lang ? [p.lang] : [])

export default function Archive() {
  const { lang } = useLang()
  const page = getPage('archive', lang)
  const shared = getPage('shared', lang)
  useTitle(page.title, page.description)

  const intro = getSection(page, 'intro')

  const total = ARCHIVE_PROJECTS.length
  const dormantCount = ARCHIVE_PROJECTS.filter((p) => p.dormant).length
  const counterHint = page.counterHint
    .replace('{total}', total)
    .replace('{closed}', total - dormantCount)
    .replace('{dormant}', dormantCount)

  const [filter, setFilter] = useState('all')
  const [langFilter, setLangFilter] = useState('all')
  const typeCount = (type) =>
    type === 'all' ? total : ARCHIVE_PROJECTS.filter((p) => p.types?.includes(type)).length
  const langCount = (code) =>
    code === 'all' ? total : ARCHIVE_PROJECTS.filter((p) => langsOf(p).includes(code)).length
  // language chips in the shared-labels order, only for languages present in the archive
  const archiveLangs = Object.keys(shared.labels.langNames).filter((code) => langCount(code) > 0)
  const shown = ARCHIVE_PROJECTS.filter(
    (p) =>
      (filter === 'all' || p.types?.includes(filter)) &&
      (langFilter === 'all' || langsOf(p).includes(langFilter))
  )

  return (
    <main>
      <section className="container section page-head">
        <h1>
          {intro.title}{' '}
          <sup className="pahost-count" title={counterHint}>
            ({total})
          </sup>
        </h1>
        <Ornament />
        <Md className="prose intro" html={intro.html} />
        <ul className="archive-legend">
          <li>
            <span className="legend-gem" aria-hidden="true"></span> {page.legend.closed}
          </li>
          <li>
            <span className="legend-gem legend-gem-dormant" aria-hidden="true"></span> {page.legend.dormant}
          </li>
        </ul>
        <div className="filter-chips" role="group" aria-label={page.filtersLabel}>
          {Object.keys(page.filters).map((type) => (
            <button
              key={type}
              type="button"
              className="filter-chip"
              aria-pressed={filter === type}
              onClick={() => setFilter(filter === type ? 'all' : type)}
            >
              {page.filters[type]} <span className="chip-count">{typeCount(type)}</span>
            </button>
          ))}
        </div>
        <div className="filter-chips filter-chips-langs" role="group" aria-label={page.langFiltersLabel}>
          {archiveLangs.map((code) => (
            <button
              key={code}
              type="button"
              className="filter-chip"
              aria-pressed={langFilter === code}
              onClick={() => setLangFilter(langFilter === code ? 'all' : code)}
            >
              {shared.labels.langNames[code]} <span className="chip-count">{langCount(code)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container section">
        <div key={`${filter}-${langFilter}`} className="cards cards-fade">
          {shown.map((p) => {
            const card = intro.subs.find((s) => s.id === p.id)
            if (!card) return null
            const CardTag = p.url ? 'a' : 'div'
            const linkProps = p.url ? { href: p.url, target: '_blank', rel: 'noopener' } : {}
            return (
              <CardTag key={p.id} id={p.id} {...linkProps} className={`card card-archived${p.dormant ? ' card-dormant' : ''}`}>
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <div className="card-title">
                    <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                    <span className="range-chip" title={shared.labels.sinceHint}>
                      {shared.labels.since} {p.started}
                    </span>
                    {langsOf(p).map((code) => (
                      <span
                        key={code}
                        className="badge badge-static badge-lang"
                        title={`${shared.labels.langHint}: ${shared.labels.langNames[code]}`}
                      >
                        {shared.labels.langCodes[code]}
                      </span>
                    ))}
                  </div>
                </div>
                <Md className="card-body prose" html={card.html} />
                <div className="card-foot">
                  <span className="card-closed" title={p.dormant ? page.dormantHint : shared.labels.closedInHint}>
                    {p.dormant ? page.dormantLabel : `${shared.labels.closedIn} ${p.closed}`}
                  </span>
                  {!p.hideDuration && (
                    <span className="card-duration" title={shared.labels.durationHint}>
                      {formatDuration((p.closed ?? NOW) - p.started, shared.labels)}
                    </span>
                  )}
                </div>
              </CardTag>
            )
          })}
        </div>
      </section>
    </main>
  )
}
