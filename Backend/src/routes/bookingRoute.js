import express from "express";
import { auth, roleAuthorize} from "../middleware/auth.js";
import { cancelBooking, createBooking, getBookingsForAdmin, getMyBookings, updateBookingStatus } from "../controllers/bookingCtrl.js";
const router= express.Router();

router.post('/',auth,roleAuthorize('USER'),createBooking);
router.get('/my',auth,getMyBookings);
router.get("/admin",auth,roleAuthorize("ADMIN"),getBookingsForAdmin);
router.put("/:bookingId/status",auth,roleAuthorize("ADMIN"),updateBookingStatus);

router.delete('/:bookingId/cancel',auth,roleAuthorize('USER'),cancelBooking);


export default router;