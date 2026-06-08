"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  variant: string; // e.g., "Size 6, 18K White Gold"
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variant: string) => void;
  updateQuantity: (id: string, variant: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotalCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );

      if (existingItemIndex > -1) {
        // Item exists with same variant, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      // New item
      return [...prevItems, newItem];
    });
    // Open drawer when added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, variant: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.variant === variant))
    );
  };

  const updateQuantity = (id: string, variant: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const cartTotalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
