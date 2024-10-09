require('dotenv').config();


const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const cors  =  require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: false
}));

  
app.use(cors({ credentials: true, origin: true }));  
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
