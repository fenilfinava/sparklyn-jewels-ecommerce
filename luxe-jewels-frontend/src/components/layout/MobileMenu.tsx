"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { megaMenuData } from "./Header";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>("Shop");

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-50 transition-opacity lg:hidden" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 w-full max-w-[80vw] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 lg:hidden overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href="/" className="text-xl font-heading tracking-widest uppercase text-gray-900" onClick={onClose}>
            Sparklyn
          </Link>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col py-4">
          <div className="border-b border-gray-100">
            <button 
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium tracking-wider uppercase text-gray-900"
              onClick={() => setOpenSection(openSection === "Shop" ? null : "Shop")}
            >
              Shop
              {openSection === "Shop" ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
            </button>
            
            {openSection === "Shop" && (
              <div className="bg-gray-50 px-6 py-4 flex flex-col space-y-6">
                {megaMenuData.map((category, idx) => (
                  <div key={idx} className="flex flex-col space-y-3">
                    <Link 
                      href={category.href} 
                      className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase"
                      onClick={onClose}
                    >
                      {category.title}
                    </Link>
                    {category.links.map((link, lIdx) => (
                      <Link 
                        key={lIdx} 
                        href={link.href} 
                        className="text-gray-500 hover:text-gray-900 transition uppercase text-[11px] tracking-widest pl-2"
                        onClick={onClose}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/diamonds" onClick={onClose} className="px-6 py-4 text-sm font-medium tracking-wider uppercase text-gray-900 border-b border-gray-100">
            Diamonds
          </Link>
          <Link href="/sparklyn-assurance" onClick={onClose} className="px-6 py-4 text-sm font-medium tracking-wider uppercase text-gray-900 border-b border-gray-100">
            Sparklyn Assurance
          </Link>
          <Link href="/contact" onClick={onClose} className="px-6 py-4 text-sm font-medium tracking-wider uppercase text-gray-900 border-b border-gray-100">
            Contact
          </Link>
          <Link href="/about" onClick={onClose} className="px-6 py-4 text-sm font-medium tracking-wider uppercase text-gray-900 border-b border-gray-100">
            About Us
          </Link>
        </nav>

        <div className="mt-auto p-6 bg-gray-50 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Sign in or create an account</p>
        </div>
      </div>
    </>
  );
}
