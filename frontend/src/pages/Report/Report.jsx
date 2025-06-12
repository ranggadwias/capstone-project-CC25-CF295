import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, MenuItem, Select, CircularProgress,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getReport, getSummary } from '../../services/report/report';
import * as tf from '@tensorflow/tfjs';

const CLUSTER_LABELS = {
  0: 'Pengeluaran Kecil',
  1: 'Pengeluaran Sedang',
  2: 'Pengeluaran Besar',
};

function Report() {
  const [period, setPeriod] = useState('monthly');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState({});
  const [income, setIncome] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const loadModel = useCallback(async () => {
    try {
      const loadedModel = await tf.loadGraphModel('/tfjs-model/model.json');
      setModel(loadedModel);
    } catch (error) {
      console.error('[ML] Gagal load model:', error);
    }
  }, []);

  const fetchIncome = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const summary = await getSummary(token);
      setIncome(summary.totalIncome || 0);
    } catch (error) {
      console.error('[API] Gagal fetch income:', error);
      setIncome(0);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = await getReport(token, period);
      setTransactions(data);
    } catch (err) {
      console.error('[API] Gagal fetch transaksi:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [period]);

  const normalizeInput = (amount, income) => {
    if (income <= 0) return 0;
    const ratio = amount / income;
    return Math.min(Math.max(ratio, 0), 1);
  };

  const classifyExpenses = useCallback(async () => {
    if (!model || transactions.length === 0 || income <= 0) return;

    const newLabels = {};
    for (const trx of transactions) {
      if (trx.type !== 'expense') continue;

      try {
        const normalizedValue = normalizeInput(trx.amount, income);
        const inputTensor = tf.tensor2d([[normalizedValue]]);
        const predictionTensor = model.predict(inputTensor);
        const predictionArray = await predictionTensor.data();

        inputTensor.dispose();
        predictionTensor.dispose();

        const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
        newLabels[trx.transactionId] = CLUSTER_LABELS[maxIndex] || '-';
      } catch (error) {
        console.error(`[ML] Gagal klasifikasi trx ${trx.transactionId}:`, error);
      }
    }

    setLabels(newLabels);
  }, [model, transactions, income]);

  useEffect(() => {
    loadModel();
    fetchIncome();
  }, [loadModel, fetchIncome]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    classifyExpenses();
  }, [classifyExpenses]);

  const renderTableRows = () => {
    if (transactions.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">No transactions found</TableCell>
        </TableRow>
      );
    }

    return transactions.map((trx) => (
      <TableRow key={trx.transactionId}>
        <TableCell>
          <Typography fontWeight="bold">{trx.description}</Typography>
          <Typography
            variant="body2"
            sx={{
              color: trx.type === 'income' ? 'green' : 'red',
              fontWeight: 500,
            }}
          >
            {trx.type}
          </Typography>
        </TableCell>
        <TableCell>{trx.date}</TableCell>
        <TableCell sx={{ textAlign: 'right' }}>
          {`Rp ${trx.amount.toLocaleString('id-ID')}`}
        </TableCell>
        <TableCell>{trx.category || '-'}</TableCell>
        <TableCell>
          {trx.type === 'expense' ? (labels[trx.transactionId] || '-') : '-'}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {isMobile && (
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1400 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h3" fontWeight="bold">Report Transaction</Typography>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 3, minWidth: 120 }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </Box>

        <Typography variant="h4" sx={{ mb: 2 }}>Transaction History</Typography>

        {(loading || !model || income <= 0) ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Kategori</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tingkat Pengeluaran</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default Report;