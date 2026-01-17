import express from 'express';
import { getMe, login, register,logout } from '../controllers/userCtrl.js';
import { auth } from '../middleware/auth.js';

const router= express.Router();

router.post('/register', register);
router.post('/login',login);
router.get("/me", auth, getMe); // 
router.post('/logout', logout);

export default router;