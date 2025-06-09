import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer, Box, List, ListItemIcon, ListItemText, Button, ListItemButton, Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle
} from '@mui/icons-material';
import logo from '../image/logo.png';
import { googleLogout } from '@react-oauth/google';

function Sidebar() {
  const navigate = useNavigate();

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
        <ListItemButton>
          <img src={logo} alt="Logo" style={{ height: '100px', marginRight: '8px' }} />
          <Typography variant="h6" fontWeight="bold">FinMate</Typography>
        </ListItemButton>

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
          sx={{ backgroundColor: '#BBD9EE', color: '#000' }}
        >
          Log Out
        </Button>
      </Box>
    </Drawer>
  );
}

export default Sidebar;