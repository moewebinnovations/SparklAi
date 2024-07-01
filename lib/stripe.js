import Stripe from 'stripe';

// Using the latest stable version of Stripe API (Assuming '2024-08-01' is the latest)
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export default stripe;
