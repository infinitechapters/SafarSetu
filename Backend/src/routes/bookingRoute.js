import express from "express";
import { auth} from "../middleware/auth.js";
import { cancelBooking, createBooking, getMyBookings } from "../controllers/bookingCtrl.js";
const router= express.Router();

router.post('/',auth,createBooking);
router.get('/my',auth,getMyBookings);
router.delete('/:bookingId/cancel',auth,cancelBooking);

export default router;