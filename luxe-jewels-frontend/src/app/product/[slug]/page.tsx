"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ChevronDown, Plus, Minus, Check } from "lucide-react";
import { useParams } from "next/navigation";

const METALS = ["18K White Gold", "18K Yellow Gold", "18K Rose Gold", "24K Yellow Gold", "Platinum"];
const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8"];
const BRACELET_SIZES = ["6.0 inches", "6.5 inches", "7.0 inches", "7.5 inches"];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string; // This is now the product ID
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setProduct(data);
          if (data.metals && data.metals.length > 0) {
            setSelectedMetal(data.metals[0]);
          } else {
            setSelectedMetal({ metalType: METALS[0], price: data.price });
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        }
      })
      .catch(console.error);
  }, [slug]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center pt-32">
          <p className="tracking-widest uppercase text-gray-500">Loading Product...</p>
        </main>
        <Footer />
      </>
    );
  }

  const isRing = product.mainCategory === "Rings";
  const isBracelet = product.mainCategory === "Bracelets";
  
  const handleAddToCart = () => {
    let sizeText = "";
    if ((product.sizes && product.sizes.length > 0) || isRing || isBracelet) {
       sizeText = `Size ${selectedSize || (product.sizes?.[0] || "6")}`;
    }
    
    const variantStr = [selectedMetal?.metalType, sizeText].filter(Boolean).join(", ");

    addToCart({
      id: product._id,
      name: product.title,
      price: currentPrice,
      image: product.images?.[0]?.url,
      quantity,
      variant: variantStr
    });
  };

  const images = product.images || [];
  const mainImage = images[activeImageIndex]?.url || null;
  
  const currentPrice = selectedMetal?.price || product.price;
  const totalPrice = currentPrice * quantity;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 lg:pt-32 pb-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left: Product Images */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square bg-[#f8f8f8] relative flex items-center justify-center border border-gray-100 overflow-hidden">
                {mainImage ? (
                  <Image src={mainImage} alt={product.title} fill className="object-cover" />
                ) : (
                  <span className="text-xs uppercase tracking-widest text-gray-400">Image Coming Soon</span>
                )}
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img: any, idx: number) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveImageIndex(idx)}
                      className={`aspect-square bg-[#f8f8f8] relative flex items-center justify-center cursor-pointer transition border overflow-hidden ${activeImageIndex === idx ? 'border-gray-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={img.url} alt={`${product.title} view ${idx+1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col pt-8 lg:pt-12">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-4 block">Lab Grown Diamond</span>
              <h1 className="text-3xl lg:text-4xl font-heading tracking-widest uppercase text-gray-900 mb-6 leading-snug">
                {product.title}
              </h1>
              <div className="mb-8">
                <p className="text-xl text-gray-900 tracking-wider">₹{Number(product.price).toLocaleString('en-IN')}</p>
              </div>

              {/* Options */}
              <div className="space-y-8 mb-10 border-t border-b border-gray-100 py-8">
                
                {/* Metal Selection */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">Metal</span>
                    <span className="text-xs text-gray-500">{selectedMetal?.metalType}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(product.metals && product.metals.length > 0 ? product.metals : METALS.map(m => ({ metalType: m, price: product.price }))).map((metal: any) => (
                      <button 
                        key={metal.metalType}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-4 py-3 text-[10px] tracking-widest uppercase border transition-colors ${
                          selectedMetal?.metalType === metal.metalType ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {metal.metalType}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                {((product.sizes && product.sizes.length > 0) || isRing || isBracelet) && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">{product.sizes && product.sizes.length > 0 ? "Size" : (isRing ? "Ring Size" : "Length")}</span>
                      <button className="text-[10px] tracking-widest text-gray-500 underline uppercase">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {(product.sizes && product.sizes.length > 0 ? product.sizes : (isRing ? RING_SIZES : BRACELET_SIZES)).map((size: string) => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 text-[10px] tracking-widest uppercase border transition-colors ${
                            selectedSize === size ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Price & Add to Cart Area */}
              <div className="mb-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mr-2">Total Price:</span>
                <span className="text-lg font-medium text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex gap-4 mb-12">
                <div className="flex items-center border border-gray-200 w-32 justify-between">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-4 text-gray-500 hover:text-gray-900 transition"><Minus className="w-4 h-4" /></button>
                  <span className="text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-4 text-gray-500 hover:text-gray-900 transition"><Plus className="w-4 h-4" /></button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 text-white hover:bg-gray-800 transition py-4 text-xs tracking-[0.2em] uppercase font-medium"
                >
                  Add to Cart
                </button>
              </div>

              {/* Description Accordions */}
              <div className="border-t border-gray-100 divide-y divide-gray-100">
                <div className="py-6">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4 flex justify-between items-center cursor-pointer">
                    Description <ChevronDown className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-gray-500 leading-loose">
                    {product.description || `A masterpiece of modern craftsmanship, this ${product.title.toLowerCase()} features stunning IGI-certified lab-grown diamonds expertly set to maximize brilliance. Designed with meticulous attention to detail, this piece offers enduring elegance for a lifetime.`}
                  </p>
                </div>
                <div className="py-6">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 flex justify-between items-center cursor-pointer text-gray-500 hover:text-gray-900 transition">
                    Shipping & Returns <Plus className="w-4 h-4" />
                  </h3>
                </div>
                <div className="py-6">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 flex justify-between items-center cursor-pointer text-gray-500 hover:text-gray-900 transition">
                    Diamond Details <Plus className="w-4 h-4" />
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
