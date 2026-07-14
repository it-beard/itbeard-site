import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import { PROJECTS } from '../data/site'

export default function Home() {
  const { lang } = useLang()
  const page = getPage('index', lang)
  useTitle(page.title)

  const about = getSection(page, 'about')
  const projects = getSection(page, 'projects')

  return (
    <main>
      <section className="hero container">
        <div className="hero-text">
          <p className="hero-greeting">{page.hero.greeting}</p>
          <h1>{page.hero.name}</h1>
          <p className="hero-tagline">{page.hero.tagline}</p>
          <div className="hero-actions">
            <Link to="/support" className="btn btn-primary">
              {page.hero.ctaSupport}
            </Link>
            <Link to="/experience" className="btn btn-ghost">
              {page.hero.ctaExperience}
            </Link>
          </div>
        </div>
        <div className="hero-photo">
          <img src="/images/itbeard-300.jpg" alt={page.hero.name} />
        </div>
      </section>

      <section id="about" className="container section">
        <h2>{about.title}</h2>
        <Md className="prose" html={about.html} />
      </section>

      <section id="projects" className="container section">
        <h2>{projects.title}</h2>
        <div className="cards">
          {PROJECTS.map((p) => {
            const card = projects.subs.find((s) => s.id === p.id)
            if (!card) return null
            return (
              <a key={p.id} href={p.url} target="_blank" rel="noopener" className="card">
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                </div>
                <div className="card-body prose" dangerouslySetInnerHTML={{ __html: card.html }} />
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
