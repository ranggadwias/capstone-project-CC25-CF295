import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App';

const theme = createTheme();

ReactDOM.render(
  <GoogleOAuthProvider clientId="563199896555-sk8bufkuvhnoker77ukjg9d1vva5is6b.apps.googleusercontent.com"> 

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
