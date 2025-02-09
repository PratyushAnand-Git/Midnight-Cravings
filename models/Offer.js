// models/Offer.js
const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  dropOffLocation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Offer', OfferSchema);
