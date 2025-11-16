import React, { useState } from "react";

const PaymentButton = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simulate payment delay
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% chance of success
      setLoading(false);

      if (success) {
        onSuccess({ transactionId: Date.now(), amount });
      } else {
        onError("Payment failed. Please try again.");
      }
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full py-3 rounded text-white transition ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {loading ? "Processing Payment..." : `Pay $${amount.toLocaleString()}`}
    </button>
  );
};

export default PaymentButton;
