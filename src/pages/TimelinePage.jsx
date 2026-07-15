import { useLang } from '../lib/LangContext'
import { getPage, md, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'

const NOW = new Date().getFullYear()

// Horizontal gantt of jobs («Гады ў адным паглядзе»), experience only.
// Rows come from timeline entries that declare a numeric `start`.
function OverviewPanel({ overview, entries }) {
  const jobs = entries.filter((e) => e.start)
  if (jobs.length === 0) return null

  const minYear = Math.min(...jobs.map((j) => j.start))
  const span = Math.max(1, NOW - minYear)
  const pos = (year) => ((year - minYear) / span) * 100

  const ticks = []
  for (let year = minYear; year < NOW - 2; year += 5) {
    ticks.push({ label: String(year), left: pos(year) })
  }
  ticks.push({ label: overview.now, left: 100 })

  return (
    <div className="overview">
      <p className="overview-title">{overview.title}</p>
      <div className="overview-grid">
        <div className="overview-labels">
          {jobs.map((j, i) => (
            <div key={i} className="overview-label">
              {j.label ?? j.title}
            </div>
          ))}
          <div className="overview-pad"></div>
        </div>
        <div className="overview-chart">
          {ticks.map((t, i) => (
            <span key={i} className="overview-tick-line" style={{ left: `${t.left}%` }} aria-hidden="true"></span>
          ))}
          {jobs.map((j, i) => {
            const left = pos(j.start)
            const width = Math.max(3, pos(j.end ?? NOW) - left)
            return (
              <div key={i} className="overview-row">
                <div
                  className={`overview-bar${j.end ? '' : ' ongoing'}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                ></div>
              </div>
            )
          })}
          <div className="overview-pad">
            {ticks.map((t, i) => (
              <span key={i} className="overview-tick-label" style={{ left: `${t.left}%` }}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TimelinePage({ name }) {
  const { lang } = useLang()
  const page = getPage(name, lang)
  useTitle(page.title)

  // ongoing jobs first, then newest start first; undated entries last
  const entries = [...page.timeline].sort((a, b) => {
    const ongoing = (e) => (e.start && !e.end ? 1 : 0)
    if (ongoing(a) !== ongoing(b)) return ongoing(b) - ongoing(a)
    return (b.start ?? -1) - (a.start ?? -1)
  })

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.heading}</h1>
        <Ornament />
        <Md className="prose intro" html={md(page.intro)} />
        {page.overview && <OverviewPanel overview={page.overview} entries={entries} />}
      </section>

      <section className="container section">
        <ol className="timeline">
          {entries.map((item, i) => (
            <li key={i} className={`timeline-item${item.start && !item.end ? ' ongoing' : ''}`}>
              <div className="timeline-mark" aria-hidden="true">
                <span className="timeline-gem"></span>
              </div>
              <div className={`timeline-card${item.founded ? ' founded' : ''}`}>
                <div className="timeline-head">
                  {item.logo && <img src={item.logo} alt="" loading="lazy" />}
                  <div className="timeline-title">
                    <span className="timeline-period">{item.period}</span>
                    <h3>
                      {item.link && !item.org ? (
                        <a href={item.link} target="_blank" rel="noopener">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {item.org && (
                      <p className="timeline-org">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener">
                            {item.org}
                          </a>
                        ) : (
                          item.org
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: mdInline(item.description) }}
                />
                {item.founded && <span className="badge badge-corner">{page.foundedLabel}</span>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
