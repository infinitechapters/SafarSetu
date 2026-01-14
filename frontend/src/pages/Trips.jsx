import { useEffect, useState } from "react";

import { createBooking } from "../lib/bookingApi";
import { getAllTrips } from "../lib/tripApi";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTrips()
    .then(res=> setTrips(res.data))
    .catch(err=> console.error(err));
  }, []);

  const handleBooking = async (tripId) => {
    try {
      await createBooking({
        tripId,
        seatsBooked: 1, 
      });
      alert("Booking created successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <p>Loading trips...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available Trips</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white shadow rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold">
              {trip.name}
            </h2>
            <p className="text-gray-600">{trip.destination}</p>

            <p className="mt-2 text-sm">{trip.description}</p>

            <div className="mt-3 text-sm">
              <p>Price: ₹{trip.price}</p>
              <p>Available Seats: {trip.availableSeats}</p>
            </div>

            <button
              disabled={trip.availableSeats === 0}
              onClick={() => handleBooking(trip.id)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
