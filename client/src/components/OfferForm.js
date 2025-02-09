import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OfferForm() {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [pickupTime, setPickupTime] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/offers', {
        userId: 'anonymous', // Replace with actual user ID
        itemName,
        location,
        pickupTime,
        dropOffLocation,
      });
      console.log('Offer created:', response.data);
    } catch (err) {
      console.error('Error creating offer:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Pickup Time (e.g., 22:00-23:00)"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Drop-off Location"
        value={dropOffLocation}
        onChange={(e) => setDropOffLocation(e.target.value)}
      />
      <button type="submit">Create Offer</button>
    </form>
  );
}

export default OfferForm;
