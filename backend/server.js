require('dotenv').config();


const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const cors  =  require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: false
}));
const allowedOrigins = [
    'https://w3-venture-gqt5uvxhw-sunidhis-projects.vercel.app', // Your frontend's deployed URL
    'http://localhost:3000', // Local development environment
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));   
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
