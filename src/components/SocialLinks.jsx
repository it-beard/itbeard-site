import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { CONTACT_LINKS } from '../data/site'
import Icon from './Icon'

// A row of icon-only links to the contacts named by `ids` (keys of CONTACT_LINKS).
// The name of each link — its tooltip and what a screen reader says — is the label
// the /contacts page gives the same contact, so it follows the site language.
export default function SocialLinks({ ids, className = '' }) {
  const { lang } = useLang()
  const { groups } = getPage('contacts', lang)
  const { footer } = getPage('shared', lang)
  const labels = Object.fromEntries(
    Object.values(groups)
      .flatMap((g) => g.links)
      .map((l) => [l.id, l.label])
  )

  return (
    <nav className={`social${className ? ` ${className}` : ''}`} aria-label={footer.contacts}>
      {ids.map((id) => {
        const link = CONTACT_LINKS[id]
        const label = labels[id] ?? id
        return (
          <a key={id} href={link.href} {...newTab(link.href)} className={id} title={label} aria-label={label}>
            <Icon name={link.icon} />
          </a>
        )
      })}
    </nav>
  )
}

// A web address opens in a new tab; a mailto: link opens the mail program and
// must not leave an empty tab behind.
export const newTab = (href) => (/^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {})
