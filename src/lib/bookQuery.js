// The library search box takes free text plus numbers. A number that reads as a year
// (1900 … next year) filters by year, any other number by page count; both accept a
// range («1990-2005», «100–300»), a bound («>500», «<100», «500+», «да 100»), or an
// exact value. What is left after the numbers are taken out is matched against
// author, title and series as before.
//
//   «караткевіч 2023»     → text «караткевіч», year 2023
//   «>500»                → more than 500 pages
//   «1970-1999 паэзія»    → text «паэзія», year in 1970–1999
//   «да 100 старонак»     → up to 100 pages (the word «старонак» is ignored)

const YEAR_MIN = 1900
const YEAR_MAX = new Date().getFullYear() + 1

// units and range words the numbers may come with, in either language
// (\b does not know Cyrillic letters, so the words are bounded by whitespace instead)
const NOISE = /(?<=^|\s)(старон[а-яў]*|стар\.?|с\.|pages?|pp?\.?|год[а-яў]*|г\.|years?)(?=\s|$)/giu
const RANGE = /(?:^|\s)(>=?|<=?|ад|да|from|to|over|under)?\s*(\d{1,4})(?:\s*(?:[-–—]|\.\.|to|да)\s*(\d{1,4}))?(\+)?(?=\s|$)/giu

const kind = (n) => (n >= YEAR_MIN && n <= YEAR_MAX ? 'year' : 'pages')

export function parseQuery(raw) {
  const text = String(raw ?? '').replace(NOISE, ' ')
  const numeric = { year: null, pages: null }
  const rest = text.replace(RANGE, (whole, op, a, b, plus) => {
    const lo = Number(a)
    const field = kind(lo)
    let range
    if (b !== undefined) range = [Math.min(lo, Number(b)), Math.max(lo, Number(b))]
    else if (op === '>' || op === 'ад' || op === 'from' || op === 'over' || plus) range = [op === '>' || op === 'over' ? lo + 1 : lo, Infinity]
    else if (op === '>=') range = [lo, Infinity]
    else if (op === '<' || op === 'under') range = [-Infinity, lo - 1]
    else if (op === '<=' || op === 'да' || op === 'to') range = [-Infinity, lo]
    else range = [lo, lo]
    numeric[field] = range
    return ' '
  })
  return { text: rest.replace(/\s+/g, ' ').trim(), ...numeric }
}

const within = (value, range) => range === null || (value != null && value >= range[0] && value <= range[1])

// true when the book satisfies the numeric parts of a parsed query
export const matchesNumbers = (book, q) => within(book.year, q.year) && within(book.pages, q.pages)
