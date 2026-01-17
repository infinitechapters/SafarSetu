import { useEffect, useState } from "react";
import { createBooking } from "../lib/bookingApi";
import { getAllTrips } from "../lib/tripApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await getAllTrips();
        setTrips(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleBooking = async (tripId) => {
    try {
      await createBooking({ tripId, seatsBooked: 1 });
      alert("Booking successful 🎉");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading trips...
        </p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No trips available
      </p>
    );
  }

  const canReview = (trip) => {
  const currentDate = new Date();
  const startDate = new Date(trip.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + trip.duration);
  return currentDate > endDate;
};

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        Explore Trips ✈️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trips.map((trip) => (
  <div
    key={trip.id}
    className="bg-white rounded-xl shadow hover:shadow-lg transition"
  >
    <div className="p-5">
      <h2 className="text-xl font-semibold text-gray-800">
        {trip.name}
      </h2>

      <p className="text-sm text-indigo-600 mt-1">
        {trip.destination}
      </p>

      <p className="text-gray-600 text-sm mt-3 line-clamp-3">
        {trip.description}
      </p>

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p>💰 Price: ₹{trip.price}</p>
        <p>🪑 Seats Left: {trip.availableSeats}</p>
      </div>

      {/* 👤 USER ACTIONS */}
      {user?.role === "USER" && (
        <>
          <button
            disabled={trip.availableSeats === 0}
            onClick={() => handleBooking(trip.id)}
            className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {trip.availableSeats === 0 ? "Sold Out" : "Book Now"}
          </button>

          {canReview(trip) ? (
            <button
              onClick={() => navigate(`/review/${trip.id}`)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Write Review ✍️
            </button>
          ) : (
            <button
              disabled
              className="mt-3 w-full bg-gray-300 text-gray-700 py-2 rounded-lg cursor-not-allowed"
            >
              Ongoing Trip 🚌
            </button>
          )}
        </>
      )}

      {/* 👮 ADMIN VIEW (NO BOOKING / REVIEW) */}
      {user?.role === "ADMIN" && (
        <p className="mt-4 text-sm text-gray-500 italic">
          Admin view – booking disabled
        </p>
      )}
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default Trips;
