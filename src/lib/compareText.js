// Browsers ship different collation data: with the same 'be' locale Chrome puts Latin before
// Cyrillic and Node after it. So the script order is decided here — digits, Cyrillic, the rest —
// and localeCompare only orders the letters within a script.
const scriptRank = (text) => (/^\p{Nd}/u.test(text) ? 0 : /^\p{Script=Cyrillic}/u.test(text) ? 1 : 2)

export const compareText = (a, b, lang) =>
  scriptRank(a) - scriptRank(b) || a.localeCompare(b, lang, { numeric: true })
