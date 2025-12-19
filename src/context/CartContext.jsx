import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, cartQuantity: 1 }];
      }
    });
    // Optional: alert(`${product.name} added!`);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // NEW: Clear Cart (Call this after successful checkout)
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.cartQuantity, 
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};