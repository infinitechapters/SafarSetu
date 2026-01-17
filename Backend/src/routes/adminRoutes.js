import express from "express";
import { auth, roleAuthorize } from "../middleware/auth.js";
import { getBookingsForAdmin } from "../controllers/bookingCtrl.js";

const router = express.Router();

router.get("/bookings", auth, roleAuthorize("ADMIN"), getBookingsForAdmin);

export default router;
