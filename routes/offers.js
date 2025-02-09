// routes/offers.js
const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const { calculateDistance } = require('../utils/utils');

// Create a new offer
router.post('/', async (req, res) => {
  const { userId, itemName, location, pickupTime, dropOffLocation } = req.body;
  try {
    const newOffer = new Offer({ userId, itemName, location, pickupTime, dropOffLocation });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get matched offers
router.get('/match', async (req, res) => {
  const { lat, lng, maxDistance } = req.query;
  try {
    const offers = await Offer.find();
    const matchedOffers = offers.filter(offer => {
      const distance = calculateDistance(lat, lng, offer.location.lat, offer.location.lng);
      return distance <= maxDistance;
    });
    res.status(200).json(matchedOffers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
