import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth/auth.js';
import transactionsRoute from './routes/transactions/transactions.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FinMate Backend is running");
});

app.use('/api/auth', authRouter);
app.use('/api', transactionsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${new Date().toLocaleString('id-ID')}] Server berjalan di port ${port}`);
  }
});