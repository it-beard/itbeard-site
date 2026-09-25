import { describe, expect, it } from 'vitest'
import { buildIndex, fold, parseSearch, search, similarBooks, tokens } from './bookSearch'

// a shelf of six, enough to tell a match from a guess
const CONCEPTS = {
  'space-opera': { aka: ['касьмічная опера', 'space opera'] },
  'epic-fantasy': { aka: ['фэнтэзі', 'эпічнае фэнтэзі', 'fantasy'] },
  'lyric-poetry': { aka: ['паэзія', 'вершы', 'лірыка'] },
  space: { aka: ['космас', 'галактыка', 'зоркі', 'space'] },
  magic: { aka: ['магія', 'чараўніцтва'] },
  epic: { aka: ['эпічны'] },
  dark: { aka: ['змрочны'] },
  lyrical: { aka: ['лірычны'] },
  novel: { aka: ['раман'] },
  stories: { aka: ['апавяданьні'] },
  poems: { aka: ['вершы', 'зборнік вершаў'] },
  nonfiction: { aka: ['нон-фікшн'] },
}
const BOOKS = [
  { id: 'dune', title: 'Дзюна', author: 'Фрэнк Герберт', lang: 'be', tags: ['sf'], genre: ['space-opera'], themes: ['space'], mood: ['epic'], form: 'novel', pages: 750, year: 2025, aka: ['Дюна', 'Dune'] },
  { id: 'lotr', title: 'Брацтва Пярсцёнка', author: 'Дж. Р. Р. Толкін', series: 'Валадар Пярсцёнкаў', lang: 'be', tags: ['sf'], genre: ['epic-fantasy'], themes: ['magic'], mood: ['epic'], form: 'novel', pages: 562, year: 2023 },
  { id: 'witcher', title: 'Апошняе жаданне', author: 'Анджэй Сапкоўскі', lang: 'be', tags: ['sf'], genre: ['epic-fantasy'], themes: ['magic'], mood: ['dark'], form: 'stories', pages: 342, year: 2024 },
  { id: 'kupala', title: 'Выбранае', author: 'Янка Купала', lang: 'be', tags: ['poetry'], genre: ['lyric-poetry'], themes: [], mood: ['lyrical'], form: 'poems', pages: 288, year: 2021 },
  { id: 'martian', title: 'Марсіянін', author: 'Эндзі Ўір', lang: 'be', tags: ['sf'], genre: [], themes: ['space'], mood: [], form: 'novel', pages: 490, year: 2024 },
  { id: 'code', title: 'Код', author: 'Чарльз Петцольд', lang: 'ru', tags: ['tech'], genre: [], themes: [], mood: [], form: 'nonfiction', pages: 448, year: 2019 },
]
const NOTES = {
  martian: ['<p>Раман пра астранаўта, якога пакінулі аднаго на Марсе.</p>', '<p>A novel about an astronaut left alone on Mars.</p>'],
  dune: ['<p>Раман пра пустэльную планету Аракіс.</p>'],
}
const index = buildIndex(BOOKS, { concepts: CONCEPTS, notesOf: (id) => NOTES[id] ?? [] })
const shelf = (q, opts) => search(index, q, opts).shelf.map((b) => b.id)
const suggested = (q) => search(index, q).suggestions.map((s) => s.book.id)

describe('fold', () => {
  it('spells a word one way whichever way the reader wrote it', () => {
    expect(fold('Толкиен')).toBe(fold('Толкіен'))
    expect(fold('Сьвет')).toBe(fold('свет'))
    expect(fold('Дзюна')).toBe(fold('Дюна'))
    expect(fold('космас')).toBe(fold('космос'))
    expect(fold("сям'я")).toBe(fold('сям’я'))
    expect(fold('Ўір')).toBe('уір')
  })

  it('splits a text into words of two letters or more', () => {
    expect(tokens('Дж. Р. Р. Толкін — «Брацтва Пярсцёнка»')).toEqual(['дж', 'талкін', 'брацтва', 'пярсценка'])
  })
})

describe('parseSearch', () => {
  it('drops the words of a request and keeps the ones that name something', () => {
    expect(parseSearch('хачу нешта пра космас').tokens).toEqual([fold('космас')])
    expect(parseSearch('парай добрую кнігу').tokens).toEqual([])
  })

  it('reads the language and the size from words', () => {
    const q = parseSearch('па-беларуску кароткае фэнтэзі')
    expect(q).toMatchObject({ lang: 'be', pages: [-Infinity, 200], tokens: [fold('фэнтэзі')] })
    expect(parseSearch('тоўстая кніга па-ангельску')).toMatchObject({ lang: 'en', pages: [500, Infinity], tokens: [] })
    expect(parseSearch('расейскамоўная фантастыка')).toMatchObject({ lang: 'ru', tokens: [fold('фантастыка')] })
  })

  it('lets a number typed explicitly win over a word', () => {
    expect(parseSearch('>500 кароткае').pages).toEqual([501, Infinity])
  })

  it('reads «новае» as the last years', () => {
    expect(parseSearch('новае').year).toEqual([new Date().getFullYear() - 2, Infinity])
  })
})

describe('search', () => {
  it('finds a book by its title, however it is spelled', () => {
    expect(shelf('дзюна')).toEqual(['dune'])
    expect(shelf('Дюна')).toEqual(['dune'])
    expect(shelf('dune')).toEqual(['dune'])
  })

  it('finds a book by the beginning of a word, in the note too', () => {
    expect(shelf('марс')).toEqual(['martian'])
    expect(shelf('астранаўт')).toEqual(['martian'])
    expect(shelf('astronaut')).toEqual(['martian'])
  })

  it('forgives a typo', () => {
    expect(shelf('тлокін')).toEqual(['lotr'])
    expect(shelf('сапкоускі')).toEqual(['witcher'])
  })

  it('understands a theme or a genre word through the profile', () => {
    expect(shelf('космас')).toEqual(['dune', 'martian'])
    expect(shelf('хачу нешта пра космас')).toEqual(['dune', 'martian'])
    expect(shelf('фэнтэзі')).toEqual(['lotr', 'witcher'])
    expect(shelf('фэнтэзійнае')).toEqual(['lotr', 'witcher'])
    expect(shelf('вершы')).toEqual(['kupala'])
    expect(shelf('паэзія')).toEqual(['kupala'])
  })

  it('needs every word to match, and respects the chips and the filters', () => {
    expect(shelf('фэнтэзі змрочнае')).toEqual(['witcher'])
    expect(shelf('космас', { filter: (b) => b.id !== 'dune' })).toEqual(['martian'])
    expect(shelf('па-расейску')).toEqual(['code'])
    expect(shelf('раман 2024')).toEqual(['martian'])
    expect(shelf('раман кароткі')).toEqual([])
  })

  it('suggests the books that match some of the words when none matches all', () => {
    const { shelf: found, suggestions } = search(index, 'толкін вершы')
    expect(found).toEqual([])
    const ids = suggestions.map((s) => s.book.id)
    expect(ids).toContain('lotr')
    expect(ids).toContain('kupala')
    expect(suggestions.find((s) => s.book.id === 'lotr').reasons[0]).toEqual({ kind: 'author', text: 'Толкін' })
    expect(suggestions.find((s) => s.book.id === 'kupala').reasons[0].kind).toMatch(/genre|form/)
  })

  it('suggests books like the ones found, and says why', () => {
    const { shelf: found, suggestions } = search(index, 'толкін')
    expect(found.map((b) => b.id)).toEqual(['lotr'])
    expect(suggestions[0].book.id).toBe('witcher')
    expect(suggestions[0].reasons).toContainEqual({ kind: 'like', text: 'Брацтва Пярсцёнка' })
    expect(suggestions[0].reasons).toContainEqual({ kind: 'genre', key: 'epic-fantasy' })
    expect(suggested('толкін')).not.toContain('code')
  })

  it('suggests nothing without a word to go by', () => {
    expect(search(index, '').suggestions).toEqual([])
    expect(search(index, '2024').suggestions).toEqual([])
    expect(shelf('')).toHaveLength(BOOKS.length)
  })
})

describe('similarBooks', () => {
  it('ranks the books by what their profiles share', () => {
    const like = similarBooks(index, 'lotr')
    expect(like[0].book.id).toBe('witcher')
    expect(like[0].reasons[0]).toEqual({ kind: 'genre', key: 'epic-fantasy' })
    expect(like.map((s) => s.book.id)).not.toContain('lotr')
    expect(similarBooks(index, 'dune').map((s) => s.book.id)).toContain('martian')
    expect(similarBooks(index, 'nobody')).toEqual([])
  })
})
