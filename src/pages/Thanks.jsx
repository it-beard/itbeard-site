import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { useTitle } from '../lib/useTitle'
import Md from '../lib/Md'

export default function Thanks() {
  const { lang } = useLang()
  const page = getPage('thanks', lang)
  useTitle(page.title)

  return (
    <main>
      <section className="container section page-head">
        <h1>{page.title}</h1>
        <Md className="prose" html={page.html} />
      </section>
    </main>
  )
}
