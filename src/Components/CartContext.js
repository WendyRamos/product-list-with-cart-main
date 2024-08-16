import React, { createContext, useState } from "react";
import data from "./../Services/data.json";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [quantities, setQuantities] = useState(data.map(() => 0));
  const [addedToCart, setAddedToCart] = useState(data.map(() => false));
  const [cartItems, setCartItems] = useState([]);

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index ? quantity + 1 : quantity
      )
    );
    updateCartItems(index, quantities[index] + 1);
  };

  const handleDecrement = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) => {
        if (i === index) {
          if (quantity > 1) {
          updateCartItems(index, quantities[index] - 1);
            return quantity - 1;
          } else {
            setAddedToCart((prevAddedToCart) =>
              prevAddedToCart.map((added, j) => (j === index ? false : added))
            );
            updateCartItems(index, 0);
            return 0;
          }
        }
        return quantity;
      })
    );
  };

  const handleAddToCart = (index) => {
    setAddedToCart((prevAddedToCart) =>
      prevAddedToCart.map((added, i) => (i === index ? true : added))
    );
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) => (i === index ? 1 : quantity))
    );
    updateCartItems(index, 1);
  };

  const updateCartItems = (index, newQuantity) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === data[index].id
      );
      const itemToUpdate = { ...data[index], quantity: newQuantity, subtotal: data[index].price * newQuantity };

      if (newQuantity === 0) {
        return prevCartItems.filter((item) => item.id !== data[index].id);
      } else if (existingItemIndex !== -1) {
        return prevCartItems.map((item, i) =>
          i === existingItemIndex ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [...prevCartItems, itemToUpdate];
      }
    });
  };

  const removeFromCart = (id) => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      setQuantities((prevQuantities) =>
        prevQuantities.map((quantity, i) => (i === index ? 0 : quantity))
      );
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== id)
      );
    }
  };

  const getTotalProduct = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const clearCart = () => {
    setQuantities(data.map(() => 0));
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        quantities,
        cartItems,
        handleIncrement,
        handleDecrement,
        handleAddToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getTotalProduct,
        data,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
