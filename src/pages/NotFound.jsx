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
        <span className="nf-num">404</span>
        <p>{shared.notFound}</p>
        <Link to="/" className="btn btn-primary">
          {shared.backHome}
        </Link>
      </section>
    </main>
  )
}
