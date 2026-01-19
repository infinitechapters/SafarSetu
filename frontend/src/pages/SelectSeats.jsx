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

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Select Seats</h2>

      <input
        type="number"
        min={1}
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleProceed}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default SelectSeats;
