"use client";

import React from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-sm font-heading tracking-widest uppercase">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-gray-200" />
              <p className="text-xs tracking-widest text-gray-500 uppercase">Your cart is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-8 py-3 bg-gray-900 text-white text-[10px] tracking-widest uppercase hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-50 relative flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <span className="text-[8px] uppercase tracking-widest text-gray-400">No Image</span>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-medium text-gray-900 leading-snug">{item.name}</h3>
                        <p className="text-[10px] text-gray-500 mt-1">{item.variant}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="text-gray-400 hover:text-gray-900 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs font-medium">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-gray-500">Subtotal</span>
              <span className="text-sm font-medium">Calculated at checkout</span>
            </div>
            <p className="text-[10px] text-gray-500 mb-6 text-center">Shipping & taxes calculated at checkout</p>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full block text-center px-8 py-4 bg-gray-900 text-white text-[10px] tracking-widest uppercase hover:bg-gray-800 transition"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
