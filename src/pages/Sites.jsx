import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import { SITES } from '../data/site'

// the first paragraph of a project card is its one-line summary
const firstParagraph = (html) => /<p>[\s\S]*?<\/p>/.exec(html)?.[0] ?? ''
const hostOf = (url) => new URL(url).hostname

// Short cards for everything that lives on itbeard.com subdomains. The card texts are
// the ones from the pahost (or the home page); the cover opens the site itself.
export default function Sites() {
  const { lang } = useLang()
  const page = getPage('sites', lang)
  useTitle(page.title, page.description)

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
          {SITES.map((p) => {
            const card = getSection(getPage(p.page, lang), p.section).subs.find((s) => s.id === p.id)
            if (!card) return null
            return (
              <div key={p.id} className="card card-linked card-site">
                <a
                  className="card-cover"
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={card.title.replace(/\*\*/g, '')}
                ></a>
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <div className="card-title">
                    <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                    <span className="site-host">{hostOf(p.url)}</span>
                  </div>
                </div>
                <Md className="card-body prose" html={firstParagraph(card.html)} />
                <div className="card-foot">
                  <Link to={p.card}>
                    {page.more[p.page]} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
