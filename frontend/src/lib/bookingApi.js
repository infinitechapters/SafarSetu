import {api} from "./axios";

export const createBooking = (data) =>
  api.post("/bookings", data);

export const getMyBookings = () =>
  api.get("/bookings/my");

export const cancelBooking = (bookingId) =>
  api.put(`/bookings/cancel/${bookingId}`);
