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

function App() {
  return (
    <>
      <Navbar /> {/* ✅ ONE navbar for whole app */}

      <Routes>
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/trips" element={<Trips />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/review" element={<Review />} />
        <Route path="/createTrip" element={<CreateTrip />} />
      </Routes>
    </>
  );
}

export default App;
