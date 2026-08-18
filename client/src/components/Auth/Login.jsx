import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CircularProgress,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ onSuccess, onRegisterClick }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful! Redirecting...');
      setTimeout(() => onSuccess(), 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors.map(err => err.message).join(', ')
        : error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ p: 5, width: '100%', maxWidth: '450px', borderRadius: '30px' }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #17A697 0%, #6A1B9A 100%)',
              borderRadius: '30px',
              p: 4,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <DirectionsCarIcon sx={{ fontSize: 50, color: '#FFFFFF', mr: 2 }} />
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  fontSize: '20px',
                }}
              >
                Smart Parking
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 4,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#FFFFFF',
              }}
            >
              Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: '25px',
                    '& fieldset': {
                      borderColor: '#FFFFFF',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#999999',
                  },
                }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: '25px',
                    '& fieldset': {
                      borderColor: '#FFFFFF',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#999999',
                  },
                }}
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.8,
                  backgroundColor: '#5DADE2',
                  color: '#FFFFFF',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#4A9FD8',
                  },
                  '&:disabled': {
                    backgroundColor: '#B0B0B0',
                  },
                }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                  Don't have an account?{' '}
                  <Button
                    onClick={onRegisterClick}
                    sx={{
                      textTransform: 'none',
                      color: '#5DADE2',
                      fontWeight: 600,
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Register now
                  </Button>
                </Typography>
              </Box>
            </form>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;