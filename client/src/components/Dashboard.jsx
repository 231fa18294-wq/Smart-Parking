import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Card,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SchoolIcon from '@mui/icons-material/School';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import DirectionsIcon from '@mui/icons-material/Directions';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import ProfileDialog from './ProfileDialog';
import ParkingSlots from './ParkingSlots';
import BookingHistory from './BookingHistory';

const Dashboard = ({ onLogout, userName, darkMode }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bookingView, setBookingView] = useState(false);
  const [historyView, setHistoryView] = useState(false);
  const [selectedLocationForBooking, setSelectedLocationForBooking] = useState(null);
  const [socket, setSocket] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Initialize Socket.io connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('booking-created', (data) => {
      toast.info(`New booking at ${data.location} - Slot ${data.slotNumber}`);
    });

    newSocket.on('booking-cancelled', (data) => {
      toast.info(`Booking cancelled at ${data.location} - Slot ${data.slotNumber} is now available`);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocationForBooking(location);
    setBookingView(true);
    setHistoryView(false);
  };

  const handleBackToDashboard = () => {
    setBookingView(false);
    setHistoryView(false);
  };

  const parkingLocations = [
    {
      id: 1,
      name: 'Shopping Mall',
      icon: <StorefrontIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFD6E8',
      borderColor: '#FF9AC9',
      textColor: '#C2185B',
    },
    {
      id: 2,
      name: 'Theater',
      icon: <TheaterComedyIcon sx={{ fontSize: 50 }} />,
      bgColor: '#C7CEEA',
      borderColor: '#B5C7E8',
      textColor: '#512DA8',
    },
    {
      id: 3,
      name: 'Restaurant',
      icon: <RestaurantIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFE5CC',
      borderColor: '#FFD4AA',
      textColor: '#E65100',
    },
    {
      id: 4,
      name: 'Gym',
      icon: <FitnessCenterIcon sx={{ fontSize: 50 }} />,
      bgColor: '#B5EAD7',
      borderColor: '#A3DDD4',
      textColor: '#00695C',
    },
    {
      id: 5,
      name: 'School',
      icon: <SchoolIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFDAC1',
      borderColor: '#FFB8A3',
      textColor: '#BF360C',
    },
    {
      id: 6,
      name: 'College',
      icon: <SelfImprovementIcon sx={{ fontSize: 50 }} />,
      bgColor: '#E0BBE4',
      borderColor: '#D0A5D9',
      textColor: '#6A1B9A',
    },
    {
      id: 7,
      name: 'Playground',
      icon: <SportsBasketballIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFDAB9',
      borderColor: '#FFB89A',
      textColor: '#D84315',
    },
    {
      id: 8,
      name: 'Hospital',
      icon: <LocalHospitalIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFB3BA',
      borderColor: '#FF9BA3',
      textColor: '#C2185B',
    },
    {
      id: 9,
      name: 'Temple',
      icon: <TempleHinduIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFFFBA',
      borderColor: '#FFFF99',
      textColor: '#F57F17',
    },
    {
      id: 10,
      name: 'Highway Toll',
      icon: <DirectionsIcon sx={{ fontSize: 50 }} />,
      bgColor: '#BAE1FF',
      borderColor: '#95D5FF',
      textColor: '#01579B',
    },
    {
      id: 11,
      name: 'Tourist Place',
      icon: <TravelExploreIcon sx={{ fontSize: 50 }} />,
      bgColor: '#CAFFBF',
      borderColor: '#B0F5A9',
      textColor: '#33691E',
    },
    {
      id: 12,
      name: 'Shopping Mall 2',
      icon: <StorefrontIcon sx={{ fontSize: 50 }} />,
      bgColor: '#FFD6E8',
      borderColor: '#FF9AC9',
      textColor: '#C2185B',
    },
  ];

  // If history view is active, show booking history
  if (historyView) {
    return <BookingHistory onBack={handleBackToDashboard} />;
  }

  // If booking view is active, show parking slots instead of dashboard
  if (bookingView && selectedLocationForBooking) {
    return (
      <ParkingSlots
        location={selectedLocationForBooking}
        onBack={handleBackToDashboard}
        userName={userName}
      />
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8F9FA', pb: selectedLocation ? 15 : 0 }}>
      {/* Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
          boxShadow: '0 4px 20px rgba(106, 27, 154, 0.2)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalParkingIcon sx={{ fontSize: 35, color: '#FFFFFF' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                fontSize: '24px',
              }}
            >
              Smart Parking
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              onClick={() => setProfileOpen(true)}
              sx={{
                backgroundColor: '#FFD6E8',
                color: '#6A1B9A',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {userName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>
              {userName}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<HistoryIcon />}
              sx={{
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#FFFFFF',
                },
              }}
              onClick={() => {
                setHistoryView(true);
                setBookingView(false);
              }}
            >
              History
            </Button>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#6A1B9A',
                fontWeight: 'bold',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
              onClick={onLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F5E6FF 0%, #E6F7FF 100%)',
          py: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#6A1B9A',
              mb: 2,
            }}
          >
            Welcome back, {userName}! 👋
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666666',
              mb: 3,
            }}
          >
            Select a parking location to find and reserve your parking spot
          </Typography>
        </Container>
      </Box>

      {/* Parking Locations Grid */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#6A1B9A',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LocationOnIcon /> Available Parking Locations
        </Typography>

        <Grid container spacing={3}>
          {parkingLocations.map((location) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}>
              <Card
                onClick={() => setSelectedLocation(location)}
                sx={{
                  backgroundColor: location.bgColor,
                  borderRadius: '20px',
                  p: 3,
                  textAlign: 'center',
                  border: `3px solid ${location.borderColor}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 15px 40px rgba(106, 27, 154, 0.25)',
                  },
                }}
              >
                <Box sx={{ mb: 2, color: location.textColor }}>
                  {location.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: location.textColor,
                    mb: 1,
                  }}
                >
                  {location.name}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#6A1B9A',
                    color: '#FFFFFF',
                    borderRadius: '15px',
                    mt: 1,
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#8E24AA',
                    },
                  }}
                  onClick={() => handleLocationSelect(location)}
                >
                  Select
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Selected Location Info Panel */}
      {selectedLocation && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderTop: '4px solid #6A1B9A',
            p: 3,
            boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)',
            zIndex: 100,
            animation: 'slideUp 0.3s ease-in-out',
            '@keyframes slideUp': {
              from: {
                transform: 'translateY(100%)',
              },
              to: {
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box
                    sx={{
                      color: selectedLocation.textColor,
                    }}
                  >
                    {selectedLocation.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6A1B9A' }}>
                      Selected: {selectedLocation.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666666', mt: 0.5 }}>
                      Click "Book Now" to proceed with reservation
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#6A1B9A',
                    color: '#6A1B9A',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    '&:hover': {
                      backgroundColor: '#F5E6FF',
                    },
                  }}
                  onClick={() => setSelectedLocation(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#6A1B9A',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#8E24AA',
                    },
                  }}
                  onClick={() => handleLocationSelect(selectedLocation)}
                >
                  Book Now →
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      )}

      <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onHistoryClick={() => {
          setHistoryView(true);
          setBookingView(false);
          setProfileOpen(false);
        }}
      />
    </Box>
  );
};

export default Dashboard;
