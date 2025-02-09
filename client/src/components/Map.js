import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = ({ location }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (location.lat && location.lng) {
      setMapCenter({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
        {location.lat && location.lng && <Marker position={mapCenter} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
