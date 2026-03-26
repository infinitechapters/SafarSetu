// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getMyBookings,
//   getAdminBookings,
//   cancelBooking,
//   updateBookingStatus,
// } from "../lib/bookingApi";
// import { useAuth } from "../context/AuthContext";

// const Booking = () => {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* 📦 FETCH BOOKINGS */
//   const fetchBookings = async () => {
//     if (!user) return;

//     setLoading(true);
//     try {
//       const res =
//         user.role.toUpperCase() === "ADMIN"
//           ? await getAdminBookings()
//           : await getMyBookings();

//       setBookings(res.data.bookings);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!authLoading && user) {
//       fetchBookings();
//     }
//   }, [authLoading, user]);


//   const handleCancel = async (bookingId) => {
//     try {
//       await cancelBooking(bookingId);
//       alert("Booking cancelled ❌");
//       fetchBookings();
//     } catch (err) {
//       alert(err.response?.data?.message || "Cancel failed");
//     }
//   };

//   /*ADMIN STATUS UPDATE */
//   const handleStatusUpdate = async (bookingId, status) => {
//     try {
//       await updateBookingStatus(bookingId, status);
//       alert(`Booking marked as ${status}`);
//       fetchBookings();
//     } catch (err) {
//       alert(err.response?.data?.message || "Status update failed");
//     }
//   };

//   const isTripCompleted = (startDate, duration) => {
//     const start = new Date(startDate);
//     const end = new Date(start);
//     end.setDate(end.getDate() + duration);
//     return new Date() >= end;
//   };

//   if (authLoading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <p className="text-gray-600 animate-pulse">
//           Checking authentication...
//         </p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <p className="text-center text-gray-500">
//         Please login to view bookings
//       </p>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <p className="text-gray-600 animate-pulse">
//           Loading bookings...
//         </p>
//       </div>
//     );
//   }

//   if (bookings.length === 0) {
//     return (
//       <p className="text-center text-gray-500 text-lg">
//         No bookings found ✈️
//       </p>
//     );
//   }

//  return (
//   <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-600">
//       {user.role.toUpperCase() === "ADMIN"
//         ? "Bookings for Your Trips"
//         : "My Bookings"}
//     </h1>

//     <div className="space-y-8">
//       {bookings.filter((booking) => booking.status !== "cancelled").map((booking) => (
//         <div
//           key={booking.id}
//           className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">

//           <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-3 flex justify-between items-center">
//             <h2 className="text-lg font-semibold text-white">
//               {booking.trip.name}
//             </h2>

//             <span
//               className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
//                 booking.status === "cancelled"
//                   ? "bg-red-100 text-red-600"
//                   : booking.status === "confirmed"
//                   ? "bg-green-100 text-green-600"
//                   : booking.status === "rejected"
//                   ? "bg-red-100 text-red-600"
//                   : "bg-yellow-100 text-yellow-700"
//               }`}
//             >
//               {booking.status}
//             </span>
//           </div>

//           <div className="p-6 flex flex-col md:flex-row gap-6 justify-between">

//             <div className="space-y-2 text-sm text-gray-700">
//               <p className="text-indigo-600 font-medium">
//                 {booking.trip.destination}
//               </p>
//               <p>🪑 Seats Booked: {booking.seatsBooked}</p>
//               <p>💰 Total Amount: ₹{booking.totalAmount}</p>
//               <p>
//                 📅 Start Date:{" "}
//                 {new Date(
//                   booking.trip.startDate
//                 ).toLocaleDateString()}
//               </p>

//               {user.role.toUpperCase() === "ADMIN" && (
//                 <p className="text-gray-500 mt-2">
//                   Booked by{" "}
//                   <span className="font-medium">
//                     {booking.user.name}
//                   </span>{" "}
//                   ({booking.user.email})
//                 </p>
//               )}
//             </div>

           
//             <div className="flex flex-col gap-3 min-w-45">
//               {user.role.toUpperCase() === "ADMIN" && booking.status === "pending" && (
//                 <>
//                   <button
//                     onClick={() =>
//                       handleStatusUpdate(
//                         booking.id,
//                         "confirmed"
//                       )
//                     }
//                     className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//                   >
//                     Confirm
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleStatusUpdate(
//                         booking.id,
//                         "rejected"
//                       )
//                     }
//                     className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//                   >
//                     Reject
//                   </button>
//                 </>
// )}
//                 {user.role.toUpperCase() === "ADMIN" &&(
//                     <>
//                     <button
//                     onClick={() =>
//                       navigate(
//                         `/admin/trip/${booking.tripId}/reviews`
//                       )
//                     }
//                     className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//                   >
//                     View Reviews
//                   </button>
//                     </>
//                    )
//                   }

//               {/* USER ACTIONS */}
//               {user.role.toUpperCase() === "USER" &&
//                 booking.status !== "cancelled" && (
//                   <>
//                     <button
//                       onClick={() =>
//                         handleCancel(booking.id)
//                       }
//                       className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//                     >
//                       Cancel Booking
//                     </button>

//                     {isTripCompleted(
//                       booking.trip.startDate,
//                       booking.trip.duration
//                     ) && (
//                       <button
//                         onClick={() =>
//                           navigate(
//                             `/review/${booking.trip.id}`
//                           )
//                         }
//                         className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//                       >
//                         Add Review ✍️
//                       </button>
//                     )}
//                   </>
//                 )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );
// };

// export default Booking;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyBookings,
  getAdminBookings,
  cancelBooking,
  updateBookingStatus,
} from "../lib/bookingApi";
import { useAuth } from "../context/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --night: #05101f;
    --navy: #091526;
    --sky: #1a8fda;
    --cyan: #22d3ee;
    --gold: #f4b942;
    --emerald: #34d399;
    --crimson: #f87171;
    --amber: #fb923c;
    --muted-fg: rgba(175, 210, 235, 0.6);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .bookings-page {
    min-height: 100vh;
    background: var(--night);
    font-family: 'DM Sans', sans-serif;
    padding: 60px 5% 100px;
  }

  /* ── HEADER ── */
  .bookings-header {
    text-align: center;
    margin-bottom: 56px;
    animation: fadeUp 0.65s ease both;
  }
  .bookings-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--cyan);
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.2);
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 18px;
  }
  .bookings-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--cyan);
    animation: pulse 2s infinite;
  }
  .bookings-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 4.5vw, 54px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -1px;
    line-height: 1.05;
  }
  .bookings-header h1 em {
    font-family: 'Lora', serif;
    font-style: italic;
    color: var(--gold);
  }

  /* ── LIST ── */
  .bookings-list {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* ── BOOKING CARD ── */
  .booking-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    animation: fadeUp 0.6s ease both;
  }
  .booking-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
    border-color: rgba(34, 211, 238, 0.15);
  }

  /* card header bar */
  .booking-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
  .booking-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.2px;
  }
  .booking-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 5px 13px;
    border-radius: 100px;
    flex-shrink: 0;
  }
  .status-confirmed {
    background: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.3);
    color: var(--emerald);
  }
  .status-pending {
    background: rgba(251, 146, 60, 0.12);
    border: 1px solid rgba(251, 146, 60, 0.3);
    color: var(--amber);
  }
  .status-rejected, .status-cancelled {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.25);
    color: var(--crimson);
  }

  /* card body */
  .booking-card-body {
    display: flex;
    gap: 0;
    padding: 0;
  }
  .booking-info {
    flex: 1;
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .booking-destination {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 4px;
  }
  .booking-detail-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13.5px;
    font-weight: 300;
    color: rgba(190, 220, 240, 0.75);
  }
  .booking-detail-row strong {
    font-weight: 500;
    color: rgba(220, 240, 255, 0.9);
  }
  .booking-user-note {
    margin-top: 8px;
    font-size: 12.5px;
    font-weight: 300;
    color: rgba(150, 185, 215, 0.5);
    font-style: italic;
  }
  .booking-user-note span {
    font-weight: 500;
    font-style: normal;
    color: rgba(190, 220, 240, 0.7);
  }

  /* actions panel */
  .booking-actions {
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 22px 24px;
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    min-width: 180px;
    justify-content: center;
  }
  .bk-btn {
    width: 100%;
    padding: 10px 18px;
    border-radius: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.22s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
  }
  .bk-btn-confirm {
    background: rgba(52, 211, 153, 0.14);
    border: 1px solid rgba(52, 211, 153, 0.3);
    color: var(--emerald);
  }
  .bk-btn-confirm:hover { background: rgba(52, 211, 153, 0.24); transform: translateY(-1px); }

  .bk-btn-reject {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.25);
    color: var(--crimson);
  }
  .bk-btn-reject:hover { background: rgba(248, 113, 113, 0.2); transform: translateY(-1px); }

  .bk-btn-reviews {
    background: rgba(167, 139, 250, 0.1);
    border: 1px solid rgba(167, 139, 250, 0.25);
    color: #c4b5fd;
  }
  .bk-btn-reviews:hover { background: rgba(167, 139, 250, 0.18); transform: translateY(-1px); }

  .bk-btn-cancel {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.2);
    color: var(--crimson);
  }
  .bk-btn-cancel:hover { background: rgba(248, 113, 113, 0.18); transform: translateY(-1px); }

  .bk-btn-add-review {
    background: rgba(52, 211, 153, 0.1);
    border: 1px solid rgba(52, 211, 153, 0.25);
    color: var(--emerald);
  }
  .bk-btn-add-review:hover { background: rgba(52, 211, 153, 0.18); transform: translateY(-1px); }

  /* ── STATES ── */
  .bookings-state {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--night);
    font-family: 'DM Sans', sans-serif;
    gap: 16px;
  }
  .bookings-state-icon {
    font-size: 48px;
    animation: float 3s ease-in-out infinite;
  }
  .bookings-state-text {
    font-size: 16px;
    font-weight: 300;
    color: var(--muted-fg);
  }
  .bookings-loading-bar {
    width: 180px; height: 3px;
    border-radius: 2px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .bookings-loading-bar::after {
    content: '';
    display: block;
    height: 100%;
    width: 60%;
    background: linear-gradient(90deg, var(--sky), var(--cyan));
    border-radius: 2px;
    animation: loadSlide 1.4s ease-in-out infinite;
  }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes loadSlide { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }

  @media (max-width: 640px) {
    .booking-card-body { flex-direction: column; }
    .booking-actions { border-left: none; border-top: 1px solid rgba(255,255,255,0.06); min-width: unset; flex-direction: row; flex-wrap: wrap; }
    .bk-btn { flex: 1; min-width: 120px; }
  }
`;

const statusClass = (status) => {
  if (status === "confirmed") return "booking-status-badge status-confirmed";
  if (status === "pending") return "booking-status-badge status-pending";
  return "booking-status-badge status-rejected";
};

const statusIcon = (status) => {
  if (status === "confirmed") return "✓";
  if (status === "pending") return "◷";
  return "✕";
};

const Booking = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <>
        <style>{styles}</style>
        <div className="bookings-state">
          <div className="bookings-state-icon">🔐</div>
          <p className="bookings-state-text">Checking authentication...</p>
          <div className="bookings-loading-bar" />
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <style>{styles}</style>
        <div className="bookings-state">
          <div className="bookings-state-icon">🔒</div>
          <p className="bookings-state-text">Please login to view bookings</p>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="bookings-state">
          <div className="bookings-state-icon">🎫</div>
          <p className="bookings-state-text">Loading your bookings...</p>
          <div className="bookings-loading-bar" />
        </div>
      </>
    );
  }

  if (bookings.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="bookings-state">
          <div className="bookings-state-icon">✈️</div>
          <p className="bookings-state-text">No bookings found yet</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="bookings-page">
        <div className="bookings-header">
          <div className="bookings-eyebrow">
            <span className="bookings-eyebrow-dot" />
            {user.role.toUpperCase() === "ADMIN" ? "All Bookings" : "My Journeys"}
          </div>
          <h1>
            {user.role.toUpperCase() === "ADMIN"
              ? <>Bookings for <em>Your Trips</em></>
              : <>My <em>Bookings</em></>
            }
          </h1>
        </div>

        <div className="bookings-list">
          {bookings
            .filter((booking) => booking.status !== "cancelled")
            .map((booking, idx) => (
              <div
                key={booking.id}
                className="booking-card"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                {/* Header */}
                <div className="booking-card-header">
                  <span className="booking-card-title">{booking.trip.name}</span>
                  <span className={statusClass(booking.status)}>
                    {statusIcon(booking.status)} {booking.status}
                  </span>
                </div>

                {/* Body */}
                <div className="booking-card-body">
                  <div className="booking-info">
                    <div className="booking-destination">{booking.trip.destination}</div>
                    <div className="booking-detail-row">
                      <span>🪑</span>
                      <span>Seats Booked: <strong>{booking.seatsBooked}</strong></span>
                    </div>
                    <div className="booking-detail-row">
                      <span>💰</span>
                      <span>Total Amount: <strong>₹{booking.totalAmount}</strong></span>
                    </div>
                    <div className="booking-detail-row">
                      <span>📅</span>
                      <span>
                        Start Date: <strong>{new Date(booking.trip.startDate).toLocaleDateString()}</strong>
                      </span>
                    </div>
                    {user.role.toUpperCase() === "ADMIN" && (
                      <p className="booking-user-note">
                        Booked by <span>{booking.user.name}</span> ({booking.user.email})
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="booking-actions">
                    {user.role.toUpperCase() === "ADMIN" && booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                          className="bk-btn bk-btn-confirm"
                        >
                          ✓ Confirm
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, "rejected")}
                          className="bk-btn bk-btn-reject"
                        >
                          ✕ Reject
                        </button>
                      </>
                    )}

                    {user.role.toUpperCase() === "ADMIN" && (
                      <button
                        onClick={() => navigate(`/admin/trip/${booking.tripId}/reviews`)}
                        className="bk-btn bk-btn-reviews"
                      >
                        ★ View Reviews
                      </button>
                    )}

                    {user.role.toUpperCase() === "USER" && booking.status !== "cancelled" && (
                      <>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="bk-btn bk-btn-cancel"
                        >
                          ✕ Cancel Booking
                        </button>
                        {isTripCompleted(booking.trip.startDate, booking.trip.duration) && (
                          <button
                            onClick={() => navigate(`/review/${booking.trip.id}`)}
                            className="bk-btn bk-btn-add-review"
                          >
                            ✍️ Add Review
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
    </>
  );
};

export default Booking;