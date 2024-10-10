require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();


const allowedOrigins = [
  'https://w3-venture-app.vercel.app/', 
  'http://localhost:3001', 
  'http://localhost:5000',
];


app.use(cors({
  origin: function (origin, callback) {
 
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
     
      const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);

app.options('*', cors());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
