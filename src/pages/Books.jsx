import { useCallback, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { useNoIndex } from '../lib/useNoIndex'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import { BOOKS } from '../data/site'

// «Хронікі Нарніі · частка 1»
const seriesLine = (book, labels) => `${book.series} · ${labels.part} ${book.part}`

export default function Books() {
  const { lang } = useLang()
  const page = getPage('books', lang)
  useTitle(page.title, page.description)
  useNoIndex()

  const intro = getSection(page, 'intro')
  const noteOf = (id) => intro.subs.find((s) => s.id === id)?.html
  const detailsOf = (id) => page.details?.[id] ?? {}

  const total = BOOKS.length
  const [active, setActive] = useState(null)
  // wraps around, so the arrows never dead-end
  const step = useCallback((delta) => setActive((i) => (i + delta + total) % total), [total])

  const book = active !== null ? BOOKS[active] : null
  const details = book ? detailsOf(book.id) : null

  return (
    <main>
      <section className="container section page-head">
        <h1>
          {intro.title}{' '}
          <sup className="pahost-count" title={page.counterHint.replace('{total}', total)}>
            ({total})
          </sup>
        </h1>
        <Ornament />
        <Md className="prose intro" html={intro.html} />
      </section>

      <section className="container section">
        <div className="book-grid">
          {BOOKS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              className="book-item"
              title={page.labels.openHint}
              onClick={() => setActive(i)}
            >
              <span className="book-cover">
                <span className="book-pages" aria-hidden="true" />
                <span className="book-front">
                  <img src={b.image} alt="" width="400" height="625" loading="lazy" />
                </span>
              </span>
              <span className="cover-cap">
                <span className="cover-overline">{detailsOf(b.id).author}</span>
                <span className="cover-title">{b.title}</span>
                <span className="cover-sub">{seriesLine(b, page.labels)}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {book && (
        <CoverView
          portrait
          image={book.image}
          overline={details.author}
          title={book.title}
          facts={[
            [page.labels.year, book.year],
            [page.labels.translator, details.translator],
            [page.labels.publisher, details.publisher],
            [page.labels.printRun, book.printRun && `${book.printRun} ${page.labels.copies}`],
            [page.labels.isbn, book.isbn],
          ]}
          note={noteOf(book.id)}
          labels={page.labels}
          position={active + 1}
          total={total}
          onClose={() => setActive(null)}
          onStep={step}
        >
          <p className="cover-source">
            <span>{seriesLine(book, page.labels)}</span>
            {book.url && (
              <a href={book.url} target="_blank" rel="noopener">
                {page.labels.source} ↗
              </a>
            )}
          </p>
        </CoverView>
      )}
    </main>
  )
}
