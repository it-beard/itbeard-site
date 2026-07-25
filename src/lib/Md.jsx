import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lightbox from '../components/Lightbox'

// Markdown links like [text](lightbox:/images/foo.png "caption") open the image
// in a Lightbox instead of navigating; the link title becomes the caption.
const LIGHTBOX = 'lightbox:'

// Renders markdown-produced HTML; internal links navigate via the SPA router.
export default function Md({ html, tag: Tag = 'div', ...rest }) {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)

  const onClick = (e) => {
    const a = e.target.closest('a')
    if (!a || a.target === '_blank') return
    const href = a.getAttribute('href')
    if (href?.startsWith(LIGHTBOX)) {
      e.preventDefault()
      setLightbox({ src: href.slice(LIGHTBOX.length), caption: a.getAttribute('title') || a.textContent })
    } else if (href?.startsWith('/')) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <>
      <Tag onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.caption} caption={lightbox.caption} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
