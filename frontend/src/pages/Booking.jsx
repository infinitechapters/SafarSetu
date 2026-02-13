import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyBookings,
  getAdminBookings,
  cancelBooking,
  updateBookingStatus,
} from "../lib/bookingApi";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 📦 FETCH BOOKINGS */
  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res =
        user.role.toUpperCase() === "ADMIN"
          ? await getAdminBookings()
          : await getMyBookings();

      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchBookings();
    }
  }, [authLoading, user]);


  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      alert("Booking cancelled ❌");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  /*ADMIN STATUS UPDATE */
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      alert(`Booking marked as ${status}`);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  const isTripCompleted = (startDate, duration) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + duration);
    return new Date() >= end;
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-gray-500">
        Please login to view bookings
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-600 animate-pulse">
          Loading bookings...
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No bookings found ✈️
      </p>
    );
  }

 return (
  <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-600">
      {user.role.toUpperCase() === "ADMIN"
        ? "Bookings for Your Trips"
        : "My Bookings"}
    </h1>

    <div className="space-y-8">
      {bookings.filter((booking) => booking.status !== "cancelled").map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">

          <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">
              {booking.trip.name}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                booking.status === "cancelled"
                  ? "bg-red-100 text-red-600"
                  : booking.status === "confirmed"
                  ? "bg-green-100 text-green-600"
                  : booking.status === "rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="p-6 flex flex-col md:flex-row gap-6 justify-between">

            <div className="space-y-2 text-sm text-gray-700">
              <p className="text-indigo-600 font-medium">
                {booking.trip.destination}
              </p>
              <p>🪑 Seats Booked: {booking.seatsBooked}</p>
              <p>💰 Total Amount: ₹{booking.totalAmount}</p>
              <p>
                📅 Start Date:{" "}
                {new Date(
                  booking.trip.startDate
                ).toLocaleDateString()}
              </p>

              {user.role.toUpperCase() === "ADMIN" && (
                <p className="text-gray-500 mt-2">
                  Booked by{" "}
                  <span className="font-medium">
                    {booking.user.name}
                  </span>{" "}
                  ({booking.user.email})
                </p>
              )}
            </div>

           
            <div className="flex flex-col gap-3 min-w-45">
              {user.role.toUpperCase() === "ADMIN" && booking.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        booking.id,
                        "confirmed"
                      )
                    }
                    className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        booking.id,
                        "rejected"
                      )
                    }
                    className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </>
)}
                {user.role.toUpperCase() === "ADMIN" &&(
                    <>
                    <button
                    onClick={() =>
                      navigate(
                        `/admin/trip/${booking.tripId}/reviews`
                      )
                    }
                    className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    View Reviews
                  </button>
                    </>
                   )
                  }

              {/* USER ACTIONS */}
              {user.role.toUpperCase() === "USER" &&
                booking.status !== "cancelled" && (
                  <>
                    <button
                      onClick={() =>
                        handleCancel(booking.id)
                      }
                      className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel Booking
                    </button>

                    {isTripCompleted(
                      booking.trip.startDate,
                      booking.trip.duration
                    ) && (
                      <button
                        onClick={() =>
                          navigate(
                            `/review/${booking.trip.id}`
                          )
                        }
                        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Add Review ✍️
                      </button>
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Booking;
