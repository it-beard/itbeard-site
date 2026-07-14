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
        <div>{shared.notFound}</div>
      </section>
    </main>
  )
}
