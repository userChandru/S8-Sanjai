import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    console.log('Adding to cart:', item); // Debug log
    setCartItems(prevItems => {
      // Check if item already exists by name instead of id
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        // Update quantity if item exists but preserve all other properties
        return prevItems.map(i => 
          i.name === item.name 
            ? { ...item, quantity: i.quantity + 1 }
            : i
        );
      }
      // Add new item with all properties intact
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemName) => { // Change to use name instead of id
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      loading, 
      error, 
      addToCart, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 