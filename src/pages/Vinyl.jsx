import { useCallback, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import CoverRail from '../components/CoverRail'
import { VINYL, WANTED_VINYL } from '../data/site'
import { compareText } from '../data/books'
import { cardUrl, useCardLink } from '../lib/useCardLink'

// What a record is filed under: a person by the surname of the first name on the
// sleeve, a band by its name without a leading «The».
const filedAs = (r, artist) => {
  const first = artist.split(' · ')[0].trim()
  return r.person ? first.split(' ').at(-1) : first.replace(/^The\s+/i, '')
}

// The shelf can stand by year or by artist, each way up. The direction flips only
// the main key: within one year the artists still read A to Z and a record without
// a year stays last; within one artist the albums keep their alphabetical order.
const SORTS = {
  year: (dir, lang, artistOf) => (a, b) =>
    (a.year == null) - (b.year == null) ||
    dir * ((a.year ?? 0) - (b.year ?? 0)) ||
    compareText(filedAs(a, artistOf(a)), filedAs(b, artistOf(b)), lang) ||
    compareText(a.title, b.title, lang),
  artist: (dir, lang, artistOf) => (a, b) =>
    dir * compareText(filedAs(a, artistOf(a)), filedAs(b, artistOf(b)), lang) || compareText(a.title, b.title, lang),
}

// a small arrow that points down the shelf: up for the default direction, turned for the reverse
const SortArrow = ({ reversed }) => (
  <svg className={`sort-arrow${reversed ? ' sort-arrow-reversed' : ''}`} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
    <path d="M6 10.5V1.5M2.5 5 6 1.5 9.5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Vinyl() {
  const { lang } = useLang()
  const page = getPage('vinyl', lang)
  useTitle(page.title, page.description)

  const intro = getSection(page, 'intro')
  const wanted = getSection(page, 'wanted')
  const collection = getSection(page, 'collection')
  const noteOf = (id) => [...wanted.subs, ...collection.subs].find((s) => s.id === id)?.html
  // Cyrillic sleeve credits get a transliteration on the English page
  const artistOf = (r) => page.artists?.[r.id] ?? r.artist

  const total = VINYL.length
  const [filter, setFilter] = useState('all')
  // the order of the shelf: which key, and 1 for the default direction or -1 for the reverse
  const [sort, setSort] = useState({ key: 'year', dir: 1 })
  // the open card lives in the address (?record=id), so it can be shared
  const [openId, setOpenId] = useCardLink('record')

  const tagCount = (tag) => (tag === 'all' ? total : VINYL.filter((r) => r.tags.includes(tag)).length)
  const ordered = [...VINYL].sort(SORTS[sort.key](sort.dir, lang, artistOf))
  const shown = ordered.filter((r) => filter === 'all' || r.tags.includes(filter))

  const pick = (tag) => {
    setFilter(filter === tag ? 'all' : tag)
    setOpenId(null)
  }
  // a second press on the active order turns it around; another order starts its default way up
  const order = (key) => setSort(sort.key === key ? { key, dir: -sort.dir } : { key, dir: 1 })
  // wraps around, so the arrows never dead-end
  // the card walks the list it was opened from (a shared link to a record the filter
  // hides falls back to the whole collection) and wraps around
  const list = WANTED_VINYL.some((r) => r.id === openId) ? WANTED_VINYL : shown.some((r) => r.id === openId) ? shown : ordered
  const active = openId ? list.findIndex((r) => r.id === openId) : -1
  const step = useCallback(
    (delta) => setOpenId(list[(active + delta + list.length) % list.length].id),
    [list, active, setOpenId]
  )
  const record = active >= 0 ? list[active] : null

  const tile = (r, onClick) => (
    <button key={r.id} type="button" className="vinyl-item" title={page.labels.openHint} onClick={onClick}>
      <span className="vinyl-sleeve">
        <span className={`vinyl-disc${r.disc ? ` vinyl-disc-${r.disc}` : ''}`} aria-hidden="true" />
        <img src={r.image} alt="" width="600" height="600" loading="lazy" />
      </span>
      <span className="cover-cap">
        <span className="cover-overline">{artistOf(r)}</span>
        <span className="cover-title">{r.title}</span>
        {r.year && <span className="cover-sub">{r.year}</span>}
      </span>
    </button>
  )

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
          <sup className="pahost-count" title={page.wantedHint.replace('{total}', WANTED_VINYL.length)}>
            ({WANTED_VINYL.length})
          </sup>
        </h2>
        <Ornament />
        <Md className="prose intro book-lead" html={wanted.html} />
        <CoverRail labels={page.labels}>{WANTED_VINYL.map((r) => tile(r, () => setOpenId(r.id)))}</CoverRail>
      </section>

      <section className="container section">
        <h2>
          {collection.title}{' '}
          <sup className="pahost-count" title={page.counterHint.replace('{total}', total)}>
            ({total})
          </sup>
        </h2>
        <Ornament />
        <div className="filter-row">
          <div className="filter-chips" role="group" aria-label={page.filtersLabel}>
            {Object.keys(page.filters).map((tag) => (
              <button
                key={tag}
                type="button"
                className="filter-chip"
                aria-pressed={filter === tag}
                onClick={() => pick(tag)}
              >
                {page.filters[tag]} <span className="chip-count">{tagCount(tag)}</span>
              </button>
            ))}
          </div>
          <div className="sort-switch" role="group" aria-label={page.sortLabel}>
            {Object.keys(page.sort).map((key) => {
              const active = sort.key === key
              const way = page.sort[key][active && sort.dir < 0 ? 'desc' : 'asc']
              return (
                <button
                  key={key}
                  type="button"
                  className="sort-option"
                  aria-pressed={active}
                  aria-label={`${page.sort[key].label}: ${way}`}
                  title={active ? page.sortFlipHint : way}
                  onClick={() => order(key)}
                >
                  {page.sort[key].label}
                  {active && <SortArrow reversed={sort.dir < 0} />}
                </button>
              )
            })}
          </div>
        </div>
        <div key={`${filter}-${sort.key}-${sort.dir}`} className="vinyl-grid cards-fade vinyl-grid-spaced">
          {shown.map((r) => tile(r, () => setOpenId(r.id)))}
        </div>
        {shown.length === 0 && <p className="cover-empty">{page.labels.empty}</p>}
      </section>

      {record && (
        <CoverView
          image={record.image}
          overline={artistOf(record)}
          title={record.title}
          facts={[
            [page.labels.year, record.year],
            [page.labels.label, record.label],
            [page.labels.catno, record.catno],
            [page.labels.format, record.format],
          ]}
          note={noteOf(record.id)}
          labels={page.labels}
          position={active + 1}
          total={list.length}
          shareUrl={cardUrl('record', record.id)}
          onClose={() => setOpenId(null)}
          onStep={step}
        >
          {record.url && (
            <p className="cover-source">
              <a href={record.url} target="_blank" rel="noopener">
                {page.labels.shop} ↗
              </a>
            </p>
          )}
        </CoverView>
      )}
    </main>
  )
}
