import yaml from 'js-yaml'
import { marked } from 'marked'

export const LANGS = ['be', 'en']

marked.use({
  breaks: true,
  hooks: {
    // external links open in a new tab
    postprocess(html) {
      return html.replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener" href="$1')
    },
  },
})

export const md = (src) => (src ? marked.parse(src) : '')
export const mdInline = (src) => (src ? marked.parseInline(src) : '')

// Month names in the genitive case for «15 сакавіка 2024» / «March 15, 2024».
const MONTHS = {
  be: ['студзеня', 'лютага', 'сакавіка', 'красавіка', 'мая', 'чэрвеня', 'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

// Extract the four-digit year from a start value (ISO date or bare year).
export function startYear(value) {
  const m = /^(\d{4})/.exec(String(value ?? ''))
  return m ? m[1] : ''
}

// Render a project start date. A full ISO date ('2024-03-15') becomes a
// localized day-month-year string; a bare year (2024) is returned as-is.
export function formatDate(value, lang) {
  if (value == null) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value))
  if (!m) return String(value)
  const [, y, mo, d] = m
  const month = (MONTHS[lang] ?? MONTHS.be)[Number(mo) - 1]
  const day = Number(d)
  return lang === 'en' ? `${month} ${day}, ${y}` : `${day} ${month} ${y}`
}

// Build the start-date tooltip. A full date reads «Праект пачаўся 16 лютага 2023»;
// a bare year reads «Праект пачаўся ў 2025 годзе».
export function startTooltip(value, lang, labels) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    return `${labels.startedOn} ${formatDate(value, lang)}`
  }
  const { pre, post } = labels.startedInYear
  return [pre, startYear(value), post].filter(Boolean).join(' ')
}

// A frontmatter node like { be: "...", en: "..." } is a translated value:
// resolve it to the current language (falling back to Belarusian).
function isLocalized(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return false
  const keys = Object.keys(node)
  return keys.length > 0 && keys.every((k) => LANGS.includes(k))
}

function resolve(node, lang) {
  if (isLocalized(node)) return node[lang] ?? node.be
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang))
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, resolve(v, lang)]))
  }
  return node
}

// Body sections: "# Title {#id}" starts a section, "## Title {#id}" a card inside it.
const HEADING = /^(#{1,2})\s+(.*?)\s*(?:\{#([A-Za-z0-9_-]+)\})?\s*$/

function parseSections(body) {
  const root = { lines: [] }
  const sections = []
  let section = null
  let target = root

  for (const line of body.split(/\r?\n/)) {
    const m = HEADING.exec(line)
    if (m) {
      const node = { title: m[2], id: m[3] || null, lines: [], subs: [] }
      if (m[1].length === 1 || !section) {
        sections.push(node)
        section = node
      } else {
        section.subs.push(node)
      }
      target = node
    } else {
      target.lines.push(line)
    }
  }

  const finish = (n) => ({
    id: n.id,
    title: n.title,
    html: md(n.lines.join('\n').trim()),
    subs: (n.subs || []).map(finish),
  })

  return { html: md(root.lines.join('\n').trim()), sections: sections.map(finish) }
}

// Body language blocks are delimited by "<!-- be -->" / "<!-- en -->" marker lines.
const LANG_MARKER = /^<!--\s*(\w{2})\s*-->\s*$/

function splitBodyByLang(body) {
  const chunks = {}
  let lang = null
  for (const line of body.split(/\r?\n/)) {
    const m = LANG_MARKER.exec(line)
    if (m && LANGS.includes(m[1])) {
      lang = m[1]
      chunks[lang] = []
    } else if (lang) {
      chunks[lang].push(line)
    } else {
      // content before the first marker is shared by all languages
      for (const l of LANGS) (chunks[l] ??= []).push(line)
    }
  }
  return Object.fromEntries(Object.entries(chunks).map(([l, lines]) => [l, lines.join('\n')]))
}

const files = import.meta.glob('../../content/*.md', { query: '?raw', import: 'default', eager: true })

const pages = {}
for (const [path, raw] of Object.entries(files)) {
  const name = /([\w-]+)\.md$/.exec(path)[1]
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  const meta = fm ? yaml.load(fm[1]) || {} : {}
  const bodies = splitBodyByLang(fm ? fm[2] : raw)
  pages[name] = {}
  for (const lang of LANGS) {
    pages[name][lang] = { ...resolve(meta, lang), ...parseSections(bodies[lang] ?? '') }
  }
}

export function getPage(name, lang) {
  return pages[name]?.[lang] ?? pages[name]?.be ?? {}
}

export function getSection(page, id) {
  return page.sections?.find((s) => s.id === id) ?? { title: '', html: '', subs: [] }
}
