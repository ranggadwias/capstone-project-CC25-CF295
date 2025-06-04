import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const EditAccountModal = ({ open, onClose, tempProfile, setTempProfile, onUpdate }) => {
  const fields = [
    { key: 'name', label: 'Nama Lengkap' },
    { key: 'phone', label: 'No. Handphone' },
    { key: 'address', label: 'Alamat' },
    { key: 'email', label: 'Email' }
  ];

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          width: 500,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 3,
          boxShadow: 24,
          border: '1px solid #ccc',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Edit Profile
        </Typography>

        {fields.map((field, idx) => (
          <Box key={idx} sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '150px' }}>
              {field.label}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>:</Typography>
            <TextField
              variant="outlined"
              value={tempProfile[field.key]}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, [field.key]: e.target.value })
              }
              fullWidth
            />
          </Box>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={onUpdate}>
            Update
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditAccountModal;