import React from 'react'
import Hero from './components/Hero'
import Why from './components/Why'
import ProductList from './components/ProductList'
import CTA from './components/CTA'
import SocialProof from './components/SocialProof'
import Footer from './components/Footer'

import PreviewBanner from './components/PreviewBanner'

export default function App() {
  return (
    <div className="app">
      <PreviewBanner />
      <Hero />
      <main>
        <Why />
        <ProductList />
        <CTA />
        <SocialProof />
      </main>
      <Footer />
    </div>
  )
}
