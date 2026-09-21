import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { useNoIndex } from '../lib/useNoIndex'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import { LIBRARY, WANTED } from '../data/books'

// «Хронікі Нарніі · частка 1»
const seriesLine = (book, labels) => `${book.series} · ${labels.part} ${book.part}`

// The credit line on a spine: the author, plus the series unless the title already names it
const spineCredit = (b) =>
  [b.author, b.series && !b.title.includes(b.series) && b.series].filter(Boolean).join(' · ')

// Search ignores case and the letters people routinely swap when typing Belarusian
const fold = (text) => text.toLowerCase().replace(/ё/g, 'е').replace(/ў/g, 'у').replace(/[’'`]/g, '')
const haystack = (b) => fold([b.author, b.title, b.series].filter(Boolean).join(' '))

// Horizontal strip of wanted books. Each arrow shows only while there is
// something left to scroll to on its side.
function WantedRail({ books, labels, detailsOf, onOpen }) {
  const rail = useRef(null)
  const [edges, setEdges] = useState({ prev: false, next: false })

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    setEdges({
      prev: el.scrollLeft > 4,
      next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, books.length])

  const scroll = (dir) => {
    const el = rail.current
    const card = el.querySelector('.book-item')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 200) + 34), behavior: 'smooth' })
  }

  return (
    <div className="book-rail-wrap">
      <div className="book-rail" ref={rail} onScroll={measure}>
        {books.map((b, i) => (
          <button key={b.id} type="button" className="book-item" title={labels.openHint} onClick={() => onOpen(i)}>
            <span className="book-cover">
              <span className="book-pages" aria-hidden="true" />
              <span className="book-front">
                <img src={b.image} alt="" width="400" height="625" loading="lazy" />
              </span>
            </span>
            <span className="cover-cap">
              <span className="cover-overline">{detailsOf(b.id).author}</span>
              <span className="cover-title">{b.title}</span>
              <span className="cover-sub">{seriesLine(b, labels)}</span>
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="book-rail-arrow book-rail-prev"
        aria-label={labels.scrollPrev}
        hidden={!edges.prev}
        onClick={() => scroll(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="book-rail-arrow book-rail-next"
        aria-label={labels.scrollNext}
        hidden={!edges.next}
        onClick={() => scroll(1)}
      >
        ›
      </button>
    </div>
  )
}

export default function Books() {
  const { lang } = useLang()
  const page = getPage('books', lang)
  const shared = getPage('shared', lang)
  useTitle(page.title, page.description)
  useNoIndex()

  const intro = getSection(page, 'intro')
  const wanted = getSection(page, 'wanted')
  const library = getSection(page, 'library')
  const noteOf = (id) => wanted.subs.find((s) => s.id === id)?.html
  const detailsOf = (id) => page.details?.[id] ?? {}

  const libraryNotes = getSection(getPage('library', lang), 'notes').subs
  const libraryNoteOf = (id) => libraryNotes.find((s) => s.id === id)?.html

  // ----- the open card: which list it came from, and the position in that list
  const [open, setOpen] = useState(null)

  // ----- library: free-text search plus subject and language chips
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')
  const [bookLang, setBookLang] = useState('all')

  const total = LIBRARY.length
  const tagCount = (t) => (t === 'all' ? total : LIBRARY.filter((b) => b.tags.includes(t)).length)
  const langCount = (code) => LIBRARY.filter((b) => b.lang === code).length
  // language chips in the shared-labels order, only for languages present on the shelves
  const langs = Object.keys(shared.labels.langNames).filter((code) => langCount(code) > 0)

  const needle = fold(query.trim())
  const shown = LIBRARY.filter(
    (b) =>
      (tag === 'all' || b.tags.includes(tag)) &&
      (bookLang === 'all' || b.lang === bookLang) &&
      (!needle || haystack(b).includes(needle))
  )
  const filtered = tag !== 'all' || bookLang !== 'all' || needle
  const reset = () => {
    setQuery('')
    setTag('all')
    setBookLang('all')
  }

  // the card walks the list it was opened from — the library one as currently filtered —
  // and wraps around, so the arrows never dead-end
  const openList = open?.list === 'wanted' ? WANTED : shown
  const step = useCallback(
    (delta) => setOpen((o) => o && { ...o, index: (o.index + delta + openList.length) % openList.length }),
    [openList.length]
  )
  const close = useCallback(() => setOpen(null), [])
  const book = open ? openList[open.index] : null
  const details = book && open.list === 'wanted' ? detailsOf(book.id) : null

  return (
    <main>
      <section className="container section page-head">
        <h1>{intro.title}</h1>
        <Ornament />
        <Md className="prose intro" html={intro.html} />
      </section>

      <section className="container section">
        <h2>
          {wanted.title}{' '}
          <sup className="pahost-count" title={page.wantedHint.replace('{total}', WANTED.length)}>
            ({WANTED.length})
          </sup>
        </h2>
        <Ornament small />
        <Md className="prose intro book-lead" html={wanted.html} />
        <WantedRail
          books={WANTED}
          labels={page.labels}
          detailsOf={detailsOf}
          onOpen={(index) => setOpen({ list: 'wanted', index })}
        />
      </section>

      <section className="container section">
        <h2>
          {library.title}{' '}
          <sup className="pahost-count" title={page.libraryHint.replace('{total}', total)}>
            ({total})
          </sup>
        </h2>
        <Ornament small />
        <Md className="prose intro book-lead" html={library.html} />

        <div className="library-search">
          <i className="fas fa-search" aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder={page.labels.search}
            aria-label={page.labels.search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-chips" role="group" aria-label={page.filtersLabel}>
          {Object.keys(page.filters).map((t) => (
            <button
              key={t}
              type="button"
              className="filter-chip"
              aria-pressed={tag === t}
              onClick={() => setTag(tag === t ? 'all' : t)}
            >
              {page.filters[t]} <span className="chip-count">{tagCount(t)}</span>
            </button>
          ))}
        </div>
        <div className="filter-chips filter-chips-langs" role="group" aria-label={page.langFiltersLabel}>
          {langs.map((code) => (
            <button
              key={code}
              type="button"
              className="filter-chip"
              aria-pressed={bookLang === code}
              onClick={() => setBookLang(bookLang === code ? 'all' : code)}
            >
              {shared.labels.langNames[code]} <span className="chip-count">{langCount(code)}</span>
            </button>
          ))}
        </div>

        <p className="library-found" aria-live="polite">
          {page.labels.found.replace('{shown}', shown.length).replace('{total}', total)}
          {filtered && (
            <button type="button" className="library-reset" onClick={reset}>
              {page.labels.reset}
            </button>
          )}
        </p>

        {shown.length === 0 ? (
          <p className="cover-empty">{page.labels.empty}</p>
        ) : (
          <ul key={`${tag}-${bookLang}`} className="spines cards-fade">
            {shown.map((b, index) => (
              <li key={b.id}>
                <button
                  type="button"
                  className={`spine spine-${b.size}`}
                  style={{ '--spine': b.spine, '--ink': b.ink }}
                  onClick={() => setOpen({ list: 'library', index })}
                >
                  <span className="spine-text">
                    {spineCredit(b) && <span className="spine-author">{spineCredit(b)}</span>}
                    <span className="spine-title">{b.title}</span>
                  </span>
                  <span className="spine-lang" title={shared.labels.langNames[b.lang]}>
                    {shared.labels.langCodes[b.lang]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {book && open.list === 'wanted' && (
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
          position={open.index + 1}
          total={openList.length}
          onClose={close}
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

      {book && open.list === 'library' && (
        <CoverView
          portrait
          image={book.image}
          fallback={
            <div className="cover-typeset" style={{ '--spine': book.spine, '--ink': book.ink }} aria-hidden="true">
              <span>{book.author}</span>
              <strong>{book.title}</strong>
            </div>
          }
          overline={book.author || book.series || shared.labels.langNames[book.lang]}
          title={book.title}
          facts={[
            [page.labels.year, book.year],
            [page.labels.translator, book.translator],
            [page.labels.publisher, [book.publisher, book.city].filter(Boolean).join(', ')],
            [page.labels.pages, book.pages],
            [page.labels.language, shared.labels.langNames[book.lang]],
            [page.labels.isbn, book.isbn],
          ]}
          note={libraryNoteOf(book.id)}
          labels={{ ...page.labels, prev: page.labels.prevOnShelf, next: page.labels.nextOnShelf }}
          position={open.index + 1}
          total={openList.length}
          onClose={close}
          onStep={step}
        >
          {book.series && (
            <p className="cover-source">
              <span>{seriesLine(book, page.labels)}</span>
            </p>
          )}
        </CoverView>
      )}
    </main>
  )
}
