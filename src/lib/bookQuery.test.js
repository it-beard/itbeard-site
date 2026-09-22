import { describe, expect, it } from 'vitest'
import { matchesNumbers, parseQuery } from './bookQuery'

const q = (s) => parseQuery(s)

describe('parseQuery', () => {
  it('leaves plain text alone', () => {
    expect(q('Караткевіч')).toEqual({ text: 'Караткевіч', year: null, pages: null })
    expect(q('')).toEqual({ text: '', year: null, pages: null })
  })

  it('reads a four-digit number in the plausible range as a year', () => {
    expect(q('2023')).toMatchObject({ text: '', year: [2023, 2023], pages: null })
    expect(q('караткевіч 1968')).toMatchObject({ text: 'караткевіч', year: [1968, 1968] })
  })

  it('reads any other number as a page count', () => {
    expect(q('500')).toMatchObject({ text: '', year: null, pages: [500, 500] })
    expect(q('1200')).toMatchObject({ pages: [1200, 1200], year: null })
  })

  it('understands ranges, in either order and with any dash', () => {
    expect(q('1990-2005').year).toEqual([1990, 2005])
    expect(q('2005 – 1990').year).toEqual([1990, 2005])
    expect(q('100—300').pages).toEqual([100, 300])
    expect(q('100..300').pages).toEqual([100, 300])
  })

  it('understands bounds', () => {
    expect(q('>500').pages).toEqual([501, Infinity])
    expect(q('>=500').pages).toEqual([500, Infinity])
    expect(q('500+').pages).toEqual([500, Infinity])
    expect(q('<100').pages).toEqual([-Infinity, 99])
    expect(q('<=100').pages).toEqual([-Infinity, 100])
    expect(q('да 100').pages).toEqual([-Infinity, 100])
    expect(q('ад 2020').year).toEqual([2020, Infinity])
    expect(q('under 100').pages).toEqual([-Infinity, 99])
  })

  it('ignores the units people type next to numbers', () => {
    expect(q('да 100 старонак')).toMatchObject({ text: '', pages: [-Infinity, 100] })
    expect(q('2023 год')).toMatchObject({ text: '', year: [2023, 2023] })
    expect(q('300 pages')).toMatchObject({ text: '', pages: [300, 300] })
  })

  it('takes a year and a page count together, plus words', () => {
    expect(q('паэзія 1970-1999 <100')).toMatchObject({ text: 'паэзія', year: [1970, 1999], pages: [-Infinity, 99] })
  })

  it('does not mistake numbers inside a title for a filter', () => {
    // «1984» is a year to the parser — the title match comes from the text part, and
    // the owner's copy is not from 1984, so the search for the novel goes by its author
    expect(q('1984')).toMatchObject({ year: [1984, 1984] })
    expect(q('100 манет')).toMatchObject({ text: 'манет', pages: [100, 100] })
  })
})

describe('matchesNumbers', () => {
  const book = { year: 2023, pages: 320 }
  it('passes when nothing numeric was asked', () => expect(matchesNumbers(book, q('толкін'))).toBe(true))
  it('checks year and pages independently', () => {
    expect(matchesNumbers(book, q('2023'))).toBe(true)
    expect(matchesNumbers(book, q('2022'))).toBe(false)
    expect(matchesNumbers(book, q('>300'))).toBe(true)
    expect(matchesNumbers(book, q('<300'))).toBe(false)
    expect(matchesNumbers(book, q('2023 >300'))).toBe(true)
    expect(matchesNumbers(book, q('2023 <300'))).toBe(false)
  })
  it('fails a numeric filter when the book lacks that fact', () => {
    expect(matchesNumbers({ year: 2023 }, q('>100'))).toBe(false)
    expect(matchesNumbers({ pages: 100 }, q('2023'))).toBe(false)
  })
})
