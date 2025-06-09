import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth/auth.js';
import transactitonsRoute from './routes/transactions/transactions.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api', transactitonsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${new Date().toLocaleString('id-ID')}] Server berjalan di port ${port}`);
  }
});