const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  completeBooking,
  cancelBooking,
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');
const { validateBooking, validate } = require('../validators/bookingValidator');

// Protected routes
router.post('/create', authMiddleware, validateBooking, validate, createBooking);
router.get('/my-bookings', authMiddleware, getUserBookings);
router.put('/complete/:bookingId', authMiddleware, completeBooking);
router.put('/cancel/:bookingId', authMiddleware, cancelBooking);

module.exports = router;
