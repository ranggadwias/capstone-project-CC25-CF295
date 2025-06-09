
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer, Box, List, ListItemIcon, ListItemText, Button, ListItemButton, Typography, IconButton, useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle, Menu as MenuIcon
} from '@mui/icons-material';
import logo from '../image/logo.png';
import { googleLogout } from '@react-oauth/google';

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('profile');
    localStorage.removeItem('profile_image');
    navigate('/');
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: 240,
        flexShrink: 0,
        zIndex: 1300,
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
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '8px' }} />
            <Typography variant="h6" fontWeight="bold">FinMate</Typography>
          </Box>
          {isMobile && (
            <IconButton onClick={onClose}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <List>
          <ListItemButton onClick={() => { navigate('/dashboarduser'); if (isMobile) onClose(); }}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => { navigate('/transaction'); if (isMobile) onClose(); }}>
            <ListItemIcon><ListAlt /></ListItemIcon>
            <ListItemText primary="Transaction" />
          </ListItemButton>

          <ListItemButton onClick={() => { navigate('/report'); if (isMobile) onClose(); }}>
            <ListItemIcon><Info /></ListItemIcon>
            <ListItemText primary="Report" />
          </ListItemButton>

          <ListItemButton onClick={() => { navigate('/account'); if (isMobile) onClose(); }}>
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
          sx={{ backgroundColor: '#BBD9EE', color: '#000' }}
        >
          Log Out
        </Button>
      </Box>
    </Drawer>
  );
}

export default Sidebar;