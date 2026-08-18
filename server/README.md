# Smart Parking System - Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)

### Installation Steps

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Configure Environment Variables**
Edit `.env` file and update:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-parking
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLIENT_URL=http://localhost:3000
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

4. **Run Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
- **URL:** `/api/auth/register`
- **Method:** POST
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

#### Login User
- **URL:** `/api/auth/login`
- **Method:** POST
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

#### Get User Profile
- **URL:** `/api/auth/profile`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

## Project Structure
```
server/
├── src/
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   ├── models/
│   │   └── User.js (User schema)
│   ├── controllers/
│   │   └── authController.js (Auth logic)
│   ├── routes/
│   │   └── auth.js (Auth routes)
│   ├── middleware/
│   │   └── auth.js (JWT verification)
│   └── app.js (Main server file)
├── .env (Environment variables)
├── package.json
└── README.md
```
