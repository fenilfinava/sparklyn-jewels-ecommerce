"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [heroTitle, setHeroTitle] = useState('Engagement Rings');
  const [heroSubtitle, setHeroSubtitle] = useState('Lab Grown - IGI Certified');
  const [heroImage, setHeroImage] = useState('/hero-bg.png');
  const [heroButtonText, setHeroButtonText] = useState('Shop Now');
  const [heroButtonLink, setHeroButtonLink] = useState('/collections/engagement-rings');

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(r => r.json())
      .then(data => setNewArrivals(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => {});

    fetch(`${API_URL}/homepage`)
      .then(r => r.json())
      .then(data => {
        if (data) {
          setHeroTitle(data.heroTitle || 'Engagement Rings');
          setHeroSubtitle(data.heroSubtitle || 'Lab Grown - IGI Certified');
          setHeroImage(data.heroImage || '/hero-bg.png');
          setHeroButtonText(data.heroButtonText || 'Shop Now');
          setHeroButtonLink(data.heroButtonLink || '/collections/engagement-rings');
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        
        {/* Hero Section */}
        <section className="relative w-full h-screen min-h-[600px] flex items-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-[center_top_60%] bg-no-repeat transition-all duration-700" 
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl text-left text-white mt-12">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-6 block text-gray-200">
                {heroSubtitle}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-widest uppercase mb-10 leading-tight drop-shadow-lg">
                {heroTitle}
              </h2>
              <Link href={heroButtonLink} className="inline-block border-b border-white pb-1.5 text-xs md:text-sm tracking-[0.2em] uppercase hover:text-gray-300 hover:border-gray-300 transition-colors">
                {heroButtonText}
              </Link>
            </div>
          </div>
        </section>

        {/* Shop By Shape */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-xl font-heading tracking-widest uppercase mb-12 text-gray-900">
              Shop By Shape
            </h2>
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar justify-start xl:justify-center gap-6 md:gap-8 lg:gap-10 pb-4 px-2">
              {['Round', 'Emerald', 'Princess', 'Cushion', 'Oval', 'Pear', 'Marquise', 'Asscher', 'Heart'].map((shape) => {
                return (
                  <Link href={`/collections/${shape.toLowerCase()}`} key={shape} className="group flex flex-col items-center">
                    <div className="w-20 h-20 relative flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                      <Image 
                        src={`/diamonds/${shape.toLowerCase()}.png`} 
                        alt={`${shape} cut diamond`}
                        fill
                        className="object-contain mix-blend-multiply brightness-[1.05] contrast-[1.2] grayscale-[0.2]"
                      />
                    </div>
                    <span className="text-[10px] font-medium tracking-widest uppercase text-gray-900">
                      {shape}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compare Slider section removed as requested during dead-code cleanup */}

        {/* New Arrivals */}
        <section className="py-24 bg-[#faf9f8]">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <span className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4 block">Our Latest Arrivals</span>
            <h2 className="text-2xl font-heading tracking-widest uppercase mb-16 text-gray-900">
              New Arrivals — Solitaire Engagement Rings
            </h2>
            {newArrivals.length === 0 ? (
              <div className="text-center py-24 text-gray-500 text-sm tracking-[0.2em] uppercase font-medium bg-gray-50/50 border border-gray-200">
                Data Coming Soon
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
                {newArrivals.map((product) => {
                  const imageUrl = product.images?.[0]?.url || product.imageUrl || null;
                  const hoverImageUrl = product.images?.[1]?.url || null;
                  return (
                    <Link href={`/product/${product._id}`} key={product._id} className="group block">
                      <div className="w-full aspect-square bg-gray-50 mb-6 overflow-hidden relative border border-gray-100 flex items-center justify-center">
                        {imageUrl ? (
                          <>
                            <Image
                              src={imageUrl}
                              alt={product.title}
                              fill
                              className={`object-cover transition-all duration-700 ${hoverImageUrl ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'}`}
                            />
                            {hoverImageUrl && (
                              <Image
                                src={hoverImageUrl}
                                alt={`${product.title} alternate view`}
                                fill
                                className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105 absolute inset-0"
                              />
                            )}
                          </>
                        ) : (
                          <span className="text-[10px] uppercase tracking-widest text-gray-400">Image Coming Soon</span>
                        )}
                      </div>
                      <h3 className="text-xs font-heading tracking-wide text-gray-900 mb-1.5 leading-snug">{product.title}</h3>
                      <p className="text-xs text-gray-500 tracking-wide">₹{Number(product.price).toLocaleString('en-IN')}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Signature Collections */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl font-heading tracking-widest uppercase mb-16 text-gray-900">
              Our Signature Collections
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Rings", link: "/collections/rings" },
                { name: "Earrings", link: "/collections/earrings" },
                { name: "Bracelets", link: "/collections/bracelets" },
                { name: "Necklaces", link: "/collections/necklaces" }
              ].map((collection) => (
                <Link href={collection.link} key={collection.name} className="group flex flex-col items-center">
                  <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden relative">
                    <Image 
                      src={`/collections/${collection.name.toLowerCase()}.png`} 
                      alt={collection.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-gray-900">
                    {collection.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Values / Trust Badges */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-6 border border-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3">IGI Certified</h3>
                <p className="text-[10px] text-gray-400 leading-relaxed max-w-[200px]">Every diamond is rigorously graded and certified by the IGI.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-6 border border-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3">Conflict Free</h3>
                <p className="text-[10px] text-gray-400 leading-relaxed max-w-[200px]">100% ethically grown diamonds with zero human or environmental toll.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-6 border border-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3">Lifetime Warranty</h3>
                <p className="text-[10px] text-gray-400 leading-relaxed max-w-[200px]">We stand behind our craftsmanship with a comprehensive warranty.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-6 border border-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3">Free Insured Shipping</h3>
                <p className="text-[10px] text-gray-400 leading-relaxed max-w-[200px]">Fully insured global delivery straight to your door, on us.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram / Social Gallery */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <span className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4 block">Follow Us</span>
            <h2 className="text-2xl font-heading tracking-widest uppercase mb-16 text-gray-900">
              @SparklynJewels
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="w-full aspect-square bg-gray-50 relative group overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[10px] uppercase tracking-widest bg-gray-100">
                    Instagram Post
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
