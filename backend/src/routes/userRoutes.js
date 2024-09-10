const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Handle user login and add to the database
router.post('/login', async (req, res) => {
  const { googleId, name, email } = req.body;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ googleId });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({ googleId, name, email });
      await user.save();
      console.log('User created:', user);
    } else {
      console.log('User already exists:', user);
    }

    // Send back the user data as a response
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
