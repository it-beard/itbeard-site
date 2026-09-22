import { useCallback, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import CoverView from '../components/CoverView'
import CoverRail from '../components/CoverRail'
import { VINYL, WANTED_VINYL } from '../data/site'
import { cardUrl, useCardLink } from '../lib/useCardLink'

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
  // the open card lives in the address (?record=id), so it can be shared
  const [openId, setOpenId] = useCardLink('record')

  const tagCount = (tag) => (tag === 'all' ? total : VINYL.filter((r) => r.tags.includes(tag)).length)
  const shown = VINYL.filter((r) => filter === 'all' || r.tags.includes(filter))

  const pick = (tag) => {
    setFilter(filter === tag ? 'all' : tag)
    setOpenId(null)
  }
  // wraps around, so the arrows never dead-end
  // the card walks the list it was opened from (a shared link to a record the filter
  // hides falls back to the whole collection) and wraps around
  const list = WANTED_VINYL.some((r) => r.id === openId) ? WANTED_VINYL : shown.some((r) => r.id === openId) ? shown : VINYL
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
        <div key={filter} className="vinyl-grid cards-fade vinyl-grid-spaced">
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
