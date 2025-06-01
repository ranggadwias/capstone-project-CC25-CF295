import express from 'express';
import { userRegister, userLogin } from '../../controller/auth/auth.js';
import { validateRegister, validateLogin } from '../../middleware/auth/auth.js';

const router =  express.Router();

router.post('/register', validateRegister, userRegister);
router.post('/login', validateLogin, userLogin);

export default router;