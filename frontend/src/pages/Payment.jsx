import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../lib/bookingApi";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { tripId, seatsBooked } = state || {};

  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  if (!tripId || !seatsBooked) {
    return (
      <p className="text-center text-red-500 mt-10">
        Invalid payment session
      </p>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 1500));

     //booking
      await createBooking({
        tripId,
        seatsBooked,
      });

      alert("Payment & Booking successful 🎉");
      navigate("/bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = `
.payment-page {
  min-height:100vh;
  background:#05101f;
  display:flex;
  align-items:center;
  justify-content:center;
}

.payment-card {
  background: rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:20px;
  padding:30px;
  width:100%;
  max-width:400px;
}

.payment-option {
  padding:10px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.1);
  cursor:pointer;
}

.payment-option.active {
  border-color:#22d3ee;
  background: rgba(34,211,238,0.1);
}
`;

return (
<>
<style>{styles}</style>

<div className="payment-page">
  <div className="payment-card">

    <h1 className="text-2xl font-bold text-center mb-4">Payment</h1>

    <p className="text-center text-gray-400 mb-5">
      Seats: <strong>{seatsBooked}</strong>
    </p>

    <div className="space-y-3">
      {["card","upi","netbanking"].map((m)=>(
        <div key={m}
          onClick={()=>setMethod(m)}
          className={`payment-option ${method===m?"active":""}`}>
          {m.toUpperCase()}
        </div>
      ))}
    </div>

    {method==="card" && (
      <div className="mt-4 space-y-2">
        <input placeholder="Card Number"
          className="w-full bg-transparent border p-2 rounded"/>
        <div className="flex gap-2">
          <input placeholder="MM/YY" className="w-1/2 border p-2 rounded bg-transparent"/>
          <input placeholder="CVV" className="w-1/2 border p-2 rounded bg-transparent"/>
        </div>
      </div>
    )}

    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full mt-5 py-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400">
      {loading?"Processing...":"Pay Now"}
    </button>

  </div>
</div>
</>
);

  // return (
  //   <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-10">
  //     <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
  //       Payment
  //     </h1>

  //     <p className="text-center text-gray-600 mb-4">
  //       Seats Selected: <strong>{seatsBooked}</strong>
  //     </p>

  //     <div className="space-y-4">
  //       <label className="flex items-center gap-3 cursor-pointer">
  //         <input
  //           type="radio"
  //           checked={method === "card"}
  //           onChange={() => setMethod("card")}
  //         />
  //         <span>Credit / Debit Card</span>
  //       </label>

  //       <label className="flex items-center gap-3 cursor-pointer">
  //         <input
  //           type="radio"
  //           checked={method === "upi"}
  //           onChange={() => setMethod("upi")}
  //         />
  //         <span>UPI</span>
  //       </label>

  //       <label className="flex items-center gap-3 cursor-pointer">
  //         <input
  //           type="radio"
  //           checked={method === "netbanking"}
  //           onChange={() => setMethod("netbanking")}
  //         />
  //         <span>Net Banking</span>
  //       </label>
  //     </div>

  //     {method === "card" && (
  //       <div className="mt-4 space-y-3">
  //         <input
  //           type="text"
  //           placeholder="Card Number"
  //           className="w-full border px-3 py-2 rounded"
  //         />
  //         <div className="flex gap-3">
  //           <input
  //             type="text"
  //             placeholder="MM/YY"
  //             className="w-1/2 border px-3 py-2 rounded"
  //           />
  //           <input
  //             type="text"
  //             placeholder="CVV"
  //             className="w-1/2 border px-3 py-2 rounded"
  //           />
  //         </div>
  //       </div>
  //     )}

  //     <button
  //       disabled={loading}
  //       onClick={handlePayment}
  //       className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
  //     >
  //       {loading ? "Processing..." : "Pay Now"}
  //     </button>
  //   </div>
  // );
};

export default Payment;
