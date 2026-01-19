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

function App() {
  return (
    <>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

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
