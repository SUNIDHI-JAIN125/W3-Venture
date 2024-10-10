require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// List of allowed origins for CORS
const allowedOrigins = [
  'https://w3-venture-app.vercel.app/', // Frontend production
  'http://localhost:3001', // Local frontend development
  'http://localhost:5000', // Local backend development
];

// Configure CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // If the origin is not defined (like mobile apps or Postman), allow it
    if (!origin) return callback(null, true);

    // Allow if the origin is in our allowedOrigins array
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      // Block if the origin is not allowed
      const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  credentials: true, // Allow cookies and other credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware for parsing JSON requests
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);

// Handle OPTIONS requests (preflight requests)
app.options('*', cors());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
