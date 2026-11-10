import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Ornament from '../components/Ornament'
import Icon from '../components/Icon'
import { newTab } from '../components/SocialLinks'
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
            <a key={id} href={link.href} {...newTab(link.href)} className="contact-card" style={{ '--brand': link.color }}>
              <span className="contact-icon">
                <Icon name={link.icon} />
              </span>
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
  useTitle(page.title, page.description)

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.title}</h1>
        <Ornament />
      </section>
      <ContactGroup group={page.groups.contacts} />
      <ContactGroup group={page.groups.socials} />
    </main>
  )
}
