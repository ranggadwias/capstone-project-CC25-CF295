import React from 'react';
import { Dialog, DialogActions, DialogContent, Button, IconButton, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';

const ErrorModal = ({ open, handleClose, error }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogContent sx={{ textAlign: 'center' }}>
      <IconButton>
        <Cancel color="error" sx={{ fontSize: 50 }} />
      </IconButton>
      <Typography>{error}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">OK</Button>
    </DialogActions>
  </Dialog>
);

export default ErrorModal;