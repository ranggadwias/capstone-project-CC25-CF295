import React, { useState } from 'react';
import {
  CssBaseline, Box, Toolbar, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DashboardUser from './pages/Dashboard/DashboardUser';
import Transaction from './pages/Transaction/Transaction';
import Report from './pages/Report/Report';
import Account from './pages/Account/Account';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hamburger menu hanya muncul jika sudah login
  const showHamburger = isLoggedIn;

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* Hamburger menu */}
        {showHamburger && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setSidebarOpen(true)}
            edge="start"
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1301 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Konten Utama */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            {/* Route ke halaman login jika belum login */}
            {!isLoggedIn ? (
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            ) : (
              <Route path="/" element={<Navigate to="/dashboarduser" />} />
            )}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
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