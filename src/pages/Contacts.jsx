import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import { CONTACT_LINKS } from '../data/site'

function ContactGroup({ group }) {
  return (
    <section className="container section">
      <h2>{group.title}</h2>
      <div className="contact-cards">
        {group.links.map(({ id, label }) => {
          const link = CONTACT_LINKS[id]
          if (!link) return null
          return (
            <a key={id} href={link.href} target="_blank" rel="noopener" className="contact-card" style={{ '--brand': link.color }}>
              <i className={link.icon} aria-hidden="true"></i>
              <span className="contact-label">{label}</span>
              <span className="contact-value">{link.text}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default function Contacts() {
  const { lang } = useLang()
  const page = getPage('contacts', lang)
  useTitle(page.title)

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.title}</h1>
      </section>
      <ContactGroup group={page.groups.contacts} />
      <ContactGroup group={page.groups.socials} />
    </main>
  )
}
