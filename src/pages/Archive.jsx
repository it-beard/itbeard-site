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

  return (
    <main>
      <section className="container section page-head">
        <h1>{intro.title}</h1>
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
      </section>

      <section className="container section">
        <div className="cards">
          {ARCHIVE_PROJECTS.map((p) => {
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
                  </div>
                </div>
                <Md className="card-body prose" html={card.html} />
                <div className="card-foot">
                  <span className="card-closed" title={p.dormant ? page.dormantHint : shared.labels.closedInHint}>
                    {p.dormant ? page.dormantLabel : `${shared.labels.closedIn} ${p.closed}`}
                  </span>
                  <span className="card-duration" title={shared.labels.durationHint}>
                    {formatDuration((p.closed ?? NOW) - p.started, shared.labels)}
                  </span>
                </div>
              </CardTag>
            )
          })}
        </div>
      </section>
    </main>
  )
}
