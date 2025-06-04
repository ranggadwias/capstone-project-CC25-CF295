import React from 'react';
import { Dialog, DialogContent, DialogActions, IconButton, Button, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function SuccessModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: 'center' }}>
        <IconButton>
          <CheckCircle color="success" sx={{ fontSize: 50 }} />
        </IconButton>
        <Typography>Registrasi berhasil!</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">OK</Button>
      </DialogActions>
    </Dialog>
  );
}