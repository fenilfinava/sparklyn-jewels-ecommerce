"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ChevronRight, ShieldCheck, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotalCount } = useCart();
  const [email, setEmail] = useState("");
  
  // Calculate Subtotal dynamically
  // Since prices are currently strings like "From $2,500.00 USD", we need to extract the number for calculation.
  // In a real app, prices would be stored as numbers. Here we parse the string for the mock.
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceString = item.price.replace(/[^0-9.]/g, "");
      const numericPrice = parseFloat(priceString) || 0;
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateTotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + shipping + tax;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      
      {/* Left Column: Forms */}
      <div className="w-full lg:w-[55%] xl:w-[60%] order-2 lg:order-1 pt-10 pb-24 px-6 lg:px-12 xl:px-24">
        
        {/* Simplified Header */}
        <div className="mb-12 text-center lg:text-left">
          <Link href="/" className="text-3xl font-heading tracking-[0.2em] uppercase text-gray-900">
            Sparklyn
          </Link>
          
          <nav className="flex items-center justify-center lg:justify-start space-x-2 text-[10px] tracking-widest uppercase text-gray-400 mt-6">
            <Link href="/cart" className="hover:text-gray-900 transition">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Information</span>
            <ChevronRight className="w-3 h-3" />
            <span>Shipping</span>
            <ChevronRight className="w-3 h-3" />
            <span>Payment</span>
          </nav>
        </div>

        <form className="max-w-2xl mx-auto lg:mx-0 space-y-12">
          
          {/* Contact Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading tracking-widest uppercase text-gray-900">Contact Information</h2>
              <p className="text-[10px] tracking-wider text-gray-500 uppercase">
                Already have an account? <Link href="/login" className="text-gray-900 underline hover:text-gray-600">Log in</Link>
              </p>
            </div>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="flex items-center gap-2 mt-4 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900" defaultChecked />
              <span className="text-xs text-gray-600 group-hover:text-gray-900">Email me with news and exclusive offers</span>
            </label>
          </section>

          {/* Shipping Address Section */}
          <section>
            <h2 className="text-lg font-heading tracking-widest uppercase text-gray-900 mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <select className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition text-gray-700 bg-white">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
              <input type="text" placeholder="First name" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              <input type="text" placeholder="Last name" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              <div className="md:col-span-2">
                <input type="text" placeholder="Address" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              </div>
              <div className="md:col-span-2">
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              </div>
              <input type="text" placeholder="City" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition text-gray-700 bg-white">
                  <option>State</option>
                  <option>CA</option>
                  <option>NY</option>
                  <option>TX</option>
                </select>
                <input type="text" placeholder="ZIP code" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              </div>
              <div className="md:col-span-2">
                <input type="tel" placeholder="Phone" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" />
              </div>
            </div>
          </section>

          {/* Payment Section (Mock) */}
          <section>
            <h2 className="text-lg font-heading tracking-widest uppercase text-gray-900 mb-6">Payment</h2>
            <p className="text-xs text-gray-500 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" /> All transactions are secure and encrypted.
            </p>
            <div className="border border-gray-200 bg-gray-50 p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Credit Card</span>
                <div className="flex gap-2">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <input type="text" placeholder="Card number" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition bg-white" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Expiration date (MM/YY)" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition bg-white" />
                <input type="text" placeholder="Security code" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition bg-white" />
              </div>
              <input type="text" placeholder="Name on card" className="w-full border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition bg-white" />
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="button" 
              className="w-full bg-gray-900 text-white py-5 text-sm tracking-widest uppercase font-medium hover:bg-gray-800 transition"
              onClick={(e) => {
                e.preventDefault();
                alert("This is a frontend demo! Backend checkout integration will happen in Phase 2.");
              }}
            >
              Pay Now
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-6 mt-12 flex justify-center space-x-6 text-[10px] tracking-widest uppercase text-gray-400">
            <Link href="/refunds" className="hover:text-gray-900 transition">Refund Policy</Link>
            <Link href="/shipping" className="hover:text-gray-900 transition">Shipping Policy</Link>
            <Link href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition">Terms of Service</Link>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full lg:w-[45%] xl:w-[40%] order-1 lg:order-2 bg-gray-50 border-b lg:border-b-0 lg:border-l border-gray-200 pt-10 pb-12 px-6 lg:px-12 xl:px-16">
        <div className="sticky top-10">
          
          {/* Mobile Toggle Summary (Only visible on small screens usually, but we'll show contents directly for simplicity) */}
          <div className="lg:hidden mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-sm font-heading tracking-widest uppercase text-gray-900">Order Summary ({cartTotalCount})</h2>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-sm font-heading tracking-widest uppercase text-gray-900">Order Summary</h2>
          </div>

          {/* Items List */}
          <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.length === 0 ? (
              <p className="text-xs text-gray-500 uppercase tracking-widest">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white border border-gray-200 relative flex items-center justify-center overflow-hidden rounded-md">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <span className="text-[6px] uppercase tracking-widest text-gray-400">No Img</span>
                      )}
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-gray-900 leading-snug">{item.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-1">{item.variant}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.price}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Discount Code */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
            <input 
              type="text" 
              placeholder="Gift card or discount code" 
              className="flex-1 border border-gray-200 p-4 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition bg-white" 
            />
            <button className="bg-gray-200 text-gray-500 px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-300 transition">
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Estimated taxes</span>
              <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center">
            <span className="text-base text-gray-900 uppercase tracking-widest font-heading">Total</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">USD</span>
              <span className="text-2xl font-medium text-gray-900">{formatPrice(total)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
