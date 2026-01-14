import { api } from "./axios";

export const getAllTrips = () => api.get("/trips");
export const getSingleTrip = (id) => api.get(`/trips/${id}`);
export const createTrip = (tripData) => api.post("/trips", tripData);
export const updateTrip = (id, tripData) => api.put(`/trips/${id}`, tripData);