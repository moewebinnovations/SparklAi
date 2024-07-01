import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { db } from '../../../utils/db'; // Adjust the path as needed
import { UserSubscription } from '../../../utils/schema'; // Adjust the path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Store your webhook secret in an environment variable

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const buf = await req.text();
    event = stripe.webhooks.constructEvent(buf, sig, stripeWebhookSecret);
    console.log('Event successfully verified:', event);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return new NextResponse('Webhook Error: signature verification failed', { status: 400 });
  }

  // Log the event for now
  console.log('Success:', event);

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const stripeSubscriptionId = subscription.id;

    // Find the subscription record in the database and delete it
    try {
      await db
        .delete(UserSubscription)
        .where(eq(UserSubscription.stripeSubscriptionId, stripeSubscriptionId));
      console.log('Subscription deleted from database successfully.');
    } catch (dbError) {
      console.error('Error deleting subscription from database:', dbError);
    }
  }

  // Add any other event types you want to handle here

  return new NextResponse('Event received', { status: 200 });
}
