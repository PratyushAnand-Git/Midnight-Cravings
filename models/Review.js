const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  reviewerId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
