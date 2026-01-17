import {api} from "./axios";

export const createBooking = (data) =>
  api.post("/bookings", data);

export const getMyBookings = () =>
  api.get("/bookings/my");

export const cancelBooking = (bookingId) =>
  api.delete(`/bookings/${bookingId}/cancel`);

export const getAdminBookings = () =>
  api.get("/bookings/admin");

export const updateBookingStatus = (bookingId, status) =>
  api.put(`/bookings/${bookingId}/status`, { status });
