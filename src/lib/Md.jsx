import { useNavigate } from 'react-router-dom'

// Renders markdown-produced HTML; internal links navigate via the SPA router.
export default function Md({ html, tag: Tag = 'div', ...rest }) {
  const navigate = useNavigate()

  const onClick = (e) => {
    const a = e.target.closest('a')
    if (!a || a.target === '_blank') return
    const href = a.getAttribute('href')
    if (href?.startsWith('/')) {
      e.preventDefault()
      navigate(href)
    }
  }

  return <Tag onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
}
