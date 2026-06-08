"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

// Admin can fetch and populate this data dynamically in the future
export const megaMenuData = [
  {
    title: "Rings",
    href: "/collections/rings",
    links: [
      { name: "Solitaire Rings", href: "/collections/solitaire-rings" },
      { name: "Bands", href: "/collections/bands" },
      { name: "Engagement Rings", href: "/collections/engagement-rings" },
      { name: "Halo Rings", href: "/collections/halo-rings" },
      { name: "Three Stone Rings", href: "/collections/three-stone-rings" },
    ],
  },
  {
    title: "Earrings",
    href: "/collections/earrings",
    links: [
      { name: "Studs", href: "/collections/studs" },
      { name: "Halo Studs", href: "/collections/halo-studs" },
      { name: "Diamond Hoops", href: "/collections/diamond-hoops" },
    ],
  },
  {
    title: "Pendants",
    href: "/collections/necklaces",
    links: [
      { name: "Solitaire", href: "/collections/solitaire-pendants" },
      { name: "Halo", href: "/collections/halo-pendants" },
    ],
  },
  {
    title: "Bracelet",
    href: "/collections/bracelets",
    links: [
      { name: "Tennis", href: "/collections/tennis-bracelets" },
      { name: "Chain", href: "/collections/chain-bracelets" },
      { name: "Statement", href: "/collections/statement-bracelets" },
    ],
  },
];

export default function Header() {
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cartTotalCount } = useCart();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsShopHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsShopHovered(false);
    }, 250); // 250ms delay allows diagonal mouse movement without closing
  };

  return (
    <>
      <header className="absolute top-0 w-full z-40 flex flex-col justify-center">
        {/* Announcement Bar */}
        <div className="w-full bg-[#111111] text-white/90 text-center py-2 px-4 text-[9px] tracking-[0.2em] uppercase">
          Free Insured Shipping Worldwide &nbsp;&bull;&nbsp; 30-Day Returns &nbsp;&bull;&nbsp; Lifetime Warranty
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-[100px] relative gap-8">
          
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-4 lg:gap-0 z-10">
            <button 
              className="lg:hidden text-white hover:text-gray-300 transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="text-2xl md:text-3xl font-heading tracking-widest uppercase text-white">
              Sparklyn
            </Link>
          </div>

          {/* Center: Navigation (Desktop) - Standard Flex Flow */}
          <div className="hidden lg:flex flex-1 justify-center z-10 px-8">
            <nav className="flex items-center space-x-6 xl:space-x-8 text-[11px] xl:text-xs font-medium tracking-[0.15em] text-white h-full">
              <div 
                className="h-full flex items-center cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="flex items-center hover:text-gray-300 transition-colors uppercase h-full py-8">
                  Shop <ChevronDown className="ml-1 w-3 h-3" />
                </span>
                
                {/* Mega Menu */}
                {isShopHovered && (
                  <div className="fixed top-[132px] left-0 w-full bg-white shadow-2xl border-t border-gray-100 overflow-hidden text-gray-900 cursor-default">
                    <div className="container mx-auto px-6 lg:px-12">
                      <div className="grid grid-cols-6 min-h-[400px] border-x border-gray-100">
                        {megaMenuData.map((category, idx) => (
                          <div key={idx} className="flex flex-col space-y-4 p-10 border-r border-gray-100 bg-white hover:bg-gray-50/50 transition-colors">
                            <Link href={category.href} className="text-xs font-bold tracking-[0.2em] mb-4 text-gray-900 uppercase hover:text-gray-500 transition">
                              {category.title}
                            </Link>
                            {category.links.map((link, lIdx) => (
                              <Link key={lIdx} href={link.href} className="text-gray-500 hover:text-gray-900 transition uppercase text-[10px] tracking-widest">
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                        {/* Logo Section */}
                        <div className="col-span-2 flex items-center justify-center bg-gray-50 p-10">
                          <div className="text-center">
                            <h2 className="text-3xl font-heading tracking-[0.3em] text-gray-900 uppercase mb-3">Sparklyn</h2>
                            <div className="w-12 h-[1px] bg-gray-300 mx-auto mb-3"></div>
                            <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Fine Jewelry</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/diamonds" className="hover:text-gray-300 transition-colors uppercase flex items-center py-8">Diamonds</Link>
              <Link href="/sparklyn-assurance" className="hover:text-gray-300 transition-colors uppercase flex items-center py-8">Sparklyn Assurance</Link>
              <Link href="/contact" className="hover:text-gray-300 transition-colors uppercase flex items-center py-8">Contact</Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors uppercase flex items-center py-8">About Us</Link>
            </nav>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end space-x-4 md:space-x-6 text-white z-10 w-[120px]">
            <button className="hover:text-gray-300 transition hidden md:block"><Search className="w-5 h-5" /></button>
            <Link href="/admin/login" className="hover:text-gray-300 transition hidden md:block">
              <User className="w-5 h-5" />
            </Link>
            <button 
              className="hover:text-gray-300 transition relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-gray-900 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartTotalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Slide-outs */}
      <CartDrawer />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
