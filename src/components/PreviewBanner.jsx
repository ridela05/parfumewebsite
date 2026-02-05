import React from 'react'

const usePreview = import.meta.env.VITE_CONTENTFUL_USE_PREVIEW === '1' || import.meta.env.VITE_CONTENTFUL_USE_PREVIEW === 'true'

export default function PreviewBanner(){
  if (!usePreview) return null
  return (
    <div style={{background:'#b2693b',color:'white',padding:'8px 12px',textAlign:'center',fontSize:14}}>
      Anda sedang melihat konten dari <strong>Contentful Preview</strong>. Beberapa konten mungkin belum dipublikasikan.
    </div>
  )
}
