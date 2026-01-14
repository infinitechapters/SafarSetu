import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../lib/bookingApi";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings(); // refresh list
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <p>No bookings found</p>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow p-4 rounded"
          >
            <h2 className="font-semibold">
              {booking.trip.name}
            </h2>
            <p className="text-sm text-gray-600">
              {booking.trip.destination}
            </p>

            <div className="mt-2 text-sm">
              <p>Seats: {booking.seatsBooked}</p>
              <p>Total: ₹{booking.totalAmount}</p>
              <p>Status: {booking.status}</p>
            </div>

            {booking.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(booking.id)}
                className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
