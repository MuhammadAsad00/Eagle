import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import { cartDataContext } from "../../context/CartContext";

const Checkout = () => {
  let { cart, clearCart } = useContext(cartDataContext);
  const [checkoutId, setCheckoutId] = useState(null);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCreateChekout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePayment = (details) => {
    console.log("Payment Successfull", details);
    navigate("/order-confirmation");
    // Then clear cart after short delay
    setTimeout(() => {
    clearCart();
  }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-4 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl mb-6 uppercase">Checkout</h2>
        <form onSubmit={handleCreateChekout}>
          <h2 className="text-lg mb-4">Contact Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 roundde border"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 roundde border"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 roundde border"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 roundde border"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 rounded border"
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
              >
                Continue to payment
              </button>
            ) : (
              <div className="text-center">
                {/* <h3 className="text-lg mb-4">Pay with Payoneer</h3> */}
                <PaymentButton
                  amount={subtotal}
                  onSuccess={handlePayment}
                  onError={(err) => alert("Payment failed. Try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              Your cart is empty.
            </p>
          ) : (
            cart.map((product, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-2 border-b"
              >
                <div className="flex items-start">
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-20 h-20 object-cover mr-4 rounded"
                  />
                  <div>
                    <h3 className="text-md">{product.name}</h3>
                    {product.size && (
                      <p className="text-gray-500">Size: {product.size}</p>
                    )}
                    {product.color && (
                      <p className="text-gray-500">Color: {product.color}</p>
                    )}
                    <p className="text-gray-600 text-sm">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-xl">
                  ${(product.price * product.quantity).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${subtotal.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4 font-semibold">
          <p>Total</p>
          <p>${subtotal.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
