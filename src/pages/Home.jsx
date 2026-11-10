import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage, getSection, mdInline, mdText, plural, startYear, startTooltip } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import SocialLinks from '../components/SocialLinks'
import { PROJECTS, ARCHIVE_PROJECTS } from '../data/site'

export default function Home() {
  const { lang } = useLang()
  const page = getPage('index', lang)
  const shared = getPage('shared', lang)
  useTitle(page.title, page.description)

  const projects = getSection(page, 'projects')

  const total = PROJECTS.length
  const counterHint = page.counterHint
    .replace('{total}', total)
    .replace('{commercial}', PROJECTS.filter((p) => p.commercial).length)
  // «25 гісторый» — number + noun in the right form
  const archived = ARCHIVE_PROJECTS.length
  const pahostHtml = mdText(page.pahost.text.replace('{stories}', `${archived} ${plural(archived, page.pahost.stories)}`))
  // touch press flips the hero photo (hover emulation for mobile)
  const [flipped, setFlipped] = useState(false)

  return (
    <main>
      <section className="hero container">
        <div className="hero-text">
          <p className="hero-greeting">{page.hero.greeting}</p>
          <h1>{page.hero.name}</h1>
          <p className="hero-tagline">{page.hero.tagline}</p>
          <SocialLinks className="hero-social" ids={['telegram', 'whatsapp', 'mastodon', 'instagram', 'linkedin', 'github', 'email']} />
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
            <img className="coin-front" src="/images/lex-portrait.webp" alt={page.hero.name} />
            <img className="coin-back" src="/images/itbeard-funny.webp" alt="" />
          </div>
        </div>
      </section>

      <section id="projects" className="container section">
        <h2>
          {projects.title}{' '}
          <sup className="pahost-count" title={counterHint}>
            ({total})
          </sup>
        </h2>
        <Ornament />
        <div className="cards">
          {PROJECTS.map((p) => {
            const card = projects.subs.find((s) => s.id === p.id)
            if (!card) return null
            return (
              <div key={p.id} className={`card card-linked${p.commercial ? ' card-commercial' : ''}`}>
                <a
                  className="card-cover"
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={card.title.replace(/\*\*/g, '')}
                ></a>
                <div className="card-head">
                  <img src={p.image} alt="" loading="lazy" />
                  <h3 dangerouslySetInnerHTML={{ __html: mdInline(card.title) }} />
                </div>
                <Md className="card-body prose" html={card.html} />
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
              </div>
            )
          })}
        </div>

        {/* invitation to the pahost — where finished and slow-burning projects rest */}
        <aside className="pahost-teaser">
          <Ornament />
          <Md className="pahost-teaser-text prose" html={pahostHtml} />
          <Link to="/archive" className="btn btn-secondary pahost-teaser-btn">
            {page.pahost.link} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </section>
    </main>
  )
}
