"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { collectionDescriptions } from "@/lib/products";
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Format slug to title (e.g., "solitaire-rings" -> "Solitaire Rings")
  const title = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').toUpperCase() : "";
  const description = collectionDescriptions[slug] ?? "Discover our curated collection of lab-grown IGI certified diamonds, crafted for timeless elegance.";

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${API_URL}/products?category=${slug}`)
      .then(r => r.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Collection Header */}
        <section className="pt-32 pb-12 text-center px-6 border-b border-gray-100">
          <h1 className="text-2xl md:text-3xl font-heading tracking-[0.2em] uppercase mb-5 text-gray-900">
            {title}
          </h1>
          <p className="text-gray-500 text-xs max-w-xl mx-auto leading-relaxed tracking-wide">
            {description}
          </p>
        </section>

        {/* Filter and Product Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6 lg:px-12">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between py-5 border-b border-gray-100 mb-12 relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-[10px] tracking-[0.2em] uppercase text-gray-600 hover:text-gray-900 transition gap-2"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Filter &amp; sort
              </button>

              <div className="flex items-center text-[10px] text-gray-500 cursor-pointer hover:text-gray-900 transition gap-1 tracking-widest uppercase">
                <span>Best selling</span>
                <ChevronDown className="w-3 h-3" />
              </div>

              {/* Filter Dropdown/Tray */}
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-full max-w-sm bg-white shadow-xl border border-gray-100 z-30 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Price Range</h4>
                      <div className="flex flex-col gap-2">
                        {["Under ₹10,000", "₹10,000 - ₹50,000", "Over ₹50,000"].map(price => (
                          <label key={price} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-3 h-3 border-gray-300 text-gray-900 focus:ring-gray-900" />
                            <span className="text-xs text-gray-600 group-hover:text-gray-900">{price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full mt-8 bg-gray-900 text-white py-3 text-[10px] uppercase tracking-widest hover:bg-gray-800 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="w-full aspect-square bg-gray-100 mb-5" />
                    <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 text-gray-500 text-sm tracking-[0.2em] uppercase font-medium bg-gray-50/50 border border-gray-100">
                Products Coming Soon.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product) => {
                  const imageUrl = product.images?.[0]?.url || product.imageUrl || null;
                  const hoverImageUrl = product.images?.[1]?.url || null;
                  
                  return (
                    <Link href={`/product/${product._id}`} key={product._id} className="group block">
                      <div className="w-full aspect-square bg-[#f8f8f8] mb-5 overflow-hidden relative flex items-center justify-center">
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

      </main>
      <Footer />
    </>
  );
}
