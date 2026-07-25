import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline, startYear, startTooltip } from '../lib/content'
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
  // touch press flips the hero photo (hover emulation for mobile)
  const [flipped, setFlipped] = useState(false)

  return (
    <main>
      <section className="hero container">
        <div className="hero-text">
          <p className="hero-greeting">{page.hero.greeting}</p>
          <h1>{page.hero.name}</h1>
          <p className="hero-tagline">{page.hero.tagline}</p>
          <nav className="social hero-social">
            <a href="https://telegram.me/iamitbeard" target="_blank" rel="noopener" className="telegram" title="Telegram">
              <i className="fab fa-brands fa-telegram-plane"></i>
            </a>
            <a href="https://wa.me/itbeard" target="_blank" rel="noopener" className="whatsapp" title="WhatsApp">
              <i className="fab fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://vkl.world/@itbeard" target="_blank" rel="noopener" className="mastodon" title="Mastodon">
              <i className="fab fa-brands fa-mastodon"></i>
            </a>
            <a href="https://www.linkedin.com/in/akartynnik" target="_blank" rel="noopener" className="linkedin" title="LinkedIn">
              <i className="fab fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/itbeard" target="_blank" rel="noopener" className="github" title="GitHub">
              <i className="fab fa-brands fa-github"></i>
            </a>
            <a href="mailto:iamitbeard@gmail.com" target="_blank" rel="noopener" className="email" title="Email">
              <i className="fab fa fa-at"></i>
            </a>
          </nav>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-primary">
              {page.hero.toProjects}
            </Link>
            <Link to="/support" className="btn btn-secondary">
              {shared.footer.support}
            </Link>
          </div>
        </div>
        <div
          className={`hero-photo${flipped ? ' flipped' : ''}`}
          onTouchStart={() => setFlipped(true)}
          onTouchEnd={() => setFlipped(false)}
          onTouchCancel={() => setFlipped(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="photo-coin">
            <img className="coin-front" src="/images/lex-linkedin.jpg" alt={page.hero.name} />
            <img className="coin-back" src="/images/itbeard-funny.jpg" alt="" />
          </div>
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
                  <span className="since-chip" title={startTooltip(p.started, lang, shared.labels)}>
                    {shared.labels.since} {startYear(p.started)}
                  </span>
                  <div className="card-foot-badges">
                    {p.commercial && (
                      <span className="badge badge-static badge-commercial" title={shared.labels.commercialHint}>
                        {shared.labels.commercial}
                      </span>
                    )}
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
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
