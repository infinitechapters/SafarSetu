import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../lib/bookingApi";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      // backend returns { bookings }
      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      alert("Booking cancelled ❌");
      fetchBookings(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading bookings...
        </p>
      </div>
    );
  }

  // 🔹 No bookings
  if (bookings.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        You have no bookings yet ✈️
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        My Bookings
      </h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row justify-between gap-4"
          >
            {/* Left info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {booking.trip.name}
              </h2>

              <p className="text-indigo-600 text-sm">
                {booking.trip.destination}
              </p>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>🪑 Seats: {booking.seatsBooked}</p>
                <p>💰 Total: ₹{booking.totalAmount}</p>
                <p>
                  📅 Start Date:{" "}
                  {new Date(booking.trip.startDate).toLocaleDateString()}
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Right actions */}
            {booking.status !== "cancelled" && (
              <div className="flex items-center">
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
