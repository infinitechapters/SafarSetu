import express from 'express';
import {auth} from '../middleware/auth.js';
import { createPayment } from '../controllers/paymentCtrl.js';

const router = express.Router();

router.post('/',auth, createPayment);

export default router;