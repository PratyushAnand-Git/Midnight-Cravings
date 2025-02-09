const express = require('express');
const router = express.Router();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Use placeholder for secret key

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
