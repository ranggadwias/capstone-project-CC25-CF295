import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer, Box, Typography, Grid, Card, List, ListItem, ListItemIcon, ListItemText,
  Button, Avatar, TextField, Modal
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ListAlt,
  Info,
  AccountCircle
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';
import { ListItemButton } from '@mui/material';

function Account() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    address: 'Jl. Contoh No. 123',
    email: 'johndoe@email.com',
    phone: '081277459336'
  });

  const [tempProfile, setTempProfile] = useState({ ...userData });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSuccesModal, setOpenSuccesModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('profile');
    navigate('/');
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setOpenCancelModal(true); // Tampilkan modal cancel saat edit dibatalkan
  };

  const handleOpenEditModal = () => {
    setTempProfile({ ...userData });
    setOpenEditModal(true);
  };

  const handleUpdateProfile = () => {
    setUserData(tempProfile);
    setOpenEditModal(false);
    setOpenSuccesModal(true); // Tampilkan modal sukses
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            display: 'flex',
            backgroundColor: '#f0f0f0',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box>
          <ListItem>
            <img src={logo} alt="Logo" style={{ height: '100px', marginRight: '1px' }} />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontFamily: 'Times New Roman', fontSize: '24px' }}
            >
              FinMate
            </Typography>
          </ListItem>

          <List>
            <ListItemButton onClick={() => navigate('/dashboarduser')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/transaction')}>
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText primary="Transaction" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/report')}>
              <ListItemIcon><Info /></ListItemIcon>
              <ListItemText primary="Report" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/account')}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </List>
        </Box>

        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            sx={{
              backgroundColor: '#BBD9EE',
              color: '#000',
              '&:hover': {
                backgroundColor: '#A2C9E6',
              },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, ml: '30px', position: 'relative', top: '-40px' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Account
        </Typography>

        <Card sx={{ textAlign: 'center', p: 2 }} />

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 180,
                height: 180,
                mx: 'auto',
                bgcolor: 'grey.400',
                mb: 2,
              }}
              src={profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="upload-avatar"
            />
            <label htmlFor="upload-avatar">
              <Button variant="outlined" component="span" sx={{ mt: 2 }}>
                Upload Photo
              </Button>
            </label>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Nama Lengkap" value={userData.name} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="No. Handphone" value={userData.phone} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Alamat" value={userData.address} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" value={userData.email} InputProps={{ readOnly: true }} />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Button
                variant="contained"
                onClick={handleOpenEditModal}
                sx={{
                  bgcolor: '#E3EAF6',
                  color: '#000',
                  borderRadius: 2,
                  fontWeight: 'bold',
                  px: 4,
                }}
              >
                EDIT
              </Button>
            </Box>
          </Grid>

          {/* Modal Edit Profile */}
          <Modal open={openEditModal} onClose={handleCloseEditModal}>
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', width: 500,
              bgcolor: 'background.paper', p: 4, borderRadius: 5
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Edit Profile
              </Typography>

              {[
                { key: 'name', label: 'Nama Lengkap' },
                { key: 'phone', label: 'No. Handphone' },
                { key: 'address', label: 'Alamat' },
                { key: 'email', label: 'Email' }
              ].map((field, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: '150px' }}>
                    {field.label}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>:</Typography>
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

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                  Update
                </Button>
                <Button variant="outlined" onClick={handleCloseEditModal} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Modal Update Berhasil */}
          <Modal open={openSuccesModal} onClose={() => setOpenSuccesModal(false)}>
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', width: 300,
              bgcolor: 'background.paper', p: 3, borderRadius: 2, textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Update Berhasil!</Typography>
              <Button variant="contained" onClick={() => setOpenSuccesModal(false)}>OK</Button>
            </Box>
          </Modal>

          {/* Modal Cancel */}
          <Modal open={openCancelModal} onClose={() => setOpenCancelModal(false)}>
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', width: 300,
              bgcolor: 'background.paper', p: 3, borderRadius: 2, textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Perubahan Dibatalkan</Typography>
              <Button variant="contained" onClick={() => setOpenCancelModal(false)}>OK</Button>
            </Box>
          </Modal>

        </Grid>
      </Box>
    </Box>
  );
}

export default Account;
