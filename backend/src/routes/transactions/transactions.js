import express from 'express';
import { addTransaction } from '../../controller/transactions/add-transaction.js';
import { auth } from '../../middleware/auth/auth.js';
import { validateTransaction } from '../../middleware/transactions/transaction.js';

const router = express.Router();

router.use('/transactions', auth, validateTransaction , addTransaction);

export default router;