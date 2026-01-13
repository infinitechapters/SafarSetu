import express from 'express';
import { createTrip, deleteTrip, getAllTrips, singleTrip, updateTrip } from '../controllers/tripCtrl.js';
import { auth, roleAuthorize } from '../middleware/auth.js';
const router= express.Router();

router.post('/',auth, roleAuthorize('admin'), createTrip);
router.get('/',getAllTrips);
router.get('/:id', singleTrip);
router.delete('/:id',auth,roleAuthorize('admin'), deleteTrip);
router.put('/:id', auth, roleAuthorize('admin'), updateTrip);

export default router;