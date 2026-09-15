import { useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage, getSection } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'
import Ornament from '../components/Ornament'
import { CRYPTO_WALLETS } from '../data/site'

const SUPPORT_ICONS = {
  buymeacoffee: 'fas fa-mug-hot',
  patreon: 'fab fa-patreon',
  tribute: 'fab fa-telegram-plane',
  crypto: 'fab fa-bitcoin',
}

function CopyButton({ value, labels }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy} title={labels.copy}>
      {copied ? labels.copied : labels.copy}
    </button>
  )
}

export default function Support() {
  const { lang } = useLang()
  const page = getPage('support', lang)
  useTitle(page.title, page.description, '/support')

  const sections = ['buymeacoffee', 'patreon', 'tribute', 'crypto'].map((id) => getSection(page, id))

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.title}</h1>
        <Ornament />
      </section>

      <section className="container section support-list">
        <Md className="support-intro prose" html={page.html} />
        {sections.map((s) => (
          <article key={s.id} id={s.id} className="support-card">
            <div className="support-card-head">
              <span className={`support-logo support-logo-${s.id}`} aria-hidden="true">
                <i className={SUPPORT_ICONS[s.id]}></i>
              </span>
              <h2>{s.title}</h2>
            </div>
            <Md className="prose" html={s.html} />
            {s.id === 'crypto' && (
              <ul className="crypto-list">
                {CRYPTO_WALLETS.map((w) => (
                  <li key={`${w.coin}-${w.address}`}>
                    <b>{w.coin}</b>
                    <code>{w.address}</code>
                    <CopyButton value={w.address} labels={page.labels} />
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </main>
  )
}
