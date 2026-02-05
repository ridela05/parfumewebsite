import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faSprayCan } from '@fortawesome/free-solid-svg-icons'
import './CTA.css'

const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6282289906123'
const waMessage = encodeURIComponent('Halo, saya tertarik dengan parfum Beast. Tolong bantu saya melakukan pre-order.')

export default function CTA(){
  return (
    <section className="cta" aria-label="call-to-action">
      <div className="cta-inner">
        <div className="cta-visual">
          <div className="cta-icon-wrapper">
            <FontAwesomeIcon icon={faSprayCan} className="cta-icon" />
            <div className="icon-glow" />
          </div>
        </div>
        <div className="cta-text">
          <h2 style={{margin:'0 0 6px'}}>Siap Mencoba Aroma yang Berbeda?</h2>
          <p style={{margin:0,opacity:0.95}}>Pesan sekarang dan rasakan karakter Beast yang akan membedakan Anda dari yang lain. Klik untuk pesan lewat WhatsApp.</p>
        </div>
      </div>
      <div>
        <a className="btn" href={`https://wa.me/${waNumber}?text=${waMessage}`}>
          <FontAwesomeIcon icon={faWhatsapp} />
          <span>Pesan via WhatsApp</span>
        </a>
      </div>
    </section>
  )
}
