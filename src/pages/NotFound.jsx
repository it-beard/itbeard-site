import { Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { useTitle } from '../lib/useTitle'

export default function NotFound() {
  const { lang } = useLang()
  const shared = getPage('shared', lang)
  useTitle('404')

  return (
    <main>
      <section className="not-found">
        <div className="nf-code">
          <span className="nf-gem" aria-hidden="true"></span>
          <span className="nf-num">404</span>
          <span className="nf-gem" aria-hidden="true"></span>
        </div>
        <p>{shared.notFound}</p>
        <img src="/images/404.gif" alt="" />
        <Link to="/" className="btn btn-primary">
          {shared.backHome}
        </Link>
      </section>
    </main>
  )
}
