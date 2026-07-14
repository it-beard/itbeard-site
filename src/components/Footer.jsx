import { useLang } from '../lib/LangContext'
import { getPage, mdInline } from '../lib/content'
import Md from '../lib/Md'

export default function Footer() {
  const { lang } = useLang()
  const { footer } = getPage('shared', lang)

  return (
    <footer id="footer">
      <div className="container footer-inner">
        <div className="footer-contacts">
          <span>{footer.contacts}</span>
          <nav className="social">
            <a href="mailto:iamitbeard@gmail.com" target="_blank" rel="noopener" className="email" title="Email">
              <i className="fab fa fa-at"></i>
            </a>
            <a href="https://telegram.me/iamitbeard" target="_blank" rel="noopener" className="telegram" title="Telegram">
              <i className="fab fa-brands fa-telegram-plane"></i>
            </a>
          </nav>
        </div>
        <div className="footer-small">
          <Md tag="p" html={mdInline(footer.thanks)} />
          <Md tag="p" html={mdInline(footer.github)} />
        </div>
      </div>
      <a rel="me" style={{ display: 'none' }} href="https://mementomori.social/@Itbeard">Mastodon</a>
      <a rel="me" style={{ display: 'none' }} href="https://vkl.world/@itbeard">Mastodon</a>
    </footer>
  )
}
