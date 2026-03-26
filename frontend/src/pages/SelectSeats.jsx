import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SelectSeats = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState(1);

  const handleProceed = () => {
    navigate("/payment", {
      state: { tripId, seatsBooked: seats },
    });
  };
  
   const styles = `
.seat-page {
  min-height: 100vh;
  background: #05101f;
  display: flex;
  justify-content: center;
  align-items: center;
}

.seat-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  backdrop-filter: blur(12px);
}

.seat-input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: white;
  font-size: 16px;
}

.seat-btn {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(135deg,#1a8fda,#22d3ee);
  color: white;
  font-weight: 600;
  transition: 0.3s;
}

.seat-btn:hover {
  transform: translateY(-2px);
}
`;

return (
<>
<style>{styles}</style>

<div className="seat-page">
  <div className="seat-card">

    <h2 className="text-2xl font-bold mb-4 text-white">
      Select Seats 🎟️
    </h2>

    <p className="text-gray-400 text-sm mb-4">
      Choose how many seats you want to book
    </p>

    <input
      type="number"
      min={1}
      value={seats}
      onChange={(e) => setSeats(Number(e.target.value))}
      className="seat-input"
    />

    <button onClick={handleProceed} className="seat-btn">
      Proceed to Payment →
    </button>

  </div>
</div>
</>
);

  // return (
  //   <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow rounded">
  //     <h2 className="text-xl font-bold mb-4">Select Seats</h2>

  //     <input
  //       type="number"
  //       min={1}
  //       value={seats}
  //       onChange={(e) => setSeats(Number(e.target.value))}
  //       className="border p-2 w-full mb-4"
  //     />

  //     <button
  //       onClick={handleProceed}
  //       className="w-full bg-indigo-600 text-white py-2 rounded"
  //     >
  //       Proceed to Payment
  //     </button>
  //   </div>
  // );
};

export default SelectSeats;
