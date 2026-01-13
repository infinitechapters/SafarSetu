import express from "express";
import {auth} from "../middleware/auth.js";
import { addReview, getReviews } from "../controllers/reviewCtrl.js";

const router= express.Router();

router.get('/:tripId', getReviews);
router.post('/',auth, addReview);

export default router;