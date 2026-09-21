import { useCallback, useEffect, useRef, useState } from 'react'

// Horizontal snap-scrolling strip of cover tiles (wanted books, wanted records).
// Each arrow shows only while there is something left to scroll to on its side.
// `tall` moves the arrows down to the middle of portrait covers.
export default function CoverRail({ labels, tall = false, children }) {
  const rail = useRef(null)
  const [edges, setEdges] = useState({ prev: false, next: false })

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    setEdges({
      prev: el.scrollLeft > 4,
      next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure, children])

  const scroll = (dir) => {
    const el = rail.current
    const tile = el.firstElementChild
    el.scrollBy({ left: dir * ((tile?.offsetWidth ?? 200) + 34), behavior: 'smooth' })
  }

  return (
    <div className={`cover-rail-wrap${tall ? ' cover-rail-tall' : ''}`}>
      <div className="cover-rail" ref={rail} onScroll={measure}>
        {children}
      </div>
      <button
        type="button"
        className="cover-rail-arrow cover-rail-prev"
        aria-label={labels.scrollPrev}
        hidden={!edges.prev}
        onClick={() => scroll(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="cover-rail-arrow cover-rail-next"
        aria-label={labels.scrollNext}
        hidden={!edges.next}
        onClick={() => scroll(1)}
      >
        ›
      </button>
    </div>
  )
}
