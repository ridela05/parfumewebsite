import React, { useRef } from 'react'
import './SocialProof.css'

const testimonials = [
  {id:1, rating:5, text:'Aromanya khas dan tahan lama — jadi banyak pujian!', name:'Rina, Jakarta'},
  {id:2, rating:5, text:'Aroma berkarakter yang mengangkat percaya diri saya.', name:'Bagas, Bandung'},
  {id:3, rating:5, text:'Kualitas premium tapi terasa personal. Recommended.', name:'Maya, Surabaya'},
  {id:4, rating:5, text:'Wangi elegan dan tahan seharian. Bikin mood bagus!', name:'Dewi, Yogyakarta'},
]

function Stars({count = 5}){
  return (
    <div className="stars" aria-hidden>
      {Array.from({length: count}).map((_, i)=> (
        <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="#F6C55F" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 .587l3.668 7.431L23.6 9.75l-5.4 5.266L19.335 24 12 19.897 4.665 24l1.135-8.984L.4 9.75l7.932-1.732L12 .587z" />
        </svg>
      ))}
    </div>
  )
}

export default function SocialProof(){
  const containerRef = useRef(null)
  const [active, setActive] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const gap = 16

  // Keep track of active slide based on scroll position
  React.useEffect(()=>{
    const el = containerRef.current
    if(!el) return
    const onScroll = () => {
      const card = el.querySelector('.card')
      const step = (card ? card.offsetWidth : el.clientWidth * 0.8) + gap
      const idx = Math.round(el.scrollLeft / step)
      setActive(Math.min(Math.max(idx, 0), testimonials.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return ()=> el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToIndex = (i) => {
    const el = containerRef.current
    if(!el) return
    const card = el.querySelector('.card')
    const step = (card ? card.offsetWidth : el.clientWidth * 0.8) + gap
    const left = i * step
    el.scrollTo({ left, behavior: 'smooth' })
    setActive(i)
  }

  const next = () => scrollToIndex((active + 1) % testimonials.length)
  const prev = () => scrollToIndex((active - 1 + testimonials.length) % testimonials.length)

  // Autoplay (pauses on hover/focus)
  React.useEffect(()=>{
    if(isPaused) return
    const id = setInterval(()=>{
      next()
    }, 4000)
    return ()=>clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isPaused])

  const handleMouseEnter = ()=> setIsPaused(true)
  const handleMouseLeave = ()=> setIsPaused(false)
  const handleFocus = ()=> setIsPaused(true)
  const handleBlur = ()=> setIsPaused(false)

  return (
    <section className="social-proof" aria-labelledby="social-proof">
      <div className="social-proof-header">
        <h2 id="social-proof">Apa kata mereka yang sudah membeli?</h2>
        <p className="sub">Tanggapan jujur dari pelanggan kami</p>
      </div>

      <div className="carousel-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button className="nav prev" aria-label="Geser ke kiri" onClick={prev}>&lt;</button>

        <div className="socials-carousel" ref={containerRef} tabIndex={0} role="list" onFocus={handleFocus} onBlur={handleBlur}>
          {testimonials.map((t, i)=> (
            <article key={t.id} className="card" role="listitem">
              <Stars count={t.rating} />
              <p className="quote">"{t.text}"</p>
              <div className="author">— {t.name}</div>
            </article>
          ))}
        </div>

        <button className="nav next" aria-label="Geser ke kanan" onClick={next}>&gt;</button>
      </div>

      <div className="dots" role="tablist" aria-label="Indikator testimonial">
        {testimonials.map((_, i)=> (
          <button key={i} className={"dot" + (i === active ? ' active' : '')} aria-label={`Slide ${i + 1}`} aria-current={i === active ? 'true' : 'false'} onClick={()=>scrollToIndex(i)} />
        ))}
      </div>

      <p className="note">Geser untuk melihat lebih banyak testimonial</p>
    </section>
  )
}
