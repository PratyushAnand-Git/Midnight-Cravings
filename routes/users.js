const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user profile
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
