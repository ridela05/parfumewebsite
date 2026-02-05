import React from 'react'
import './ProductCard.css'

const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '6282289906123'

export default function ProductCard({product}){
  const {name, description, price, category, image, featured} = product
  const priceNum = Number(String(price).replace(/[^0-9.-]/g, ''))
  const formattedPrice = Number.isFinite(priceNum) ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits:0 }).format(priceNum) : `Rp ${price}`
  const message = encodeURIComponent(`Halo, saya ingin memesan produk *${name}* dari Beast. Mohon info stok dan cara pesan. Harga: ${formattedPrice}`)

  return (
    <article className="product" aria-labelledby={`p-${product.id}`}>
      {featured && <div className="badge">⭐ Unggulan</div>}
      <button className="fav" aria-label="Tambahkan ke favorit">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <div className="no-image" aria-hidden>Gambar tidak tersedia</div>
      )}
      <div className="body">
        <div className="category">{category}</div>
        <h3 id={`p-${product.id}`}>{name}</h3>
        <p className="desc">{description}</p>

        <div className="product-footer">
          <div>
            <div className="price">{formattedPrice}</div>
          </div>

          <a className="btn buy" href={`https://wa.me/${waNumber}?text=${message}`} aria-label={`Beli ${name} sekarang`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M7 4H5l-1 2h2l3.6 7.59L8.25 16.04C8.03 16.47 8 17 8.37 17h8.26v-2H9.11l.28-.5L12.5 12h6.5c.78 0 1.45-.45 1.74-1.13L22 6H6.21L5.27 4H7zM7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span>Beli Sekarang</span>
          </a>
        </div>
      </div>
    </article>
  )
}
