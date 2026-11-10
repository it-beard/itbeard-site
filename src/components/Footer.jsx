import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage, mdInline } from '../lib/content'
import Md from '../lib/Md'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const { lang } = useLang()
  const { footer } = getPage('shared', lang)

  return (
    <footer id="footer">
      <div className="container footer-inner">
        <div className="footer-contacts">
          <SocialLinks ids={['telegram', 'whatsapp', 'email']} />
          <Link to="/support" className="footer-support">
            {footer.support}
          </Link>
        </div>
        <div className="footer-small">
          <p>
            <Link to="/sites">{footer.sites}</Link>
          </p>
          <Md tag="p" html={mdInline(footer.github)} />
          {footer.note && <Md tag="p" html={mdInline(footer.note)} />}
        </div>
      </div>
    </footer>
  )
}
