import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, MenuItem, Select, CircularProgress
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getReport } from '../../services/report/report';


function Report() {
  const [period, setPeriod] = useState('monthly');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token'); // ambil token
        const data = await getReport(token, period);
        setTransactions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [period]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {isMobile && (
          <IconButton onClick={() => setSidebarOpen(true)} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1400 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" fontWeight="bold">Report Transaction</Typography>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 3 }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </Box>

        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Transaction History</Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" mt={4}>{error}</Typography>
        ) : (
          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">No transactions found</TableCell>
                  </TableRow>
                ) : (
                  transactions.map((trx) => (
                    <TableRow key={trx.transactionId}>
                      <TableCell>
                        <Typography fontWeight="bold">{trx.description}</Typography>
                        <Typography variant="body2" color="text.secondary">{trx.type}</Typography>
                      </TableCell>
                      <TableCell>{trx.date}</TableCell>
                      <TableCell>{`Rp ${trx.amount.toLocaleString('id-ID')}`}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default Report;