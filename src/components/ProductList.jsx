import React, {useEffect, useState} from 'react'
import { getParfumes } from '../lib/contentful'
import ProductCard from './ProductCard'

export default function ProductList(){
  const [parfums, setParfums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    getParfumes().then((items)=>{
      if(!mounted) return
      // Featured first
      const sorted = items.sort((a,b)=> (b.featured === a.featured) ? 0 : (b.featured?1:-1))
      setParfums(sorted)
    }).catch((e)=>{
      setError('Gagal mengambil data produk')
      console.error(e)
    }).finally(()=>setLoading(false))

    return ()=> mounted = false
  },[])

  return (
    <section aria-labelledby="products-title">
      <div className="products-header" style={{textAlign:'center'}}>
        <div className="star">⭐</div>
        <h2 id="products-title">Koleksi Unggulan</h2>
      </div>
      {loading && <p>Memuat produk...</p>}
      {error && (
        <div>
          <p style={{color:'crimson'}}>{error}</p>
          <button className="btn" onClick={() => { setLoading(true); setError(null); getParfumes().then(items=>{ const sorted = items.sort((a,b)=> (b.featured === a.featured) ? 0 : (b.featured?1:-1)); setParfums(sorted); }).catch(e=> setError('Gagal mengambil data produk')).finally(()=>setLoading(false)) }}>Muat ulang</button>
        </div>
      )}

      {!loading && !error && parfums.length === 0 && (
        <div className="card">Belum ada produk untuk saat ini.</div>
      )}

      <div className="products">
        {parfums.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
