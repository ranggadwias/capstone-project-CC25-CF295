import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function SuccessModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2,
        textAlign: 'center',
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Update Berhasil!
        </Typography>
        <Button variant="contained" onClick={onClose}>OK</Button>
      </Box>
    </Modal>
  );
}

export default SuccessModal;