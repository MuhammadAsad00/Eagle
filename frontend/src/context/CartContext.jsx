import React, { createContext, useState, useEffect } from "react";

export const cartDataContext = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load from localStorage on first render
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Calculate total item count (sum of quantities)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => {
    setCart([]); // clears all items
  };

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = async (product, quantity = 1, size) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item._id === product._id && item.size === size
      );

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, size }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === id && item.size === size))
    );
  };

  // Update quantity
  const updateQuantity = (id, size, action) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size
          ? {
              ...item,
              quantity:
                action === "plus"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  let value = {
    cart,
    cartCount,
    clearCart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

   return (
       <cartDataContext.Provider value={value}>
         {children}
       </cartDataContext.Provider>
    );
};


export default CartContext; 