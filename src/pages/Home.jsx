import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import { PROJECTS } from '../data/site'

export default function Home() {
  const { lang } = useLang()
  const page = getPage('index', lang)
  const shared = getPage('shared', lang)
  useTitle(page.title)

  const projects = getSection(page, 'projects')

  return (
    <main>
      <section className="hero container">
        <div className="hero-text">
          <p className="hero-greeting">{page.hero.greeting}</p>
          <h1>{page.hero.name}</h1>
          <p className="hero-tagline">{page.hero.tagline}</p>
          <p className="hero-fact">{page.hero.fact}</p>
          <nav className="social hero-social">
            <a href="https://telegram.me/iamitbeard" target="_blank" rel="noopener" className="telegram" title="Telegram">
              <i className="fab fa-brands fa-telegram-plane"></i>
            </a>
            <a href="https://wa.me/itbeard" target="_blank" rel="noopener" className="whatsapp" title="WhatsApp">
              <i className="fab fa-brands fa-whatsapp"></i>
            </a>
            <a href="mailto:iamitbeard@gmail.com" target="_blank" rel="noopener" className="email" title="Email">
              <i className="fab fa fa-at"></i>
            </a>
            <a href="https://www.linkedin.com/in/akartynnik" target="_blank" rel="noopener" className="linkedin" title="LinkedIn">
              <i className="fab fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/itbeard" target="_blank" rel="noopener" className="github" title="GitHub">
              <i className="fab fa-brands fa-github"></i>
            </a>
          </nav>
          <div className="hero-actions">
            <Link to="/honor" className="btn btn-primary">
              {page.hero.toProjects}
            </Link>
            <Link to="/support" className="btn btn-secondary">
              {shared.footer.support}
            </Link>
          </div>
        </div>
        <div className="hero-photo">
          <img src="/images/itbeard-funny.jpg" alt={page.hero.name} />
        </div>
      </section>

      <section id="projects" className="container section">
        <h2>{projects.title}</h2>
        <Ornament />
        <div className="cards">
          {PROJECTS.map((p) => {
            const card = projects.subs.find((s) => s.id === p.id)
            if (!card) return null
            return (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener"
                className={`card${p.commercial ? ' card-commercial' : ''}`}
              >
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                </div>
                <div className="card-body prose" dangerouslySetInnerHTML={{ __html: card.html }} />
                <div className="card-foot">
                  <span className="since-chip" title={shared.labels.sinceHint}>
                    {shared.labels.since} {p.started}
                  </span>
                  {p.commercial && (
                    <span className="badge badge-static badge-commercial" title={shared.labels.commercialHint}>
                      {shared.labels.commercial}
                    </span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
