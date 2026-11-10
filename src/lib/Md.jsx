import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import { useLang } from './LangContext'
import { getPage } from './content'

// Markdown links like [text](lightbox:/images/foo.png "caption") open the image
// in a Lightbox instead of navigating; the link title becomes the caption.
const LIGHTBOX = 'lightbox:'

// Renders markdown-produced HTML; internal links navigate via the SPA router.
export default function Md({ html, tag: Tag = 'div', ...rest }) {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const { lang } = useLang()

  const onClick = (e) => {
    const a = e.target.closest('a')
    if (!a || a.target === '_blank') return
    const href = a.getAttribute('href')
    if (href?.startsWith(LIGHTBOX)) {
      e.preventDefault()
      setLightbox({ src: href.slice(LIGHTBOX.length), caption: a.getAttribute('title') || a.textContent })
    } else if (href?.startsWith('/') && !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
      // a click with a modifier key asks for a new tab or window — the browser's business
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <>
      <Tag onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.caption}
          caption={lightbox.caption}
          closeLabel={getPage('shared', lang).labels.close}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}
