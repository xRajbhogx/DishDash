import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  imageUrl?: string;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const initialItems: CartItem[] = [
  { id: '1', name: 'Margherita Pizza', price: 299, quantity: 1, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' }
];

const CartContext = createContext<CartContextType>({
  items: initialItems,
  cartCount: 1,
  addToCart: () => {},
  decrementQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  
  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const decrementQuantity = (id: string) => {
    setItems((prev) => prev.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };
  
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      cartCount,
      addToCart,
      decrementQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

