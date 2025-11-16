import React, { useContext } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { cartDataContext } from "../../context/CartContext";
import { shopDataContext } from "../../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";


const CartContent = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(cartDataContext);
  let { currency } = useContext(shopDataContext);

  if (cart.length === 0) {
    return <p className="text-center text-gray-500 py-10">Your cart is empty.</p>;
  }

  return (
    <div>
      {cart.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image1}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(product._id, product.size, "minus")}
                  className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product._id, product.size, "plus")}
                  className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">
              {currency}{product.price * product.quantity}
            </p>
            <button onClick={() => removeFromCart(product._id, product.size)}>
              <RiDeleteBin3Line className="h-6 w-6 text-red-600 mt-2 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
