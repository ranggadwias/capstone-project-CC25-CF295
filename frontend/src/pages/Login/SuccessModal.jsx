import React from 'react';
import { Dialog, DialogActions, DialogContent, Button, IconButton, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const SuccessModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent sx={{ textAlign: 'center' }}>
      <IconButton>
        <CheckCircle color="success" sx={{ fontSize: 50 }} />
      </IconButton>
      <Typography>Login berhasil!</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">OK</Button>
    </DialogActions>
  </Dialog>
);

export default SuccessModal;