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

export default function Archive() {
  const { lang } = useLang()
  const page = getPage('archive', lang)
  const shared = getPage('shared', lang)
  useTitle(page.title)

  const intro = getSection(page, 'intro')

  const total = ARCHIVE_PROJECTS.length
  const dormantCount = ARCHIVE_PROJECTS.filter((p) => p.dormant).length
  const counterHint = page.counterHint
    .replace('{total}', total)
    .replace('{closed}', total - dormantCount)
    .replace('{dormant}', dormantCount)

  const [filter, setFilter] = useState('all')
  const typeCount = (type) =>
    type === 'all' ? total : ARCHIVE_PROJECTS.filter((p) => p.types?.includes(type)).length
  const shown = filter === 'all' ? ARCHIVE_PROJECTS : ARCHIVE_PROJECTS.filter((p) => p.types?.includes(filter))

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
      </section>

      <section className="container section">
        <div key={filter} className="cards cards-fade">
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
                    {p.lang && (
                      <span
                        className="badge badge-static badge-lang"
                        title={`${shared.labels.langHint}: ${shared.labels.langNames[p.lang]}`}
                      >
                        {shared.labels.langCodes[p.lang]}
                      </span>
                    )}
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
