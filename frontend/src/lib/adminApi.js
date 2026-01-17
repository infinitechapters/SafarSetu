import { api } from "./axios";

export const getAdminBookings = () =>
  api.get("/admin/bookings");
