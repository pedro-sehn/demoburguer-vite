import React, { createContext, useState, useContext } from "react";
import type { CartItem } from "../types/cart-item";

interface CartContextType {
  cartItems: CartItem[] & { total_price: number; total_items: number };
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.reduce<CartItem[]>((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const total_price = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total_items = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: Object.assign([...cartItems], { total_price, total_items }),
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
