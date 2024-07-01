import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { db } from '../../../utils/db'; // Adjust the path as needed
import { UserSubscription } from '../../../utils/schema'; // Adjust the path as needed
import { users } from '@clerk/clerk-sdk-node'; // Import Clerk correctly

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
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

  // Handle the event
  try {
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      const customer = await stripe.customers.retrieve(invoice.customer);

      // Fetch Clerk user details
      const userId = customer.metadata.clerkUserId; // Assuming you have stored the Clerk user ID in Stripe metadata
      let userEmail = '';
      try {
        const clerkUser = await users.getUser(userId);
        if (clerkUser && clerkUser.primaryEmailAddress) {
          userEmail = clerkUser.primaryEmailAddress.emailAddress;
        }
      } catch (error) {
        console.error('Error fetching Clerk user details:', error);
      }

      // Extract relevant information
      const subscriptionData = {
        email: customer.email,
        userName: userEmail || 'Unknown User',
        active: true, // Ensure this is a boolean
        paymentId: invoice.payment_intent,
        joinDate: new Date().toISOString(),
        stripeCustomerId: customer.id, // Store the Stripe customer ID
      };

      // Save subscription data to the database
      try {
        await db.insert(UserSubscription).values(subscriptionData);
        console.log('Subscription saved to database successfully.');
      } catch (dbError) {
        console.error('Error saving subscription to database:', dbError);
      }
    }
  } catch (eventError) {
    console.error('Error handling event:', eventError);
    return new NextResponse('Event handling error', { status: 500 });
  }

  // Send a response to acknowledge receipt of the event
  return new NextResponse('Event received', { status: 200 });
}
