"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { CartProduct } from "@/types/Product";
interface CartContextProps {
  cartList: CartProduct[];
  setCartList: (list: CartProduct[]) => void;
  fetchCartData: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartList, setCartList] = useState<CartProduct[]>([]);

  const fetchCartData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/cart`, {
      cache: "no-store",
    });
    const json = await resp.json();
    setCartList(json);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cartList, setCartList, fetchCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
