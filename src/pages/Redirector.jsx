import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { REDIRECTS } from '../data/site'

export default function Redirector() {
  const { key } = useParams()
  const target = REDIRECTS[key?.toLowerCase()]

  useEffect(() => {
    if (target) window.location.replace(target)
  }, [target])

  if (!target) return <Navigate to="/" replace />
  return null
}
