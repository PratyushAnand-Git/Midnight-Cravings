// routes/requests.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const { calculateDistance } = require('../utils/utils');

// Create a new request
router.post('/', async (req, res) => {
  const { userId, itemName, location, pickupTime, dropOffLocation } = req.body;
  try {
    const newRequest = new Request({ userId, itemName, location, pickupTime, dropOffLocation });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get matched requests
router.get('/match', async (req, res) => {
  const { lat, lng, maxDistance } = req.query;
  try {
    const requests = await Request.find();
    const matchedRequests = requests.filter(request => {
      const distance = calculateDistance(lat, lng, request.location.lat, request.location.lng);
      return distance <= maxDistance;
    });
    res.status(200).json(matchedRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
