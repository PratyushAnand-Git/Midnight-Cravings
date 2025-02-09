import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm({ userId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reviews', {
        userId,
        reviewerId: 'anonymous', // Replace with actual reviewer ID
        rating,
        comment,
      });
      console.log('Review created:', response.data);
    } catch (err) {
      console.error('Error creating review:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
