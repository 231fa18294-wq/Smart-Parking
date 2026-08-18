const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    slotNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ['2-wheeler', '3-wheeler', '4-wheeler'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    bookingTime: {
      type: Date,
      required: true,
    },
    exitTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
