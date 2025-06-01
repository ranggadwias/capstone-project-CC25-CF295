import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Drawer, Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Button
} from '@mui/material';
import {
  Dashboard as Storage, Category, AccountCircle, ListAlt, Info
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ListItemButton } from '@mui/material';


function DashboardUser() {
  const navigate = useNavigate();
  const [openDataItems, setOpenDataItems] = useState(false);

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('profile');
    navigate('/');
  };

  const recentItems = [
    { id: 1, name: 'Redmi Note 9', type: 'Headphone', creationDate: '2024-10-23' },
    { id: 2, name: 'Samsung Galaxy S21', type: 'Smartphone', creationDate: '2024-10-24' },
    { id: 3, name: 'Apple iPhone 12', type: 'Smartphone', creationDate: '2024-10-25' },
    { id: 4, name: 'Sony WH-1000XM4', type: 'Headphone', creationDate: '2024-10-26' },
  ];

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

      {/* Main content */}
      <Box sx={{ flexGrow: 1, ml: '30px', position: 'relative', top: '-40px' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>

        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Welcome, Budi</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </Grid>

        

        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mb: 5 }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Storage sx={{ fontSize: 30, marginRight: 2 }} />
    <CardContent sx={{ p: 0 }}>
      <Typography variant="subtitle1">Available Balance</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Rp 15.200.000</Typography>
    </CardContent>
  </Box>

  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button variant="contained" sx={{ backgroundColor: '#BBD9EE', color: '#000' }}>
      Add Transaction
    </Button>
    <Button variant="contained" sx={{ backgroundColor: '#E3E3E3', color: '#000' }}>
      View Report
    </Button>
  </Box>
</Card>


        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>This Month</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'conic-gradient(#BBD9EE 0% 80%, #ccc 80% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                80%
              </Box>
            </Box>
            <Typography variant="caption">of Rp 15.200.000</Typography>
            <Typography variant="caption" color="error" display="block">Warning if limits exceeded</Typography>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ backgroundColor: '#E0F0FC', p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Total Income</Typography>
            <Typography variant="h6">Rp 10.000.000</Typography>
            <Box sx={{ mt: 1, height: 10, backgroundColor: '#c0e0f9', borderRadius: 5 }}>
              <Box sx={{ width: '66%', height: '100%', backgroundColor: '#5BA2D3', borderRadius: 5 }} />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ border: '1px solid red', p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Total Expenditure</Typography>
            <Typography variant="h6" color="error">Rp 5.200.000</Typography>
            <Box sx={{ mt: 1, height: 10, backgroundColor: '#f5bdbd', borderRadius: 5 }}>
              <Box sx={{ width: '34%', height: '100%', backgroundColor: 'red', borderRadius: 5 }} />
            </Box>
          </Card>
        </Grid>

      </Box>
    </Box>
  );
}

export default DashboardUser;
