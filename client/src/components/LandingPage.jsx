import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  AppBar,
  Toolbar,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimerIcon from '@mui/icons-material/Timer';
import PaymentsIcon from '@mui/icons-material/Payments';

const LandingPage = ({ onLoginClick }) => {
  const features = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 50, color: '#FF6B9D' }} />,
      title: 'Find Parking Spaces',
      description: 'Discover available parking spaces near you in real-time',
      bgColor: '#FFE5EC',
    },
    {
      icon: <BookmarkIcon sx={{ fontSize: 50, color: '#C44569' }} />,
      title: 'Easy Reservation',
      description: 'Reserve your parking spot in advance',
      bgColor: '#FADADD',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 50, color: '#A8E6CF' }} />,
      title: 'Email Notifications',
      description: 'Get instant email updates for your bookings',
      bgColor: '#DFFCF0',
    },
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 50, color: '#FFD3B6' }} />,
      title: 'Vehicle Support',
      description: 'Support for 2-wheeler, 3-wheeler & 4-wheeler vehicles',
      bgColor: '#FFEDDE',
    },
    {
      icon: <TimerIcon sx={{ fontSize: 50, color: '#FFAAA5' }} />,
      title: 'Real-Time Tracking',
      description: 'Track your parking time and duration',
      bgColor: '#FFE5E0',
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 50, color: '#AA96DA' }} />,
      title: 'Smart Pricing',
      description: 'Transparent pricing based on parking duration',
      bgColor: '#EFDBF8',
    },
  ];

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
          boxShadow: '0 4px 20px rgba(106, 27, 154, 0.2)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DirectionsCarIcon sx={{ fontSize: 35, color: '#FFFFFF' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: '24px',
              }}
            >
              Smart Parking System
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#6A1B9A',
              fontWeight: 'bold',
              borderRadius: '25px',
              px: 3,
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
            onClick={onLoginClick}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F5E6FF 0%, #E6F7FF 100%)',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <DirectionsCarIcon sx={{ fontSize: 80, color: '#6A1B9A' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#6A1B9A',
              mb: 2,
            }}
          >
            Find Your Perfect Parking Spot
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666666',
              mb: 4,
            }}
          >
            Smart parking made easy. Reserve, track, and manage your parking with just a few clicks.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#6A1B9A',
              color: '#FFFFFF',
              borderRadius: '25px',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#8E24AA',
              },
            }}
            onClick={onLoginClick}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#6A1B9A',
              textAlign: 'center',
              mb: 6,
            }}
          >
            Why Choose Us?
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: feature.bgColor,
                    borderRadius: '15px',
                    p: 3,
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#333333',
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666666',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
          py: 8,
          textAlign: 'center',
          color: '#FFFFFF',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Ready to Find Your Parking?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
            }}
          >
            Join thousands of users who trust Smart Parking System
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#6A1B9A',
              borderRadius: '25px',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
            onClick={onLoginClick}
          >
            Login Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
