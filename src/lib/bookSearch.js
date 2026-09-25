// Search for the home library that copes with an inexact query — no model in the
// browser, no service behind it, only the books' own words.
//
// Every book is indexed by its title, people and series, by the hand-written profile
// (genre, themes, mood, form — src/data/bookProfiles.js — through the words listed
// for each key under `concepts` in content/books.md) and by its note in both
// languages. A query is split into words; each word is looked up in the index
// exactly, by prefix (Slavic endings come and go: «дракон» finds «драконаў»), or
// with a typo or two («тлокін» finds Толкіна). Spelling differences that do not
// change the word for a reader — ь, ў/у, ё/е, о/а, и/і — are folded away first.
// A few words are read as filters rather than words: «па-беларуску» narrows to the
// language, «кароткае» to the page count, «новае» to the last years; numbers are
// handled by bookQuery.js.
//
//   search(index, «космас»)         → every book whose profile or note speaks of space
//   search(index, «толкін вершы»)   → no book matches both words, so the shelf is empty
//                                     and the suggestions hold Tolkien and the poetry
//   similarBooks(index, «herbert-dziuna») → the books nearest to Dune by profile
import { langsOf } from '../data/books'
import { matchesNumbers, parseQuery } from './bookQuery'

// ----- words

// One spelling for every way a reader may write a word: no case, no soft signs,
// no apostrophes, akanne (о→а), ё→е, э→е, ў→у, и/й→і, щ→шч, дз→д (Дзюна = Дюна).
export const fold = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[’'`ʼ]/g, '')
    .replace(/ё/g, 'е')
    .replace(/э/g, 'е')
    .replace(/ў/g, 'у')
    .replace(/о/g, 'а')
    .replace(/[ий]/g, 'і')
    .replace(/щ/g, 'шч')
    .replace(/дз/g, 'д')
    .replace(/[ьъ]/g, '')
    .replace(/ґ/g, 'г')

const WORD = /[\p{L}\p{N}][\p{L}\p{N}’'`ʼ]*/gu

// the words of a text with their folded form: [{ raw, tok }], one-letter words dropped
const words = (text) =>
  Array.from(String(text ?? '').matchAll(WORD), (m) => ({ raw: m[0], tok: fold(m[0]) })).filter(
    (w) => w.tok.length >= 2
  )
export const tokens = (text) => words(text).map((w) => w.tok)

// Words that carry no meaning for the search: the small words of a sentence, which
// are kept out of the index too (so «толькі» in a note cannot answer for «Толкін»),
// and the words people type around a request: «хачу нешта пра космас» → «космас».
const STOP = new Set(
  tokens(
    `і й у ў з зь са на да ад аб пра для па пад над пры без бяз праз цераз перад паміж між ля каля
     да як што які якая якое якія якую якога якой якім якіх гэта гэты гэтая гэтае гэтыя гэтага гэтай
     гэтым гэтых той тая тое тыя таго тую тым тых ці або альбо але ды дык бы б не ня ні так там тут
     туды сюды адсюль адтуль ёсьць няма быў была было былі быць будзе будуць мне мой мая маё мае маіх
     свой свая сваё свае сваю сваіх сваім свайго сваёй яго ягоны ягоная ягонае ягоных яе ёй іх іхны
     іхная ім яму яны яна ён мы вы ты нас вас нам вам мяне цябе сябе сам сама самі самы самая самае
     самых хачу хочацца хацеў хацела хацелася пачытаць чытаць прачытаць пачытаю чытаю чытаньне кніга
     кнігі кнігу кнігай кнізе кніжка кніжку кніжкі кніжак нешта штосьці штось нехта нейкі нейкая
     нейкае нейкую нейкія вельмі добрая добры добрае добрую цікавая цікавы цікавае цікавую файная
     файны файнае парай параіць параіш парадзь парадзьце прапануй прапануйце знайдзі знайсьці пакажы
     шукаю шукаем можа можна трэба варта толькі яшчэ ужо вось вунь каб калі дзе куды хто каго каму
     кім чым чаго чаму усе усё усю увесь уся усіх усім усяго усёй адна адзін адно адной адным двух
     трох некалькі шмат мала трохі крыху нечага чагосьці якуюсьці якісьці аўтар аўтара аўтарам назва
     назвай кшталту тыпу накшталт падобнае падобная падобны таксама разам потым затым пасьля раней
     цяпер зараз тады заўсёды ніколі нават амаль больш менш зусім таму бо хоць хаця жа ж хай няхай
     гады году годзе гадоў год разоў раз
     и в на про о об что какой какая какое какую книга книги книгу хочу почитать прочитать нибудь есть
     по из или очень интересная хорошая его её их им как так же уже ещё еще был была было были
     the a an of and or to in on for about with by is are was be been book books something some any read
     reading want i me my like good nice great interesting recommend suggest find show please that this
     which what who from at as its it's he she they them his her their we you your our has have had
     not no but so than then also into over out up more most very just only one two first`
  )
)

// ----- the words that are filters

const YEAR_NOW = new Date().getFullYear()

// each list is matched as whole words on the folded query; a trailing * stands for any ending
const INTENTS = [
  { set: { lang: 'be' }, words: ['па-беларуску', 'беларускамоўн*', 'на беларускай мове', 'беларускай мовай', 'in belarusian'] },
  { set: { lang: 'ru' }, words: ['па-расейску', 'па-руску', 'па-расійску', 'расейскамоўн*', 'рускамоўн*', 'расійскамоўн*', 'на расейскай мове', 'на рускай мове', 'in russian'] },
  { set: { lang: 'en' }, words: ['па-ангельску', 'па-англійску', 'ангельскамоўн*', 'англамоўн*', 'англійскамоўн*', 'на ангельскай мове', 'на англійскай мове', 'in english'] },
  { set: { lang: 'pl' }, words: ['па-польску', 'польскамоўн*', 'на польскай мове', 'in polish'] },
  {
    set: { pages: [-Infinity, 200] },
    words: ['кароткае', 'кароткая', 'кароткі', 'кароткую', 'кароткіх', 'кароткія', 'кароценькае', 'кароценькая', 'тонкая', 'тонкае', 'тонкі', 'тонкую', 'тонкія', 'невялікая', 'невялікае', 'невялікі', 'невялікую', 'невялічкая', 'невялічкае', 'маленькая', 'маленькае', 'маленькі', 'маленькую', 'на вечар', 'на адзін вечар', 'short', 'thin', 'small', 'quick read'],
  },
  {
    set: { pages: [500, Infinity] },
    words: ['тоўстая', 'тоўстае', 'тоўсты', 'тоўстую', 'тоўстыя', 'доўгая', 'доўгае', 'доўгі', 'доўгую', 'цагліна', 'цагліну', 'цэгла', 'цэглу', 'вялізная', 'вялізнае', 'вялізны', 'long', 'thick', 'huge', 'doorstop'],
  },
  {
    set: { year: [YEAR_NOW - 2, Infinity] },
    words: ['новае', 'новая', 'новы', 'новую', 'новыя', 'нядаўняе', 'нядаўняя', 'нядаўні', 'сьвежае', 'свежае', 'сьвежая', 'свежая', 'найноўшае', 'найноўшая', 'new', 'recent', 'latest'],
  },
].map(({ set, words: list }) => ({
  set,
  re: new RegExp(
    `(?<=^|\\s)(?:${list.map((w) => fold(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*$/, '\\S*')).join('|')})(?=\\s|$)`,
    'giu'
  ),
}))

// The query taken apart: the plain words to look up (folded, stop words dropped) and
// the filters read from it — numbers via bookQuery, the words above via INTENTS.
// Numbers typed explicitly win over words: «>500 кароткае» keeps 500.
export function parseSearch(raw) {
  const numeric = parseQuery(raw)
  let text = fold(numeric.text).replace(/[’'`ʼ]/g, '')
  const q = { year: numeric.year, pages: numeric.pages, lang: null }
  for (const { set, re } of INTENTS) {
    const before = text
    text = text.replace(re, ' ')
    if (text !== before) for (const [k, v] of Object.entries(set)) q[k] ??= v
  }
  q.tokens = tokens(text).filter((t) => !STOP.has(t))
  return q
}

// ----- the index

// Where a word may come from, and how much a hit there is worth
const WEIGHT = { title: 5, author: 4, series: 3, genre: 4, theme: 3, mood: 2, form: 2, edition: 2, note: 1 }
const CONCEPT = { genre: 'genre', themes: 'theme', mood: 'mood', form: 'form' }
export const CONCEPT_KINDS = Object.values(CONCEPT)

// How much each part of a profile says about a book when two books are compared
const VECTOR = { series: 2, author: 1.5, genre: 2, theme: 1, mood: 0.6, form: 0.6, tag: 1 }

const stripHtml = (html) =>
  String(html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

// `concepts` — the dictionary from content/books.md: key → { aka: [...] }, the words
//              that stand for the key (the page adds the labels of both languages)
// `notesOf`  — the notes of a book, in every language: id → [html, ...]
export function buildIndex(books, { concepts, notesOf = () => [] }) {
  const docs = new Map()
  const vocab = new Map() // folded word → Set of book ids that carry it
  const surface = new Map() // folded word → how it was first spelled, for the reasons

  const add = (doc, field, text, key) => {
    for (const { raw, tok } of words(text)) {
      if (STOP.has(tok)) continue
      let hits = doc.terms.get(tok)
      if (!hits) doc.terms.set(tok, (hits = []))
      let hit = hits.find((h) => h.field === field)
      if (!hit) hits.push((hit = { field, keys: new Set() }))
      if (key) hit.keys.add(key)
      if (!vocab.has(tok)) vocab.set(tok, new Set())
      vocab.get(tok).add(doc.id)
      if (!surface.has(tok)) surface.set(tok, raw)
    }
  }

  for (const b of books) {
    const doc = { id: b.id, terms: new Map() }
    add(doc, 'title', [b.title, b.subtitle, b.original, ...(b.aka ?? [])].filter(Boolean).join(' '))
    add(doc, 'author', b.author)
    add(doc, 'series', b.series)
    add(doc, 'edition', [b.translator, b.publisher].filter(Boolean).join(' '))
    for (const [prop, field] of Object.entries(CONCEPT)) {
      for (const key of [].concat(b[prop] ?? [])) {
        const c = concepts[key]
        if (!c) continue
        add(doc, field, (c.aka ?? []).join(' '), key)
      }
    }
    for (const html of notesOf(b.id)) add(doc, 'note', stripHtml(html))
    docs.set(b.id, doc)
  }

  const N = books.length
  const idf = (tok) => Math.log(1 + N / (vocab.get(tok)?.size ?? N))

  // the profile of every book as a weighted vector, for «how alike are these two»
  const keyDf = new Map()
  const rawVectors = new Map()
  for (const b of books) {
    const v = new Map()
    const put = (kind, value, w) => value && v.set(`${kind}:${value}`, (v.get(`${kind}:${value}`) ?? 0) + w)
    put('series', b.series, VECTOR.series)
    put('author', b.author, VECTOR.author)
    for (const g of b.genre ?? []) put('genre', g, VECTOR.genre)
    for (const t of b.themes ?? []) put('theme', t, VECTOR.theme)
    for (const m of b.mood ?? []) put('mood', m, VECTOR.mood)
    put('form', b.form, VECTOR.form)
    for (const t of b.tags ?? []) put('tag', t, VECTOR.tag)
    for (const k of v.keys()) keyDf.set(k, (keyDf.get(k) ?? 0) + 1)
    rawVectors.set(b.id, v)
  }
  const vectors = new Map()
  for (const [id, v] of rawVectors) {
    const weighted = new Map(Array.from(v, ([k, w]) => [k, w * Math.log(1 + N / keyDf.get(k))]))
    const norm = Math.sqrt(Array.from(weighted.values()).reduce((s, w) => s + w * w, 0)) || 1
    vectors.set(id, new Map(Array.from(weighted, ([k, w]) => [k, w / norm])))
  }

  return { books, byId: new Map(books.map((b) => [b.id, b])), docs, vocab, surface, idf, vectors }
}

// ----- matching

// Damerau–Levenshtein distance (adjacent swaps count as one edit), capped at `max`+1
function distance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  const rows = []
  for (let i = 0; i <= a.length; i++) {
    rows[i] = [i]
    for (let j = 1; j <= b.length; j++) {
      if (i === 0) {
        rows[i][j] = j
        continue
      }
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      let d = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, rows[i - 2][j - 2] + 1)
      rows[i][j] = d
    }
    if (Math.min(...rows[i]) > max) return max + 1
  }
  return rows[a.length][b.length]
}

// two words that differ only in their ending: «змрочнае» / «змрочны», «вайны» / «вайна»
function sameStem(a, b) {
  let l = 0
  while (l < a.length && l < b.length && a[l] === b[l]) l++
  const rest = Math.max(a.length - l, b.length - l)
  return (l >= 4 && rest <= 2) || (l >= 6 && rest <= 3)
}

// the index words a query word may stand for, each with how sure the match is:
// the word itself 1, a longer or shorter form of it ≈0.8, another ending 0.75,
// a misspelling 0.6, two misspellings in a long word with the same first letter 0.45
const PREFIX_MIN = 4
export function expand(q, index) {
  const found = new Map()
  if (index.vocab.has(q)) found.set(q, 1)
  const maxDist = q.length >= 10 ? 2 : q.length >= 6 ? 1 : 0
  for (const v of index.vocab.keys()) {
    if (v === q) continue
    const short = Math.min(q.length, v.length)
    if (short >= PREFIX_MIN && (v.startsWith(q) || q.startsWith(v))) {
      found.set(v, 0.7 + 0.3 * (short / Math.max(q.length, v.length)))
    } else if (sameStem(q, v)) {
      found.set(v, 0.75)
    } else if (maxDist > 0) {
      const d = distance(q, v, maxDist)
      if (d <= maxDist && (d === 1 || v[0] === q[0])) found.set(v, d === 1 ? 0.6 : 0.45)
    }
  }
  return found
}

// the best place a query word (already expanded) is found in one book, or null
function bestHit(index, doc, expansion) {
  let best = null
  for (const [tok, quality] of expansion) {
    const hits = doc.terms.get(tok)
    if (!hits) continue
    for (const hit of hits) {
      const score = WEIGHT[hit.field] * quality * index.idf(tok)
      if (!best || score > best.score) best = { score, quality, field: hit.field, tok, keys: hit.keys }
    }
  }
  return best
}

const reasonOf = (index, hit) =>
  hit.keys.size > 0 ? { kind: hit.field, key: hit.keys.values().next().value } : { kind: hit.field, text: index.surface.get(hit.tok) }

// ----- comparing books

const cosine = (a, b) => {
  let s = 0
  for (const [k, w] of a) s += w * (b.get(k) ?? 0)
  return s
}

// the parts of two profiles that agree, strongest first and one per kind: [{ kind, key }]
function shared(a, b, n = 2) {
  const pairs = []
  for (const [k, w] of a) if (b.has(k)) pairs.push([k, w * b.get(k)])
  const out = []
  const seen = new Set()
  for (const [k] of pairs.sort((x, y) => y[1] - x[1])) {
    const i = k.indexOf(':')
    const kind = k.slice(0, i)
    const key = k.slice(i + 1)
    if (seen.has(kind)) continue
    seen.add(kind)
    out.push(kind === 'tag' ? { kind: 'subject', key } : kind === 'series' || kind === 'author' ? { kind, text: key } : { kind, key })
    if (out.length === n) break
  }
  return out
}

// two editions of one book (the same title by the same author) count as one work
const sameWork = (a, b) => a.title === b.title && (a.author ?? '') === (b.author ?? '')

// the first `n` of a ranked list, without the works already `taken` or repeated in it
function distinct(ranked, n, taken = []) {
  const out = []
  for (const s of ranked) {
    if ([...taken, ...out.map((o) => o.book)].some((b) => sameWork(b, s.book))) continue
    out.push(s)
    if (out.length === n) break
  }
  return out
}

// the `n` books most like the one with this id: [{ book, score, reasons }]
export function similarBooks(index, id, n = 4) {
  const me = index.vectors.get(id)
  if (!me) return []
  const ranked = index.books
    .filter((b) => b.id !== id)
    .map((b) => ({ book: b, score: cosine(me, index.vectors.get(b.id)) }))
    .filter((s) => s.score > 0.15)
    .sort((a, b) => b.score - a.score)
  return distinct(ranked, n, [index.byId.get(id)]).map((s) => ({ ...s, reasons: shared(me, index.vectors.get(s.book.id)) }))
}

// ----- the search itself

const SUGGEST_MAX = 5
const SUGGEST_MIN = 0.3

// `filter` — the chips: which books may be considered at all
// Returns the shelf (every book that matches all of the words, in the order given)
// and the suggestions under it: books that match some of the words, or look like
// the ones found, each with the reasons: [{ book, reasons: [{ kind, key | text }] }]
export function search(index, raw, { filter = () => true } = {}) {
  const parsed = parseSearch(raw)
  const pool = index.books.filter(
    (b) => filter(b) && matchesNumbers(b, parsed) && (!parsed.lang || langsOf(b).includes(parsed.lang))
  )
  if (parsed.tokens.length === 0) return { parsed, shelf: pool, suggestions: [] }

  const expansions = parsed.tokens.map((q) => expand(q, index))
  const scored = pool.map((b) => {
    const hits = expansions.map((e) => bestHit(index, index.docs.get(b.id), e))
    const matched = hits.filter(Boolean)
    return { book: b, hits: matched, total: matched.reduce((s, h) => s + h.score, 0), all: matched.length === hits.length }
  })
  const shelf = scored.filter((s) => s.all).map((s) => s.book)

  // what the books found have in common, to look for more of the same
  let centroid = null
  if (shelf.length > 0) {
    centroid = new Map()
    for (const b of shelf) for (const [k, w] of index.vectors.get(b.id)) centroid.set(k, (centroid.get(k) ?? 0) + w)
    const norm = Math.sqrt(Array.from(centroid.values()).reduce((s, w) => s + w * w, 0)) || 1
    for (const [k, w] of centroid) centroid.set(k, w / norm)
  }

  const n = parsed.tokens.length
  const suggestions = scored
    .filter((s) => !s.all)
    .map((s) => {
      const partial = s.hits.length / n
      const alike = centroid ? cosine(index.vectors.get(s.book.id), centroid) : 0
      const reasons = s.hits.sort((a, b) => b.score - a.score).map((h) => reasonOf(index, h))
      if (alike > 0.2) {
        const nearest = shelf.reduce((best, b) => {
          const score = cosine(index.vectors.get(s.book.id), index.vectors.get(b.id))
          return !best || score > best.score ? { book: b, score } : best
        }, null)
        reasons.push({ kind: 'like', text: nearest.book.title }, ...shared(index.vectors.get(s.book.id), index.vectors.get(nearest.book.id)))
      }
      return { book: s.book, score: alike + 0.6 * partial + 0.1 * Math.min(1, s.total / (5 * n)), reasons }
    })
    .filter((s) => s.score >= SUGGEST_MIN)
    .sort((a, b) => b.score - a.score)

  return { parsed, shelf, suggestions: distinct(suggestions, SUGGEST_MAX, shelf) }
}
