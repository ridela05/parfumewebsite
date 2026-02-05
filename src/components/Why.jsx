import React from 'react'
import './Why.css'

export default function Why(){
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why-header" style={{gridColumn:'1/-1',textAlign:'center'}}>
        <h2 id="why-title">Mengapa Memilih Beast Parfume?</h2>
        <p className="lead">Lebih dari sekadar wangi, parfum kami menghadirkan pengalaman berkarakter yang menggugah jiwa maskulin Anda.</p>
      </div>

      <div className="why-grid">
        <article className="why-card">
          <div className="icon-circle">💎</div>
          <h3>Kualitas Premium</h3>
          <p>Dibuat dari bahan-bahan terbaik dengan formula eksklusif yang tahan lama, memberikan kesan elegan dan berkelas.</p>
        </article>

        <article className="why-card">
          <div className="icon-circle">❤️</div>
          <h3>Aroma Berkarakter</h3>
          <p>Setiap parfum memiliki karakter unik yang mencerminkan kepribadian maskulin modern — tidak generik, tapi berkesan.</p>
        </article>

        <article className="why-card">
          <div className="icon-circle">👑</div>
          <h3>Eksklusivitas</h3>
          <p>Koleksi terbatas yang membuat Anda tampil beda dan meninggalkan kesan pada setiap kesempatan.</p>
        </article>
      </div>
    </section>
  )
}
