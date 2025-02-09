import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Use placeholder for public key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { clientSecret } } = await axios.post('/api/payment/create-payment-intent', { amount });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      {message && <p>{message}</p>}
    </form>
  );
}

function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentForm;
