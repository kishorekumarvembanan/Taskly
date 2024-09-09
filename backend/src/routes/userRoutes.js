// src/routes/userRoutes.js
const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Handle user login
router.post('/login', async (req, res) => {
  const { googleId, name, email } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
