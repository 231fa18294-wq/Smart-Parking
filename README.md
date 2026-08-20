# 🚗 Smart Parking System

A modern, full-stack parking reservation system built with React and Node.js. This application allows users to find, book, and manage parking spaces across multiple locations with real-time updates and QR code integration.

![Smart Parking System](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.4-blue)

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 🅿️ **Multiple Parking Locations** - Support for various parking types (Shopping Mall, Theater, Restaurant, Gym, etc.)
- 📅 **Real-time Booking** - Instant slot reservation with availability updates
- 📱 **QR Code Generation** - Unique QR codes for each booking for easy entry/exit
- 📧 **Email Notifications** - Automated confirmation and cancellation emails
- 📊 **Booking History** - View, filter, and manage past and active bookings
- ⚡ **Real-time Updates** - Socket.io integration for live slot availability
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 🔔 **Toast Notifications** - User-friendly feedback for all actions
- ❌ **Booking Cancellation** - Cancel active bookings with refund logic

### Security Features
- 🛡️ **Helmet.js** - Security headers protection
- 🚦 **Rate Limiting** - API abuse prevention
- ✅ **Input Validation** - Express-validator for all requests
- 🔒 **Strong Password Requirements** - Enforced password complexity
- 🔑 **JWT Authentication** - Secure token-based auth

### UI/UX Enhancements
- 📱 **Responsive Design** - Works on all devices
- ⏳ **Loading States** - Skeleton screens and spinners
- 🎨 **Material-UI Components** - Modern, consistent design
- 🎯 **Error Boundaries** - Graceful error handling
- 🗺️ **Interactive UI** - Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.4 - UI framework
- **Material-UI** 7.3.7 - Component library
- **React Router DOM** 7.13.0 - Navigation
- **Socket.io Client** - Real-time communication
- **React Toastify** - Notifications
- **QRCode.react** - QR code generation
- **Axios** - HTTP client
- **React Hook Form** - Form management

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - Database (via Mongoose 7.0.0)
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **Express-validator** - Input validation
- **Express-rate-limit** - Rate limiting
- **QRCode** - QR code generation
- **Bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/tanmayitammineedi/SmartParking.git
cd SmartParking
```

### 2. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### Configure Environment Variables
Edit `server/.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/smartparking
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartparking

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Client URL
CLIENT_URL=http://localhost:3000

# Email Configuration (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Note: For Gmail, you need to:
# 1. Enable 2-Factor Authentication
# 2. Generate an App Password: https://myaccount.google.com/apppasswords
```

#### Start the Server
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Client Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Start the development server
npm start
# Client will run on http://localhost:3000
```

## 📁 Project Structure

```
SmartParking/
├── client/                  # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── BookingHistory.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ParkingSlots.jsx
│   │   │   └── ProfileDialog.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── server/                  # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── bookingController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Booking.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── booking.js
│   │   ├── services/
│   │   │   └── emailService.js
│   │   ├── validators/
│   │   │   ├── authValidator.js
│   │   │   └── bookingValidator.js
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "SecurePass123!"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "slotNumber": "A-101",
  "location": "Shopping Mall",
  "vehicleType": "4-wheeler",
  "duration": 2,
  "cost": 100,
  "bookingTime": "2026-01-28T10:00:00",
  "exitTime": "2026-01-28T12:00:00"
}
```

#### Get User Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer <token>
```

#### Cancel Booking
```http
PUT /api/bookings/cancel/:bookingId
Authorization: Bearer <token>
```

#### Complete Booking
```http
PUT /api/bookings/complete/:bookingId
Authorization: Bearer <token>
```

## 🎮 Usage Guide

### For Users

1. **Registration**
   - Click "Get Started" on the landing page
   - Fill in your details with a strong password
   - Password must contain: uppercase, lowercase, number, and special character

2. **Login**
   - Enter your email and password
   - You'll be redirected to the dashboard

3. **Book a Parking Slot**
   - Select a location (e.g., Shopping Mall, Theater)
   - Click "Book Now"
   - Choose an available parking slot
   - Select vehicle type and duration
   - Confirm booking
   - Receive email confirmation with QR code

4. **View Booking History**
   - Click "History" button in the navigation bar
   - Filter bookings by status (All/Active/Completed/Cancelled)
   - View QR code for active bookings

5. **Cancel Booking**
   - Go to Booking History
   - Find active booking
   - Click "Cancel" button
   - Confirm cancellation

6. **Toggle Dark Mode**
   - Click the sun/moon icon in the top-right corner

## 🔒 Security Best Practices

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Rate limiting on authentication routes (5 attempts per 15 minutes)
- Global rate limiting (100 requests per 15 minutes)
- Input validation on all endpoints
- Helmet.js for security headers
- CORS configured for specific origin

## 🎨 Customization

### Changing Theme Colors
Edit `client/src/App.js`:
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#6A1B9A', // Change this to your color
    },
  },
});
```

### Adding New Locations
Edit `client/src/components/Dashboard.jsx` in the `parkingLocations` array:
```javascript
{
  id: 13,
  name: 'Your Location',
  icon: <YourIcon sx={{ fontSize: 50 }} />,
  bgColor: '#COLOR1',
  borderColor: '#COLOR2',
  textColor: '#COLOR3',
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
# For local MongoDB:
mongod

# Check connection string in .env
MONGO_URI=mongodb://localhost:27017/smartparking
```

### Email Not Sending
```bash
# For Gmail:
# 1. Enable 2FA in Google Account
# 2. Generate App Password
# 3. Use App Password in EMAIL_PASSWORD

# Test email configuration:
# Check server logs for email errors
```

### Port Already in Use
```bash
# Change ports in .env and client
# Server: PORT=5001
# Client: Update proxy in package.json or API URLs
```

## 📈 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Google Maps integration for location visualization
- [ ] Admin dashboard for managing locations and users
- [ ] Push notifications for mobile
- [ ] Parking duration extension
- [ ] Reviews and ratings system
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.



## 🙏 Acknowledgments

- Material-UI for the beautiful components
- Socket.io for real-time functionality
- MongoDB for the database
- All contributors and supporters

## 📞 Support

For support, email syamaladevisetty33@gmail.com or open an issue in the repository.

---

Made with ❤️ by Syamala Sruthi Devisetty
