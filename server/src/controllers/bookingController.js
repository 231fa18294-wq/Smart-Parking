const Booking = require('../models/Booking');
const User = require('../models/User');
const QRCode = require('qrcode');
const { sendBookingConfirmationEmail, sendBookingCancellationEmail } = require('../services/emailService');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    console.log('📝 Booking Request Received:', req.body);
    
    const { slotNumber, location, vehicleType, duration, cost, bookingTime, exitTime } = req.body;
    const userId = req.user.id;

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('👤 User Found:', user.name, user.email);

    // Validate required fields
    if (!slotNumber || !location || !vehicleType || !duration || !cost) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      userName: user.name,
      email: user.email,
      slotNumber,
      location,
      vehicleType,
      duration,
      cost,
      bookingTime: new Date(bookingTime),
      exitTime: new Date(exitTime),
      status: 'active',
    });

    console.log('✅ Booking Created:', booking._id);

    // Generate QR Code for booking
    const qrData = JSON.stringify({
      bookingId: booking._id,
      slotNumber,
      location,
      vehicleType,
      userName: user.name,
      exitTime,
    });
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    // Send confirmation email
    console.log('📧 Sending email to:', user.email);
    const emailResult = await sendBookingConfirmationEmail({
      email: user.email,
      userName: user.name,
      slotNumber,
      location,
      vehicleType,
      duration,
      cost,
      bookingTime,
      exitTime,
      qrCode: qrCodeUrl,
    });

    console.log('📧 Email Result:', emailResult);

    // Emit real-time update to all connected clients
    const io = req.app.get('io');
    io.emit('booking-created', {
      location,
      slotNumber,
      vehicleType,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully and confirmation email sent',
      booking: {
        id: booking._id,
        slotNumber: booking.slotNumber,
        location: booking.location,
        vehicleType: booking.vehicleType,
        duration: booking.duration,
        cost: booking.cost,
        bookingTime: booking.bookingTime,
        exitTime: booking.exitTime,
        status: booking.status,
        qrCode: qrCodeUrl,
      },
    });
  } catch (error) {
    console.error('❌ Booking Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Booking creation failed',
      error: error.toString(),
    });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch bookings',
    });
  }
};

// Complete a booking
exports.completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'completed' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking completed successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to complete booking',
    });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ 
        success: false,
        message: 'Booking is already cancelled' 
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot cancel a completed booking' 
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Send cancellation email
    await sendBookingCancellationEmail({
      email: booking.email,
      userName: booking.userName,
      slotNumber: booking.slotNumber,
      location: booking.location,
      bookingTime: booking.bookingTime,
    });

    // Emit real-time update to all connected clients
    const io = req.app.get('io');
    io.emit('booking-cancelled', {
      location: booking.location,
      slotNumber: booking.slotNumber,
      vehicleType: booking.vehicleType,
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to cancel booking',
    });
  }
};
