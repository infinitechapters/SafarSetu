import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setLoading(true);

    // Simulate payment success
    setTimeout(() => {
      setLoading(false);
      alert("Payment successful 💳");
      navigate("/review");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Payment
      </h1>

      {/* Payment methods */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <span>Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          <span>UPI</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            checked={method === "netbanking"}
            onChange={() => setMethod("netbanking")}
          />
          <span>Net Banking</span>
        </label>
      </div>

      {/* Fake card inputs */}
      {method === "card" && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
        </div>
      )}

      <button
        disabled={loading}
        onClick={handlePayment}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
