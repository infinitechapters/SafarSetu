import { useEffect, useState } from "react";
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

  const handleBooking = (tripId) => {
    navigate(`/select_seats/${tripId}`);
  };

  const canReview = (trip) => {
    const start = new Date(trip.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + trip.duration);
    return new Date() > end;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">
          Finding the best trips for you...
        </p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20">
        No trips available right now 🌍
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
     
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
          Explore Trips ✈️
        </h1>
        <p className="text-gray-600">
          Discover destinations, experiences & memories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
           
            <div className="relative h-44">
              {trip.image ? (
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover brightness-100 contrast-110"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-r from-indigo-500 to-purple-500" />
              )}

              <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
                {trip.destination}
              </div>

              <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800">
                ₹{trip.price}
              </div>
            </div>


            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {trip.name}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {trip.description || "An unforgettable travel experience awaits you."}
              </p>

              <div className="mt-4 flex justify-between text-sm text-gray-700">
                <span>🪑 Seats Left: {trip.availableSeats}</span>
                <span>⏳ {trip.duration} days</span>
              </div>

              {user?.role.toUpperCase() === "USER" && (
                <div className="mt-6 space-y-3">
                  <button
                    disabled={trip.availableSeats === 0}
                    onClick={() => handleBooking(trip.id)}
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
                  >
                    {trip.availableSeats === 0 ? "Sold Out" : "Select Seats"}
                  </button>

                  {canReview(trip) && (
                    <button
                      onClick={() => navigate(`/review/${trip.id}`)}
                      className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition"
                    >
                      Write Review ✍️
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/trip/${trip.id}/reviews`)}
                    className="w-full border border-indigo-600 text-indigo-600 py-2.5 rounded-xl hover:bg-indigo-50 transition"
                  >
                    View Reviews
                  </button>
                </div>
              )}

              {user?.role.toUpperCase() === "ADMIN" && (
                <div className="mt-5 text-sm text-gray-400 italic text-center">
                  Admin view — booking disabled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
