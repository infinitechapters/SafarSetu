import { useEffect, useState } from "react";
import {
  getMyBookings,
  getAdminBookings,
  cancelBooking,
  updateBookingStatus,
} from "../lib/bookingApi";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusUpdate = async (bookingId, status) => {
  try {
    await updateBookingStatus(bookingId, status);
    alert(`Booking marked as ${status}`);
    fetchBookings();
  } catch (err) {
    alert(err.response?.data?.message || "Status update failed");
  }
};

  const fetchBookings = async () => {
    try {
      let res;

      if (user?.role === "ADMIN") {
        res = await getAdminBookings(); // 👑 admin bookings
      } else {
        res = await getMyBookings(); // 👤 user bookings
      }

      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      alert("Booking cancelled ❌");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  /* 🔹 Loading */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading bookings...
        </p>
      </div>
    );
  }

  /* 🔹 Empty */
  if (bookings.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No bookings found ✈️
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        {user.role === "ADMIN" ? "Bookings for Your Trips" : "My Bookings"}
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
                    className={`font-semibold ${booking.status === "cancelled"
                        ? "text-red-500"
                        : "text-green-600"
                      }`}
                  >
                    {booking.status}
                  </span>
                </p>

                {/* 👑 ADMIN controls */}
                {user.role === "ADMIN" && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-500 text-sm">
                      Booked by: {booking.user.name} ({booking.user.email})
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(booking.id, "CONFIRMED")}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(booking.id, "REJECTED")}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(booking.id, "COMPLETED")}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* 👤 USER ONLY: Cancel */}
            {user.role === "USER" && booking.status !== "cancelled" && (
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
