import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const ParkingSlots = ({ location, onBack, userName }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    hours: '1',
    vehicleType: '2-wheeler',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Generate random parking slots (15-25 slots)
  const slotCount = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
  const availableSlots = Array.from({ length: slotCount }, (_, i) => ({
    id: i + 1,
    number: `${location.name.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    status: Math.random() > 0.3 ? 'available' : 'booked',
  }));

  const vehiclePrices = {
    '2-wheeler': 10,
    '3-wheeler': 20,
    '4-wheeler': 30,
  };

  const calculateCost = () => {
    const hours = parseInt(formData.hours) || 1;
    const price = vehiclePrices[formData.vehicleType];
    return hours * price;
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a parking slot');
      return;
    }

    const hours = parseInt(formData.hours) || 1;
    const cost = calculateCost();
    const bookingTime = new Date();
    const exitTime = new Date(Date.now() + hours * 60 * 60 * 1000);

    const details = {
      slotNumber: selectedSlot.number,
      location: location.name,
      vehicleType: formData.vehicleType,
      hours: hours,
      cost: cost,
      bookingTime: bookingTime,
      exitTime: exitTime,
      userName: userName,
    };

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Save booking to database
      const response = await axios.post(
        'http://localhost:5000/api/bookings/create',
        {
          slotNumber: details.slotNumber,
          location: details.location,
          vehicleType: details.vehicleType,
          duration: details.hours,
          cost: details.cost,
          bookingTime: details.bookingTime,
          exitTime: details.exitTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setBookingDetails(details);
        setBookingSuccess(true);

        // Reset form
        setTimeout(() => {
          setSelectedSlot(null);
          setFormData({ hours: '1', vehicleType: '2-wheeler' });
        }, 3000);
      }
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.message || error.message));
    }
  };

  if (bookingSuccess) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
        <Dialog open={bookingSuccess} onClose={() => setBookingSuccess(false)} maxWidth="sm" fullWidth>
          <DialogTitle
            sx={{
              background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
              color: '#FFFFFF',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CheckCircleIcon /> Booking Confirmed!
          </DialogTitle>
          <DialogContent sx={{ py: 4, minWidth: '400px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: '#6A1B9A' }} />
            </Box>

            {bookingDetails && (
              <Box sx={{ backgroundColor: '#F5E6FF', p: 2, borderRadius: '10px' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Slot:</strong> {bookingDetails.slotNumber}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Location:</strong> {bookingDetails.location}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Vehicle:</strong> {bookingDetails.vehicleType}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Duration:</strong> {bookingDetails.hours} hour(s)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Cost:</strong> ₹{bookingDetails.cost}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Booked:</strong> {bookingDetails.bookingTime.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Exit Time:</strong> {bookingDetails.exitTime.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: '#B5EAD7',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  ✓ Confirmation email sent!
                </Typography>
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#6A1B9A',
                color: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: '15px',
                mt: 3,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#8E24AA',
                },
              }}
              onClick={onBack}
            >
              Back to Locations
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      {/* Top Bar */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)',
          boxShadow: '0 4px 20px rgba(106, 27, 154, 0.2)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: '#FFFFFF', fontWeight: 'bold' }}
            onClick={onBack}
          >
            Back
          </Button>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#FFFFFF',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <LocalParkingIcon /> {location.name}
          </Typography>
          <Box />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Available Slots */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#6A1B9A',
            mb: 3,
          }}
        >
          Available Parking Slots ({availableSlots.filter(s => s.status === 'available').length}/{slotCount})
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {availableSlots.map((slot) => (
            <Grid item xs={6} sm={4} md={3} key={slot.id}>
              <Card
                onClick={() => {
                  if (slot.status === 'available') {
                    setSelectedSlot(slot);
                  }
                }}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: slot.status === 'available' ? 'pointer' : 'not-allowed',
                  backgroundColor:
                    selectedSlot?.id === slot.id
                      ? '#6A1B9A'
                      : slot.status === 'available'
                      ? '#B5EAD7'
                      : '#FFB3BA',
                  color: selectedSlot?.id === slot.id ? '#FFFFFF' : '#333333',
                  border:
                    selectedSlot?.id === slot.id ? '3px solid #6A1B9A' : 'none',
                  borderRadius: '15px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform:
                      slot.status === 'available' ? 'scale(1.05)' : 'scale(1)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {slot.number}
                </Typography>
                <Typography variant="caption">
                  {slot.status === 'available' ? '✓ Available' : '✗ Booked'}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedSlot && (
          <Card sx={{ p: 4, backgroundColor: '#F5E6FF', borderRadius: '20px', mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#6A1B9A',
                mb: 3,
              }}
            >
              Booking Details - Slot: {selectedSlot.number}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    value={formData.vehicleType}
                    label="Vehicle Type"
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleType: e.target.value })
                    }
                  >
                    <MenuItem value="2-wheeler">2-Wheeler (₹10/hr)</MenuItem>
                    <MenuItem value="3-wheeler">3-Wheeler (₹20/hr)</MenuItem>
                    <MenuItem value="4-wheeler">4-Wheeler (₹30/hr)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration (Hours)"
                  type="number"
                  inputProps={{ min: 1, max: 24 }}
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ backgroundColor: '#FFFFFF', p: 2, borderRadius: '10px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6A1B9A', mb: 1 }}>
                    Cost Summary
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                    Rate: ₹{vehiclePrices[formData.vehicleType]}/hour
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 2 }}>
                    Duration: {formData.hours} hour(s)
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', color: '#6A1B9A' }}
                  >
                    Total: ₹{calculateCost()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#6A1B9A',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    borderRadius: '15px',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#8E24AA',
                    },
                  }}
                  onClick={handleBooking}
                >
                  Confirm Booking
                </Button>
              </Grid>
            </Grid>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default ParkingSlots;
