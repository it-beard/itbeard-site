import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import { ARCHIVE_PROJECTS } from '../data/site'

// «5 гадоў»: 1 год / 2–4 гады / інакш гадоў, respecting 11–14
function formatDuration(years, labels) {
  const mod10 = years % 10
  const mod100 = years % 100
  if (mod10 === 1 && mod100 !== 11) return `${years} ${labels.yearOne}`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${years} ${labels.yearFew}`
  return `${years} ${labels.yearMany}`
}

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
      </section>

      <section className="container section">
        <div className="cards">
          {ARCHIVE_PROJECTS.map((p) => {
            const card = intro.subs.find((s) => s.id === p.id)
            if (!card) return null
            return (
              <div key={p.id} className="card card-archived">
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <div className="card-title">
                    <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                    <span className="range-chip">
                      {p.started} — {p.closed}
                    </span>
                  </div>
                </div>
                <div className="card-body prose" dangerouslySetInnerHTML={{ __html: card.html }} />
                <div className="card-foot">
                  <span className="card-duration">{formatDuration(p.closed - p.started, shared.labels)}</span>
                  <span>
                    {shared.labels.closedIn} {p.closed}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
