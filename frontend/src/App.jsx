import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Review from "./pages/Review";
import CreateTrip from "./pages/CreateTrip";
import SelectSeats from "./pages/SelectSeats";
import AdminTripReviews from "./pages/AdminTripReviews";
import ViewReview from "./pages/ViewReview";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/trips" element={<Trips />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/select_seats/:tripId" element={<SelectSeats/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/review/:tripId" element={<Review />} />
        <Route path="/trip/:tripId/reviews" element={<ViewReview />} />
        <Route path="/admin/trip/:tripId/reviews" element={<AdminTripReviews/>}/>
        <Route path="/createTrip" element={<CreateTrip />} />

      </Routes>
    </>
  );
}

export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Home from "./components/Home";
// import Trips from "./pages/Trips";
// import Login from "./pages/Login";
// import Booking from "./pages/Booking";
// import Register from "./pages/Register";
// import Payment from "./pages/Payment";
// import Review from "./pages/Review";
// import CreateTrip from "./pages/CreateTrip";
// import SelectSeats from "./pages/SelectSeats";
// import AdminTripReviews from "./pages/AdminTripReviews";
// import ViewReview from "./pages/ViewReview";
// import Profile from "./components/Profile";

// /* ===================== AUTH HELPERS ===================== */
// const isLoggedIn = () => {
//   return document.cookie.includes("token");
// };

// const isAdmin = () => {
//   return localStorage.getItem("role") === "ADMIN";
// };

// const ProtectedRoute = ({ children }) => {
//   return isLoggedIn() ? children : <Navigate to="/login" />;
// };

// const AdminRoute = ({ children }) => {
//   return isLoggedIn() && isAdmin()
//     ? children
//     : <Navigate to="/home" />;
// };

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         {/* ========= PUBLIC ROUTES ========= */}
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* ========= USER ROUTES ========= */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/trips" element={<Trips />} />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/bookings"
//           element={
//             <ProtectedRoute>
//               <Booking />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/select_seats/:tripId"
//           element={
//             <ProtectedRoute>
//               <SelectSeats />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/payment"
//           element={
//             <ProtectedRoute>
//               <Payment />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/review/:tripId"
//           element={
//             <ProtectedRoute>
//               <Review />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/trip/:tripId/reviews" element={<ViewReview />} />

//         {/* ========= ADMIN ROUTES ========= */}
//         <Route
//           path="/admin/trip/:tripId/reviews"
//           element={
//             <AdminRoute>
//               <AdminTripReviews />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/createTrip"
//           element={
//             <AdminRoute>
//               <CreateTrip />
//             </AdminRoute>
//           }
//         />

//         {/* ========= FALLBACK ========= */}
//         <Route path="*" element={<Navigate to="/home" />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
