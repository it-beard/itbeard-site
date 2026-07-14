import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import { ARCHIVE_PROJECTS } from '../data/site'

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
        <Md className="prose intro" html={intro.html} />
      </section>

      <section className="container section">
        <div className="cards">
          {ARCHIVE_PROJECTS.map((p) => {
            const card = intro.subs.find((s) => s.id === p.id)
            if (!card) return null
            return (
              <div key={p.id} className="card card-archived">
                <span className="badge">
                  {shared.labels.closedIn} {p.closed}
                </span>
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                </div>
                <div className="card-body prose" dangerouslySetInnerHTML={{ __html: card.html }} />
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
