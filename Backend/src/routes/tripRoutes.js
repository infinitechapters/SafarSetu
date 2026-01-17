import express from 'express';
import { createTrip, deleteTrip, getAllTrips, singleTrip, updateTrip } from '../controllers/tripCtrl.js';
import { auth, roleAuthorize } from '../middleware/auth.js';
const router= express.Router();

router.post('/', auth, roleAuthorize('ADMIN'), createTrip);

router.get('/', auth, getAllTrips);
router.get('/:id', auth, singleTrip);

router.delete('/:id', auth, roleAuthorize('ADMIN'), deleteTrip);
router.put('/:id', auth, roleAuthorize('ADMIN'), updateTrip);

export default router;