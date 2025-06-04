import React, { useState } from 'react';
import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { addTransaction } from '../../services/transaction/transaction';

function Transaction() {
  const [form, setForm] = useState({
    type: '',
    amount: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      amount: parseFloat(form.amount),
      type: form.type,
      description: form.description,
      date: form.date,
    };

    try {
      const response = await addTransaction(data);
      console.log('Sukses:', response.message);
      // Reset form
      setForm({ type: '', amount: '', description: '', date: '' });
    } catch (error) {
      console.error('Gagal:', error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Add Transaction
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: '#fff',
            p: 4,
            borderRadius: 2,
            boxShadow: 1,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            select
            label="TYPE"
            name="type"
            value={form.type}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="NOMINAL"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="DESKRIPSI"
            name="description"
            value={form.description}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="DATE CREATED"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            sx={{ width: 200 }}
          />

          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#BBD9EE', color: '#000' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Transaction;