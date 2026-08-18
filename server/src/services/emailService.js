const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send booking confirmation email
const sendBookingConfirmationEmail = async (bookingDetails) => {
  try {
    const { email, userName, slotNumber, location, vehicleType, duration, cost, bookingTime, exitTime } = bookingDetails;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🚗 Parking Booking Confirmation - ${slotNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px; }
            .header { background: linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-details { background: #f5e6ff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #6A1B9A; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
            .detail-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #6A1B9A; }
            .value { color: #333; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #f5f5f5; border-radius: 10px; margin-top: 20px; }
            .success-badge { background: #B5EAD7; color: #00695C; padding: 10px 15px; border-radius: 20px; display: inline-block; margin: 20px 0; font-weight: bold; }
            .warning { background: #FFE5CC; color: #E65100; padding: 15px; border-radius: 10px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Booking Confirmed!</h1>
              <p>Your parking slot has been successfully booked</p>
            </div>

            <div class="content">
              <p>Hello <strong>${userName}</strong>,</p>

              <p>Thank you for using <strong>Smart Parking System</strong>! Your parking reservation has been confirmed. Below are your booking details:</p>

              <div class="booking-details">
                <div class="detail-row">
                  <span class="label">📍 Location:</span>
                  <span class="value">${location}</span>
                </div>
                <div class="detail-row">
                  <span class="label">🅿️ Slot Number:</span>
                  <span class="value">${slotNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="label">🚗 Vehicle Type:</span>
                  <span class="value">${vehicleType}</span>
                </div>
                <div class="detail-row">
                  <span class="label">⏱️ Duration:</span>
                  <span class="value">${duration} hour(s)</span>
                </div>
                <div class="detail-row">
                  <span class="label">📅 Booking Time:</span>
                  <span class="value">${new Date(bookingTime).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">🚪 Exit Time:</span>
                  <span class="value">${new Date(exitTime).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">💰 Total Cost:</span>
                  <span class="value"><strong>₹${cost}</strong></span>
                </div>
              </div>

              <div class="success-badge">✓ BOOKING ACTIVE</div>

              <div class="warning">
                <strong>⚠️ Important:</strong> Please arrive at the parking location at least 10 minutes before your booked time. Your slot will be held for 10 minutes after your booking time.
              </div>

              <p><strong>Need to cancel or modify?</strong></p>
              <p>Visit our website or contact our support team if you need to cancel or modify your booking.</p>

              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>Smart Parking System Team</strong><br/>
                support@smartparking.com
              </p>
            </div>

            <div class="footer">
              <p>&copy; 2026 Smart Parking System. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
};

// Send booking cancellation email
const sendBookingCancellationEmail = async (bookingDetails) => {
  try {
    const { email, userName, slotNumber, location, bookingTime } = bookingDetails;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🚫 Parking Booking Cancelled - ${slotNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px; }
            .header { background: linear-gradient(135deg, #D32F2F 0%, #F44336 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-details { background: #FFEBEE; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #D32F2F; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
            .detail-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #D32F2F; }
            .value { color: #333; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #f5f5f5; border-radius: 10px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚫 Booking Cancelled</h1>
              <p>Your parking reservation has been cancelled</p>
            </div>

            <div class="content">
              <p>Hello <strong>${userName}</strong>,</p>

              <p>Your parking booking has been successfully cancelled. Here are the details:</p>

              <div class="booking-details">
                <div class="detail-row">
                  <span class="label">📍 Location:</span>
                  <span class="value">${location}</span>
                </div>
                <div class="detail-row">
                  <span class="label">🅿️ Slot Number:</span>
                  <span class="value">${slotNumber}</span>
                </div>
                <div class="detail-row">
                  <span class="label">📅 Original Booking Time:</span>
                  <span class="value">${new Date(bookingTime).toLocaleString()}</span>
                </div>
              </div>

              <p>If you did not request this cancellation, please contact our support team immediately.</p>

              <p>We hope to serve you again soon!</p>

              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>Smart Parking System Team</strong><br/>
                support@smartparking.com
              </p>
            </div>

            <div class="footer">
              <p>&copy; 2026 Smart Parking System. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent successfully:', info.response);
    return { success: true, message: 'Cancellation email sent successfully' };
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return { success: false, message: error.message };
  }
};
