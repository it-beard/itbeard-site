import { useCallback, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { LANGS, getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import CoverRail from '../components/CoverRail'
import { LANG_ORDER, LIBRARY, WANTED, langsOf } from '../data/books'
import { CONCEPT_KINDS, buildIndex, search, similarBooks } from '../lib/bookSearch'
import { cardUrl, useCardLink } from '../lib/useCardLink'

// «Хронікі Нарніі · частка 1» — or the subtitle of a book that stands outside any series
const seriesLine = (book, labels) =>
  book.series ? `${book.series} · ${labels.part} ${book.part}` : book.subtitle

// The credit line on a spine: the author, plus the series unless the title already names it
const spineCredit = (b) =>
  [b.author, b.series && !b.title.includes(b.series) && b.series].filter(Boolean).join(' · ')

// The search index: the books, their profiles through the concept dictionary (its
// words plus the labels of both languages) and the notes in both languages. It does
// not depend on the reader's language, so it is built once.
let INDEX = null
const libraryIndex = () => {
  if (!INDEX) {
    const pages = LANGS.map((l) => getPage('books', l))
    const notes = LANGS.map((l) => getSection(getPage('library', l), 'notes').subs)
    const concepts = Object.fromEntries(
      Object.entries(pages[0].concepts).map(([key, c]) => [key, { aka: [...c.aka, ...pages.map((p) => p.concepts[key].label)] }])
    )
    INDEX = buildIndex(LIBRARY, {
      concepts,
      notesOf: (id) => notes.map((subs) => subs.find((s) => s.id === id)?.html).filter(Boolean),
    })
  }
  return INDEX
}

// a small cover, or the spine colours when the edition has no cover file
const BookThumb = ({ book }) =>
  book.image ? (
    <img className="book-thumb" src={book.image} alt="" width="44" height="66" loading="lazy" />
  ) : (
    <span className="book-thumb book-thumb-blank" style={{ '--spine': book.spine, '--ink': book.ink }} aria-hidden="true" />
  )

export default function Books() {
  const { lang } = useLang()
  const page = getPage('books', lang)
  const shared = getPage('shared', lang)
  useTitle(page.title, page.description)

  const intro = getSection(page, 'intro')
  const wanted = getSection(page, 'wanted')
  const library = getSection(page, 'library')
  const noteOf = (id) => wanted.subs.find((s) => s.id === id)?.html
  const detailsOf = (id) => page.details?.[id] ?? {}

  const libraryNotes = getSection(getPage('library', lang), 'notes').subs
  const libraryNoteOf = (id) => libraryNotes.find((s) => s.id === id)?.html

  // ----- the open card lives in the address (?book=id), so it can be shared
  const [openId, setOpenId] = useCardLink('book')

  // ----- library: free-text search plus subject and language chips
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')
  const [bookLang, setBookLang] = useState('all')

  const total = LIBRARY.length
  const tagCount = (t) => (t === 'all' ? total : LIBRARY.filter((b) => b.tags.includes(t)).length)
  const langCount = (code) => LIBRARY.filter((b) => langsOf(b).includes(code)).length
  // language chips in the order the library is sorted, only for languages present on the shelves
  const langs = LANG_ORDER.filter((code) => langCount(code) > 0)

  // «Беларуская, Польская» for a bilingual edition
  const langNamesOf = (b) =>
    langsOf(b)
      .map((code) => shared.labels.langNames[code])
      .join(', ')

  // the chips narrow the shelf; the box goes to the search, which reads words, numbers
  // and phrases like «па-беларуску» and also proposes books beside the ones found
  const searchIndex = libraryIndex()
  const { shelf: shown, suggestions } = search(searchIndex, query, {
    filter: (b) => (tag === 'all' || b.tags.includes(tag)) && (bookLang === 'all' || langsOf(b).includes(bookLang)),
  })

  // «жанр: касьмічная опера» — why a proposed book is proposed, in the reader's language
  const conceptLabel = (key) => page.concepts[key]?.label ?? key
  const describe = (r) => {
    if (r.kind === 'like') return page.labels.likeBook.replace('{title}', r.text)
    const what = CONCEPT_KINDS.includes(r.kind) ? conceptLabel(r.key) : r.kind === 'subject' ? page.filters[r.key] : r.text
    return `${page.kinds[r.kind]}: ${what}`
  }
  const genresOf = (b) => (b.genre ?? []).map(conceptLabel).join(', ')
  const proposals = (items) => (
    <ul className="suggest-list">
      {items.map(({ book: b, reasons }) => (
        <li key={b.id}>
          <button type="button" className="suggest-item" onClick={() => setOpenId(b.id)}>
            <BookThumb book={b} />
            <span className="suggest-text">
              <span className="suggest-title">{b.title}</span>
              {b.author && <span className="suggest-author">{b.author}</span>}
              {reasons.length > 0 && <span className="suggest-why">{reasons.map(describe).join(' · ')}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
  const filtered = tag !== 'all' || bookLang !== 'all' || query.trim() !== ''
  const reset = () => {
    setQuery('')
    setTag('all')
    setBookLang('all')
  }

  // the card walks the list it was opened from — the wanted strip, or the library as
  // currently filtered (a shared link to a book the filters hide falls back to the
  // whole library) — and wraps around, so the arrows never dead-end
  const inWanted = WANTED.some((b) => b.id === openId)
  const openList = inWanted ? WANTED : shown.some((b) => b.id === openId) ? shown : LIBRARY
  const index = openId ? openList.findIndex((b) => b.id === openId) : -1
  const open = index >= 0 ? { list: inWanted ? 'wanted' : 'library', index } : null
  const step = useCallback(
    (delta) => setOpenId(openList[(index + delta + openList.length) % openList.length].id),
    [openList, index, setOpenId]
  )
  const close = useCallback(() => setOpenId(null), [setOpenId])
  const book = open ? openList[open.index] : null
  const details = book && open.list === 'wanted' ? detailsOf(book.id) : null
  const similar = book && open.list === 'library' ? similarBooks(searchIndex, book.id) : []

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
        <Ornament />
        <Md className="prose intro book-lead" html={wanted.html} />
        <CoverRail labels={page.labels} tall>
          {WANTED.map((b, index) => (
            <button
              key={b.id}
              type="button"
              className="book-item"
              title={page.labels.openHint}
              onClick={() => setOpenId(b.id)}
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
                {seriesLine(b, page.labels) && <span className="cover-sub">{seriesLine(b, page.labels)}</span>}
              </span>
            </button>
          ))}
        </CoverRail>
      </section>

      <section className="container section">
        <h2>
          {library.title}{' '}
          <sup className="pahost-count" title={page.libraryHint.replace('{total}', total)}>
            ({total})
          </sup>
        </h2>
        <Ornament />

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
            {shown.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  className={`spine spine-${b.size}`}
                  style={{ '--spine': b.spine, '--ink': b.ink }}
                  onClick={() => setOpenId(b.id)}
                >
                  <span className="spine-text">
                    {spineCredit(b) && <span className="spine-author">{spineCredit(b)}</span>}
                    <span className="spine-title">{b.title}</span>
                  </span>
                  <span className="spine-lang" title={langNamesOf(b)}>
                    {langsOf(b)
                      .map((code) => shared.labels.langCodes[code])
                      .join(' · ')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {suggestions.length > 0 && (
          <div className="library-suggest">
            <p className="library-suggest-title">{shown.length > 0 ? page.labels.suggest : page.labels.didYouMean}</p>
            {proposals(suggestions)}
          </div>
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
            [page.labels.pages, book.pages],
            [page.labels.printRun, book.printRun && `${book.printRun} ${page.labels.copies}`],
            [page.labels.isbn, book.isbn],
          ]}
          note={noteOf(book.id)}
          labels={page.labels}
          position={open.index + 1}
          total={openList.length}
          shareUrl={cardUrl('book', book.id)}
          onClose={close}
          onStep={step}
        >
          <p className="cover-source">
            {seriesLine(book, page.labels) && <span>{seriesLine(book, page.labels)}</span>}
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
            [page.labels.language, langNamesOf(book)],
            [page.labels.genre, genresOf(book)],
            [page.labels.isbn, book.isbn],
          ]}
          note={libraryNoteOf(book.id)}
          labels={{ ...page.labels, prev: page.labels.prevOnShelf, next: page.labels.nextOnShelf }}
          position={open.index + 1}
          total={openList.length}
          shareUrl={cardUrl('book', book.id)}
          onClose={close}
          onStep={step}
        >
          {book.series && (
            <p className="cover-source">
              <span>{seriesLine(book, page.labels)}</span>
            </p>
          )}
          {similar.length > 0 && (
            <div className="cover-similar">
              <p className="cover-similar-title">{page.labels.similar}</p>
              {proposals(similar)}
            </div>
          )}
        </CoverView>
      )}
    </main>
  )
}
