import React, { useEffect, useState } from 'react'
import { getParfumes } from '../lib/contentful'
import './Hero.css'

const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6282289906123'
const waMessage = encodeURIComponent('Halo, saya tertarik dengan parfum Beast. Saya ingin memesan dan butuh info lebih lanjut.')

export default function Hero(){
  const [featuredImage, setFeaturedImage] = useState(null)

  useEffect(()=>{
    let mounted = true
    getParfumes().then(items => {
      if (!mounted) return
      const featured = items.find(i => i.featured) || items[0]
      setFeaturedImage(featured?.image || null)
    }).catch(()=>{})
    return ()=> mounted = false
  },[])

  return (
    <header className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <h1>Wangi Yang Berkarakter<br/>dan Aura Yang Tak<br/>Terlupakan</h1>
          <p className="hero-lead">Temukan koleksi parfum pria eksklusif yang dirancang khusus untuk mencerminkan kepribadian unik Anda. Setiap tetes mengandung karakter kuat yang membedakan Anda dari yang lain.</p>

          <a className="btn hero-buy" href={`https://wa.me/${waNumber}?text=${waMessage}`} aria-label="Beli Sekarang via WhatsApp">
            <svg className="icon cart" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 4H5l-1 2h2l3.6 7.59L8.25 16.04C8.03 16.47 8 17 8.37 17h8.26v-2H9.11l.28-.5L12.5 12h6.5c.78 0 1.45-.45 1.74-1.13L22 6H6.21L5.27 4H7zM7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span>Beli Sekarang</span>
          </a>
        </div>

        {featuredImage && (
          <div className="hero-right" aria-hidden>
            <div className="image-frame">
              <img src={featuredImage} alt="Beast perfume" />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
