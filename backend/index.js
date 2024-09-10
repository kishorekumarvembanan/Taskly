// index.js or server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Import routes
const taskRoutes = require('./src/routes/taskRoute');
const userRoutes = require('./src/routes/userRoutes');

// Use routes
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// Root route (for testing)
app.get('/', (req, res) => {
  res.send('Backend is working');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
