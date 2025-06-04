import React from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, MenuItem, Select } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const transactions = [
  { title: 'Salary', type: 'Income', date: 'Apr 25', amount: 'Rp 1.000.000' },
  { title: 'Groceries', type: 'Expenses', date: 'Apr 25', amount: 'Rp 200.000' },
  { title: 'Electricity', type: 'Expenses', date: 'Apr 18', amount: 'Rp 150.000' },
];

function ReportPage() {
  const [period, setPeriod] = React.useState('monthly');

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
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
              {transactions.map((trx, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight="bold">{trx.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{trx.type}</Typography>
                  </TableCell>
                  <TableCell>{trx.date}</TableCell>
                  <TableCell>{trx.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}

export default ReportPage;