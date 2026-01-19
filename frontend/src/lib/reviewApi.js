import {api} from "./axios";

export const addReview = (data) =>
  api.post("/review", data);

export const getReviews = (tripId) =>
  api.get(`/review/${tripId}`);

export const getTripReviewsForAdmin = (tripId) =>
  api.get(`/review/admin/${tripId}`);
