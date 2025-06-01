import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const DetailAkun = ({ open, user, onClose }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!user) return null; // Jika tidak ada pengguna yang dipilih, jangan render modal

  const handleDeleteClick = () => {
    setConfirmOpen(true); // Buka modal konfirmasi
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    onClose(); // Tutup modal utama setelah konfirmasi penghapusan
    // Lakukan aksi penghapusan akun di sini
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false); // Tutup modal konfirmasi
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ position: 'relative', height: '100%' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 5 }}>
              ACCOUNT
            </Typography>
            {[
              { label: "NAME", value: "SULYONO" },
              { label: "NIK", value: "45312342" },
              { label: "BORN DATE", value: "12 August 1987" },
              { label: "DEPARTMENT", value: "ADMIN" },
              { label: "PHONE", value: "087251742212" },
              {
                label: "PERIOD",
                value: "AVAILABLE",
                color: 'green',
                underline: true
              }
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: 'black', minWidth: '200px' }}
                >
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
                  :
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'normal',
                    color: item.color || 'black',
                    ml: 2,
                    borderBottom: item.underline ? '2px solid green' : 'none'
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 15 }}>
              <Button
                variant="contained"
                onClick={handleDeleteClick} // Memicu modal konfirmasi
                sx={{ mr: 1, backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
              >
                DELETE
              </Button>
              <Button variant="contained" onClick={onClose}>
                CONFIRM
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal Konfirmasi */}
      <Modal open={confirmOpen} onClose={handleCloseConfirm}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
            ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleConfirmDelete}
              sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
            >
              NO
            </Button>
            <Button variant="contained" onClick={handleCloseConfirm}>
              YES
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DetailAkun;
