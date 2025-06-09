import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App';

const theme = createTheme();

ReactDOM.render(
  <GoogleOAuthProvider clientId="91726949006-le79ppulhe7h4h2m8sboio5ng2nn4cps.apps.googleusercontent.com"> 

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
