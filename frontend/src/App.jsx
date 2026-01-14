import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Trips from './pages/Trips.jsx';
import Login from './pages/Login.jsx';
import Booking from './pages/Booking.jsx';
import Register from './pages/Register.jsx';
import Payment from './pages/Payment.jsx';
import Review from './pages/Review.jsx';
import CreateTrip from './pages/CreateTrip.jsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Register/>} />
         <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/trips" element={<Trips/>} />
         <Route path="/createTrip" element={<CreateTrip/>} />
        <Route path="/bookings" element={<Booking/>} />
        <Route path="/payments" element={<Payment/>} />
        <Route path="/review" element={<Review/>} />
      </Routes>
    </div>
  );
}

export default App
