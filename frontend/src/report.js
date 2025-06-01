import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Drawer, Box, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem, ListItemIcon, ListItemText, Button
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

        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" sx={{ height: '100%' }}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 5 }}>
                <Storage sx={{ fontSize: 30, marginRight: 2 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '0.9rem' }}>Total Items :</Typography>
                  <Typography variant="h4" component="div" sx={{ fontSize: '1.5rem' }}>106 PCS</Typography>
                </CardContent>
              </Card>

              <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 5 }}>
                <Category sx={{ fontSize: 30, marginRight: 2 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '0.9rem' }}>Total Types :</Typography>
                  <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>43 Types</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 8, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>Recently Added Items</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Date Created</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentItems.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.creationDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DashboardUser;
