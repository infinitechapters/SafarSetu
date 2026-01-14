import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Trips from './pages/Trips.jsx';
import Login from './pages/Login.jsx';
import Booking from './pages/Booking.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Register/>} />
         <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/bookings" element={<Booking/>} />
      </Routes>
    </div>
  );
}

export default App
