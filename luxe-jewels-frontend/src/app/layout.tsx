import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sparklyn Jewels | Premium Lab-Grown Diamond Jewelry",
  description: "Lab-Grown, IGI Certified. Crafted In-House. Designed To Last.",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col text-gray-900 bg-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
