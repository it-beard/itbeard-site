import { useLang } from '../lib/LangContext'
import { getPage, md, mdInline } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import { TIMELINE_ICONS } from '../data/site'

export default function TimelinePage({ name }) {
  const { lang } = useLang()
  const page = getPage(name, lang)
  useTitle(page.title)

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.heading}</h1>
        <Md className="prose intro" html={md(page.intro)} />
      </section>

      <section className="container section">
        <ol className="timeline">
          {page.timeline.map((item, i) => (
            <li key={i} className={`timeline-item type-${item.type}`}>
              <div className="timeline-dot" aria-hidden="true">
                {TIMELINE_ICONS[item.type] ?? '•'}
              </div>
              <div className="timeline-card">
                <span className="timeline-period">{item.period}</span>
                <h3>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                {item.org && <p className="timeline-org">{item.org}</p>}
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: mdInline(item.description) }}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
