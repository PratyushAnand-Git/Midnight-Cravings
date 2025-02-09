import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import RequestForm from './components/RequestForm';
import OfferForm from './components/OfferForm';
import Map from './components/Map';
import MatchedResults from './components/MatchedResults';
import Chat from './components/Chat';
import Notifications, { notify } from './components/Notifications';
import ReviewForm from './components/ReviewForm';
import UserProfile from './components/UserProfile';
import PaymentForm from './components/PaymentForm';

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [userId, setUserId] = useState('anonymous'); // Replace with actual user ID

  useEffect(() => {
    auth.signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        notify('Signed in anonymously');
      })
      .catch((error) => {
        console.error('Error signing in anonymously:', error);
        notify('Error signing in anonymously');
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Midnight Cravings Exchange Platform</h1>
      <RequestForm />
      <OfferForm />
      <Map location={location} />
      {location.lat && location.lng && (
        <>
          <MatchedResults type="requests" lat={location.lat} lng={location.lng} maxDistance={5} />
          <MatchedResults type="offers" lat={location.lat} lng={location.lng} maxDistance={5} />
        </>
      )}
      <Chat />
      <Notifications />
      <ReviewForm userId={userId} />
      <UserProfile userId={userId} />
      <PaymentForm />
    </div>
  );
}

export default App;
