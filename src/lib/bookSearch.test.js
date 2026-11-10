import { describe, expect, it } from 'vitest'
import { buildIndex, fold, parseSearch, search, similarBooks, tokens } from './bookSearch'

// a shelf of nine, enough to tell a match from a guess
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
  { id: 'code', title: 'Код. Тайный язык информатики', author: 'Чарльз Петцольд', lang: 'ru', tags: ['tech'], genre: [], themes: [], mood: [], form: 'nonfiction', pages: 448, year: 2019 },
  { id: 'road', title: 'Дарога', author: 'Кормак Макарці', lang: 'be', tags: ['fiction'], genre: [], themes: [], mood: [], form: 'novel', pages: 256, year: 2022, original: 'Cormac McCarthy. The Road' },
  { id: 'orwell', title: '1984', author: 'Джордж Оруэл', lang: 'be', tags: ['fiction'], genre: [], themes: [], mood: [], form: 'novel', pages: 338, year: 2020 },
  { id: 'we', title: 'Мы', author: 'Яўген Замяцін', lang: 'be', tags: ['fiction'], genre: [], themes: [], mood: [], form: 'novel', pages: 240, year: 2021 },
]
const NOTES = {
  martian: ['<p>Раман пра астранаўта, якога пакінулі аднаго на Марсе.</p>', '<p>A novel about an astronaut left alone on Mars, and his long road home.</p>'],
  dune: ['<p>Раман пра пустэльную планету Аракіс.</p>'],
  lotr: ['<p>Доўгая дарога да Самотнай гары, а код на браме яшчэ трэба разгадаць.</p>'],
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

  it('puts the book whose title is the query first, before the ones that only mention the word', () => {
    expect(shelf('астранаўт дарога')).toEqual([])
    expect(shelf('дарога')).toEqual(['road', 'lotr'])
    expect(shelf('ДАРОГА!')).toEqual(['road', 'lotr'])
    // the title up to its first full stop is a name too; the whole of it finds only the book
    expect(shelf('код')).toEqual(['code', 'lotr'])
    expect(shelf('Код. Тайный язык информатики')).toEqual(['code'])
    // a word of a longer title is not the title: the shelf keeps its order
    expect(shelf('пярсцёнка')).toEqual(['lotr'])
    expect(shelf('дарога', { filter: (b) => b.id !== 'road' })).toEqual(['lotr'])
  })

  it('knows a book by its title in the original too', () => {
    expect(shelf('The Road')).toEqual(['road', 'martian'])
    expect(shelf('road home')).toEqual(['martian'])
  })

  it('takes a title made of small words for the book, not for an empty query', () => {
    expect(shelf('мы')).toEqual(['we'])
    expect(shelf('Мы!')).toEqual(['we'])
    expect(shelf('мы яны')).toHaveLength(BOOKS.length)
    expect(shelf('мы', { filter: (b) => b.id !== 'we' })).toHaveLength(BOOKS.length - 1)
  })

  it('finds a title that reads as a number instead of taking it for a year', () => {
    expect(shelf('1984')).toEqual(['orwell'])
    expect(shelf('2020')).toEqual(['orwell'])
    expect(shelf('1984', { filter: (b) => b.lang === 'ru' })).toEqual([])
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

// A number is a year or a page count first; when no book answers to that, it was part of a name.
describe('numbers that belong to a name', () => {
  const SHELF = [
    { id: 'hp1', title: 'Гары Потэр і філасофскі камень', author: 'Дж. К. Роўлінг', series: 'Гары Потэр', part: 1, lang: 'be', tags: ['sf'], genre: ['epic-fantasy'], themes: ['magic'], mood: [], form: 'novel', pages: 320, year: 2019 },
    { id: 'hp3', title: 'Гары Потэр і вязень Азкабана', author: 'Дж. К. Роўлінг', series: 'Гары Потэр', part: 3, lang: 'be', tags: ['sf'], genre: ['epic-fantasy'], themes: ['magic'], mood: [], form: 'novel', pages: 420, year: 2021 },
    { id: 'penta2', title: 'Пентаквантар. Кніга 2', author: 'Арцём Шуканаў', series: 'Пентаквантар', part: 2, lang: 'be', tags: ['sf'], genre: [], themes: ['space'], mood: [], form: 'novel', pages: 300, year: 2024 },
    { id: 'f451', title: '451 градус паводле Фарэнгейта', author: 'Рэй Брэдберы', lang: 'be', tags: ['sf'], genre: [], themes: [], mood: ['dark'], form: 'novel', pages: 200, year: 2022 },
    { id: 'thick', title: 'Тоўстая кніга', author: 'Нехта Іншы', lang: 'be', tags: ['fiction'], genre: [], themes: [], mood: [], form: 'novel', pages: 451, year: 1984 },
  ]
  const idx = buildIndex(SHELF, { concepts: CONCEPTS })
  const found = (q) => search(idx, q).shelf.map((b) => b.id)

  it('still reads a number as pages or a year when a book answers to it', () => {
    expect(found('451')).toEqual(['thick'])
    expect(found('1984')).toEqual(['thick'])
    expect(found('да 250')).toEqual(['f451'])
  })

  it('finds a title by the number in it', () => {
    expect(found('451 градус')).toEqual(['f451'])
    expect(found('Фарэнгейт 451')).toEqual(['f451'])
  })

  it('takes a small number after a series for the volume', () => {
    expect(found('гары потэр 3')).toEqual(['hp3'])
    expect(found('пентаквантар 2')).toEqual(['penta2'])
    // the other volume is not lost: it is proposed under the shelf
    expect(search(idx, 'гары потэр 3').suggestions.map((s) => s.book.id)).toContain('hp1')
  })

  it('keeps every volume when the series has no such number', () => {
    expect(found('гары потэр 7').sort()).toEqual(['hp1', 'hp3'])
  })

  it('reads «том 2» as the second volumes', () => {
    expect(found('том 2')).toEqual(['penta2'])
    expect(found('том 9')).toEqual([])
  })

  it('tells the page what it understood', () => {
    expect(search(idx, '451 градус').parsed).toMatchObject({ pages: null, year: null })
    expect(parseSearch('гары потэр 3', { numbersAsWords: true }).parts).toEqual([3])
    expect(parseSearch('гары потэр 3').parts).toBeUndefined()
  })
})
