const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
  const { userId, reviewerId, rating, comment } = req.body;
  try {
    const newReview = new Review({ userId, reviewerId, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await Review.find({ userId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
