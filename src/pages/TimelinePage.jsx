import { useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, mdText } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'

const TODAY = new Date()
const NOW = TODAY.getFullYear()
// fractional "now" so ongoing bars reach the actual current month
const NOW_F = NOW + TODAY.getMonth() / 12

// month-precise fractional years (startMonth/endMonth are optional 1–12)
const startOf = (e) => e.start + ((e.startMonth ?? 1) - 1) / 12
const endOf = (e) => (e.end ? e.end + (e.endMonth ?? 12) / 12 : NOW_F)

// Horizontal gantt of jobs («Гады ў адным паглядзе»), experience only.
// Rows come from timeline entries that declare a numeric `start`.
function OverviewPanel({ overview, entries }) {
  const [hot, setHot] = useState(null)
  // idx keeps the entry's position in the sorted list, to jump to its card
  const jobs = entries.map((e, idx) => ({ ...e, idx })).filter((e) => e.start)
  if (jobs.length === 0) return null

  const jumpTo = (j) => {
    const item = document.getElementById(`tl-${j.idx}`)
    if (!item) return
    item.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const card = item.querySelector('.timeline-card')
    if (card) {
      card.classList.remove('flash')
      void card.offsetWidth // restart the animation on repeated clicks
      card.classList.add('flash')
      setTimeout(() => card.classList.remove('flash'), 1700)
    }
  }

  const minYear = Math.floor(Math.min(...jobs.map(startOf)))
  const span = Math.max(1, NOW_F - minYear)
  const pos = (t) => ((t - minYear) / span) * 100

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
            <div
              key={i}
              className={`overview-label${hot === i ? ' hot' : ''}`}
              onMouseEnter={() => setHot(i)}
              onMouseLeave={() => setHot(null)}
              onClick={() => jumpTo(j)}
            >
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
            const left = pos(startOf(j))
            const width = Math.max(3, pos(endOf(j)) - left)
            const tipLeft = Math.min(88, Math.max(12, left + width / 2))
            return (
              <div
                key={i}
                className={`overview-row${hot === i ? ' hot' : ''}`}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onClick={() => jumpTo(j)}
              >
                <div
                  className={`overview-bar${j.end ? '' : ' ongoing'}`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                ></div>
                {hot === i && (
                  <div className="overview-tip" style={{ left: `${tipLeft}%` }}>
                    {j.label ?? j.title} · {j.period}
                  </div>
                )}
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
    const key = (e) => (e.start ? startOf(e) : -1)
    return key(b) - key(a)
  })

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.heading}</h1>
        <Ornament />
        <Md className="prose intro" html={mdText(page.intro)} />
      </section>

      <section className="container section">
        <ol className={`timeline${page.overview ? ' has-tail' : ''}`}>
          {entries.map((item, i) => (
            <li key={i} id={`tl-${i}`} className={`timeline-item${item.start && !item.end ? ' ongoing' : ''}`}>
              <div className="timeline-mark" aria-hidden="true">
                <span className="timeline-gem"></span>
              </div>
              <div className={`timeline-card${item.founded ? ' founded' : ''}`}>
                <div className="timeline-head">
                  {item.logo && <img src={item.logo} alt="" loading="lazy" />}
                  <div className="timeline-title">
                    <span className="timeline-period" title={page.periodHint}>
                      {item.period}
                    </span>
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
                <Md className="prose" html={mdText(item.description)} />
                {item.founded && (
                  <span className="badge badge-corner" title={page.foundedHint}>
                    {page.foundedLabel}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
        {page.overview && (
          <div className="timeline-tail">
            <OverviewPanel overview={page.overview} entries={entries} />
          </div>
        )}
      </section>
    </main>
  )
}
