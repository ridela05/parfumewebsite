import React from 'react'

export default function Footer(){
  return (
    <footer>
      <div style={{maxWidth:'var(--max-width)',margin:'0 auto'}}>
        <small>© {new Date().getFullYear()} Beast. All rights reserved. Designed with AIDA principles.</small>
      </div>
    </footer>
  )
}
