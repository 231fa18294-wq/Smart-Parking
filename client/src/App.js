import React, { useState, useMemo } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import { Box, Typography, Button, CssBaseline, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [userName, setUserName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#6A1B9A',
            light: '#8E24AA',
            dark: '#4A0E4E',
          },
          secondary: {
            main: darkMode ? '#1E1E1E' : '#FFFFFF',
          },
          background: {
            default: darkMode ? '#121212' : '#F5F5F5',
            paper: darkMode ? '#1E1E1E' : '#FFFFFF',
          },
          text: {
            primary: darkMode ? '#FFFFFF' : '#333333',
            secondary: darkMode ? '#B0B0B0' : '#666666',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 700,
            color: darkMode ? '#FFFFFF' : '#FFFFFF',
          },
          h5: {
            fontWeight: 600,
            color: darkMode ? '#FFFFFF' : '#333333',
          },
          body2: {
            color: darkMode ? '#B0B0B0' : '#666666',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              contained: {
                backgroundColor: '#6A1B9A',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#8E24AA',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#FFFFFF' : '#333333',
                  backgroundColor: darkMode ? '#2A2A2A' : '#FFFFFF',
                  '& fieldset': {
                    borderColor: darkMode ? '#444444' : '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6A1B9A',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6A1B9A',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? '#B0B0B0' : '#999999',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6A1B9A',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
                borderRadius: '20px',
                boxShadow: darkMode
                  ? '0 10px 40px rgba(0, 0, 0, 0.5)'
                  : '0 10px 40px rgba(106, 27, 154, 0.15)',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const handleLoginSuccess = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user?.name || 'User');
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentPage('landing');
    setUserName('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        {/* Theme Toggle Button */}
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            backgroundColor: 'background.paper',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'background.paper',
              transform: 'scale(1.1)',
            },
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />

        {!isAuthenticated ? (
          <>
            {currentPage === 'landing' ? (
              <LandingPage onLoginClick={() => setCurrentPage('login')} />
            ) : currentPage === 'login' ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Box sx={{ width: '100%' }}>
                  <Login onSuccess={handleLoginSuccess} onRegisterClick={() => setCurrentPage('register')} />
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Box sx={{ width: '100%' }}>
                  <Register onSuccess={handleRegisterSuccess} />
                  <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                    <Typography variant="body2">
                      Already have an account?{' '}
                      <Button
                        onClick={() => setCurrentPage('login')}
                        sx={{ textTransform: 'none', color: '#6A1B9A', fontWeight: 600 }}
                      >
                        Login here
                      </Button>
                    </Typography>
                    <Button
                      onClick={() => setCurrentPage('landing')}
                      sx={{ textTransform: 'none', color: '#6A1B9A', fontWeight: 600, display: 'block', mt: 1 }}
                    >
                      ← Back to Home
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <Dashboard onLogout={handleLogout} userName={userName} darkMode={darkMode} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;