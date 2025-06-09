import express from 'express';
import { addTransaction } from '../../controller/transactions/add-transaction.js';
import { auth } from '../../middleware/auth/auth.js';
import { validateAddTransaction, validateTransactionDate } from '../../middleware/transactions/transactions.js';
import { getAllTransactions } from '../../controller/transactions/get-all-transactions.js';
import { getDashboardSummary } from '../../controller/transactions/get-dashboard-summary.js';

const router = express.Router();

router.post('/transactions', auth, validateAddTransaction, validateTransactionDate , addTransaction);
router.get('/transactions', auth, getAllTransactions);

router.get('/transactions/summary', auth, getDashboardSummary);

export default router;