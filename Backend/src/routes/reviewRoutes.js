import express from "express";
import {auth} from "../middleware/auth.js";
import { addReview, getReviews, getTripReviewsForAdmin } from "../controllers/reviewCtrl.js";

const router= express.Router();

router.get('/:tripId', getReviews);
router.post('/',auth, addReview);
router.get(
  "/admin/:tripId",
  auth,
  getTripReviewsForAdmin
);

export default router;