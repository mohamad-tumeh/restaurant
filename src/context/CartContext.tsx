import React, { createContext, useState, useCallback, useMemo } from "react";
import { Item } from "../types/Item";
import { Cart } from "../types/Cart";

interface CartContextType {
    cart: { items: Item[]; total: number };
    addItemToCart: (item: Item, quantity: number, extrasTotal: number) => void;
}

interface CartContextType {
    cart: Cart;
    addItemToCart: (item: Item, quantity: number, extrasTotal: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

    const addItemToCart = useCallback((item: Item, quantity: number, extrasTotal: number) => {
        setCart((prevCart) => {
            const updatedItems = [...prevCart.items, { ...item, quantity, extrasTotal }];
            const updatedTotal = prevCart.total + (item.price * quantity) + extrasTotal;
            return { items: updatedItems, total: updatedTotal };
        });
    }, []);

    const value = useMemo(() => ({ cart, addItemToCart }), [cart, addItemToCart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};