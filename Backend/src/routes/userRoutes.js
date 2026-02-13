import express from 'express';
import { getMe, login, register,logout, updateProfile, profileImageUpdate } from '../controllers/userCtrl.js';
import { auth } from '../middleware/auth.js';

const router= express.Router();

router.post('/register', register);
router.post('/login',login);
router.get("/me", auth, getMe); // 
router.put("/me", auth, updateProfile);
router.post('/logout', logout);
router.put("/profile", auth, profileImageUpdate);


export default router;