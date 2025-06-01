import React, { useState } from 'react';
import {
  CssBaseline, Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse
} from '@mui/material';
import {
  Menu as  ExpandLess, ExpandMore, Search, Description, Info, AccountCircle, ListAlt, Storage
} from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import logo from './image/logo.png';  
import Loginform from './loginform';
import Register from './register';
import DashboardUser from './dashboarduser';
import Transaction from './transaction';
import Report from './report';


import Account from './account';


function App() {
  const [open,] = useState(false);
  const [openDataItems, setOpenDataItems] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Status login

  const handleDataItemsClick = () => {
    setOpenDataItems(!openDataItems);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* AppBar Utama */}
        {isLoggedIn && (
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center">
                <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h7" color="white">PT SAT NUSAPERSADA Tbk</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>
                    High Technology Electronics Manufacturers
                  </Typography>
                </Box>
              </Box>

            </Toolbar>
          </AppBar>
        )}

        {/* Sidebar hanya muncul jika sudah login */}
        {isLoggedIn && (
          <Drawer
            variant="permanent"
            open={open}
            sx={{
              '& .MuiDrawer-paper': { position: 'revert-layer', whiteSpace: 'nowrap', width: 240, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <List>
              {/* Menu Dashboard */}
              <ListItem button component={Link} to="/dashboarduser">
                <ListItemIcon>
                  <Storage />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              {/* Menu Data Items with Submenu */}
              <ListItem button onClick={handleDataItemsClick}>
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Data Items" />
                {openDataItems ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openDataItems} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }} component={Link} to="/searchuser">
                    <ListItemIcon>
                      <Search />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }} component={Link} to="/createuser">
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                  </ListItem>
                </List>
              </Collapse>
              {/* Menu About */}
              <ListItem button component={Link} to="/aboutuser">
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
              {/* Menu Account */}
              <ListItem button component={Link} to="/account">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </Drawer>
        )}

        {/* Konten Utama */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            {/* Route ke halaman login jika belum login */}
            {!isLoggedIn ? (
              <Route path="/" element={<Loginform setIsLoggedIn={setIsLoggedIn} />} />
            ) : (
              <Route path="/" element={<Navigate to="/dashboarduser" />} />
            )}
            <Route path="/loginform" element={<Loginform setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboarduser" element={<DashboardUser />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/report" element={<Report />} />
            <Route path="/register" element={<Register />} />
            
 
            <Route path="/account" element={<Account />} />
            
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
