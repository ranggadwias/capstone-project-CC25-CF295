import express from 'express';
import { userRegister, userLogin, googleLogin, getUserProfile, updateUserProfile } from '../../controller/auth/auth.js';
import { validateRegister, validateLogin, verifyToken } from '../../middleware/auth/auth.js';

const router =  express.Router();

router.post('/register', validateRegister, userRegister);
router.post('/login', validateLogin, userLogin);
router.post("/google-login", googleLogin);
router.get('/account/:id', verifyToken, getUserProfile);
router.put('/account/:id', updateUserProfile);

export default router;