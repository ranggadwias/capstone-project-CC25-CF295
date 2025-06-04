import React from 'react';
import { Dialog, DialogContent, DialogActions, IconButton, Button, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';

export default function ErrorModal({ open, onClose, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: 'center' }}>
        <IconButton>
          <Cancel color="error" sx={{ fontSize: 50 }} />
        </IconButton>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">OK</Button>
      </DialogActions>
    </Dialog>
  );
}