// import { useEffect, useState } from "react";
// import { getAllTrips } from "../lib/tripApi";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Trips = () => {
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const res = await getAllTrips();
//         setTrips(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrips();
//   }, []);

//   const handleBooking = (tripId) => {
//     navigate(`/select_seats/${tripId}`);
//   };

//   const canReview = (trip) => {
//     const start = new Date(trip.startDate);
//     const end = new Date(start);
//     end.setDate(start.getDate() + trip.duration);
//     return new Date() > end;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 text-lg animate-pulse">
//           Finding the best trips for you...
//         </p>
//       </div>
//     );
//   }

//   if (trips.length === 0) {
//     return (
//       <p className="text-center text-gray-500 mt-20">
//         No trips available right now 🌍
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
     
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">
//           Explore Trips ✈️
//         </h1>
//         <p className="text-gray-600">
//           Discover destinations, experiences & memories
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {trips.map((trip) => (
//           <div
//             key={trip.id}
//             className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
//           >
           
//             <div className="relative h-44">
//               {trip.image ? (
//                 <img
//                   src={trip.image}
//                   alt={trip.name}
//                   className="w-full h-full object-cover brightness-100 contrast-110"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-linear-to-r from-indigo-500 to-purple-500" />
//               )}

//               <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
//                 {trip.destination}
//               </div>

//               <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800">
//                 ₹{trip.price}
//               </div>
//             </div>


//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                 {trip.name}
//               </h2>

//               <p className="text-sm text-gray-600 line-clamp-2">
//                 {trip.description || "An unforgettable travel experience awaits you."}
//               </p>

//               <div className="mt-4 flex justify-between text-sm text-gray-700">
//                 <span>🪑 Seats Left: {trip.availableSeats}</span>
//                 <span>⏳ {trip.duration} days</span>
//               </div>

//               {user?.role.toUpperCase() === "USER" && (
//                 <div className="mt-6 space-y-3">
//                   <button
//                     disabled={trip.availableSeats === 0}
//                     onClick={() => handleBooking(trip.id)}
//                     className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
//                   >
//                     {trip.availableSeats === 0 ? "Sold Out" : "Select Seats"}
//                   </button>

//                   {canReview(trip) && (
//                     <button
//                       onClick={() => navigate(`/review/${trip.id}`)}
//                       className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition"
//                     >
//                       Write Review ✍️
//                     </button>
//                   )}

//                   <button
//                     onClick={() => navigate(`/trip/${trip.id}/reviews`)}
//                     className="w-full border border-indigo-600 text-indigo-600 py-2.5 rounded-xl hover:bg-indigo-50 transition"
//                   >
//                     View Reviews
//                   </button>
//                 </div>
//               )}

//               {user?.role.toUpperCase() === "ADMIN" && (
//                 <div className="mt-5 text-sm text-gray-400 italic text-center">
//                   Admin view — booking disabled
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Trips;
import { useEffect, useState } from "react";
import { getAllTrips } from "../lib/tripApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --night: #05101f;
    --navy: #091526;
    --deep: #0d1f35;
    --sky: #1a8fda;
    --cyan: #22d3ee;
    --gold: #f4b942;
    --emerald: #34d399;
    --crimson: #f87171;
    --paper: #f8f4ee;
    --muted-fg: rgba(175, 210, 235, 0.6);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .trips-page {
    min-height: 100vh;
    background: var(--night);
    font-family: 'DM Sans', sans-serif;
    padding: 60px 5% 100px;
  }

  /* ── PAGE HEADER ── */
  .trips-header {
    text-align: center;
    margin-bottom: 64px;
    animation: fadeUp 0.7s ease both;
  }
  .trips-header-eyebrow {
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
    margin-bottom: 20px;
  }
  .trips-header-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--cyan);
    animation: pulse 2s infinite;
  }
  .trips-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -1.2px;
    line-height: 1.05;
    margin-bottom: 12px;
  }
  .trips-header h1 em {
    font-family: 'Lora', serif;
    font-style: italic;
    background: linear-gradient(90deg, var(--sky), var(--cyan), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .trips-header p {
    font-size: 15px;
    font-weight: 300;
    color: var(--muted-fg);
    line-height: 1.7;
  }

  /* ── GRID ── */
  .trips-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  /* ── CARD ── */
  .trip-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    overflow: hidden;
    transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s;
    animation: fadeUp 0.6s ease both;
    display: flex;
    flex-direction: column;
  }
  .trip-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    border-color: rgba(34, 211, 238, 0.2);
  }

  /* image area */
  .trip-card-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .trip-card-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s;
  }
  .trip-card:hover .trip-card-img-wrap img {
    transform: scale(1.06);
  }
  .trip-card-img-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #1a3a5c, #0a2040);
  }
  .trip-card-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(5,16,31,0.75) 0%, transparent 55%);
  }
  .trip-card-destination {
    position: absolute;
    bottom: 12px; left: 14px;
    background: rgba(5, 16, 31, 0.75);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(34, 211, 238, 0.3);
    color: var(--cyan);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 100px;
  }
  .trip-card-price {
    position: absolute;
    top: 14px; right: 14px;
    background: rgba(5, 16, 31, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(244, 185, 66, 0.35);
    color: var(--gold);
    font-size: 13px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    padding: 5px 13px;
    border-radius: 100px;
  }

  /* body */
  .trip-card-body {
    padding: 22px 22px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .trip-card-name {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 7px;
    letter-spacing: -0.3px;
    line-height: 1.2;
  }
  .trip-card-desc {
    font-size: 13px;
    font-weight: 300;
    color: var(--muted-fg);
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .trip-card-meta {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .trip-meta-pill {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(190, 220, 240, 0.7);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 5px 12px;
    border-radius: 100px;
  }

  /* action buttons */
  .trip-actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .trip-btn {
    width: 100%;
    padding: 11px 16px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.22s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .trip-btn-primary {
    background: linear-gradient(135deg, var(--sky), #0a5fa8);
    color: #fff;
    box-shadow: 0 4px 16px rgba(26, 143, 218, 0.35);
  }
  .trip-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(26, 143, 218, 0.5);
  }
  .trip-btn-primary:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
    box-shadow: none;
  }
  .trip-btn-review {
    background: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.3);
    color: var(--emerald);
  }
  .trip-btn-review:hover {
    background: rgba(52, 211, 153, 0.2);
  }
  .trip-btn-outline {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(190, 220, 240, 0.65);
  }
  .trip-btn-outline:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(34, 211, 238, 0.3);
    color: var(--cyan);
  }
  .admin-note {
    margin-top: auto;
    padding: 10px;
    text-align: center;
    font-size: 11.5px;
    font-weight: 400;
    color: rgba(150, 185, 215, 0.35);
    letter-spacing: 0.3px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* ── STATES ── */
  .trips-state {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--night);
    font-family: 'DM Sans', sans-serif;
    gap: 16px;
  }
  .trips-state-icon {
    font-size: 48px;
    animation: float 3s ease-in-out infinite;
  }
  .trips-state-text {
    font-size: 16px;
    font-weight: 300;
    color: var(--muted-fg);
    letter-spacing: 0.2px;
  }
  .trips-loading-bar {
    width: 180px; height: 3px;
    border-radius: 2px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .trips-loading-bar::after {
    content: '';
    display: block;
    height: 100%;
    width: 60%;
    background: linear-gradient(90deg, var(--sky), var(--cyan));
    border-radius: 2px;
    animation: loadSlide 1.4s ease-in-out infinite;
  }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes loadSlide { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }

  @media (max-width: 960px) { .trips-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .trips-grid { grid-template-columns: 1fr; } }
`;

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
      <>
        <style>{styles}</style>
        <div className="trips-state">
          <div className="trips-state-icon">✈️</div>
          <p className="trips-state-text">Finding the best trips for you...</p>
          <div className="trips-loading-bar" />
        </div>
      </>
    );
  }

  if (trips.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="trips-state">
          <div className="trips-state-icon">🌍</div>
          <p className="trips-state-text">No trips available right now</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="trips-page">
        <div className="trips-header">
          <div className="trips-header-eyebrow">
            <span className="trips-header-dot" />
            Curated Experiences
          </div>
          <h1>Explore <em>Trips</em></h1>
          <p>Discover destinations, experiences &amp; memories worth keeping</p>
        </div>

        <div className="trips-grid">
          {trips.map((trip, idx) => (
            <div
              key={trip.id}
              className="trip-card"
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <div className="trip-card-img-wrap">
                {trip.image ? (
                  <img src={trip.image} alt={trip.name} />
                ) : (
                  <div className="trip-card-img-placeholder" />
                )}
                <div className="trip-card-img-overlay" />
                <span className="trip-card-destination">{trip.destination}</span>
                <span className="trip-card-price">₹{trip.price}</span>
              </div>

              <div className="trip-card-body">
                <div className="trip-card-name">{trip.name}</div>
                <p className="trip-card-desc">
                  {trip.description || "An unforgettable travel experience awaits you."}
                </p>
                <div className="trip-card-meta">
                  <span className="trip-meta-pill">🪑 {trip.availableSeats} seats left</span>
                  <span className="trip-meta-pill">⏳ {trip.duration} days</span>
                </div>

                {user?.role.toUpperCase() === "USER" && (
                  <div className="trip-actions">
                    <button
                      disabled={trip.availableSeats === 0}
                      onClick={() => handleBooking(trip.id)}
                      className="trip-btn trip-btn-primary"
                    >
                      {trip.availableSeats === 0 ? "🚫 Sold Out" : "✈ Select Seats"}
                    </button>

                    {canReview(trip) && (
                      <button
                        onClick={() => navigate(`/review/${trip.id}`)}
                        className="trip-btn trip-btn-review"
                      >
                        ✍️ Write a Review
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/trip/${trip.id}/reviews`)}
                      className="trip-btn trip-btn-outline"
                    >
                      View Reviews
                    </button>
                  </div>
                )}

                {user?.role.toUpperCase() === "ADMIN" && (
                  <div className="admin-note">Admin view — booking disabled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trips;