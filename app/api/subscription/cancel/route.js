import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const { email } = await req.json(); // Get user email from the request body
    if (!email) {
      throw new Error('Missing email');
    }

    // Find the subscription record in the database
    const subscription = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email))
      .first();

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Cancel the subscription in Stripe
    const stripeSubscriptionId = subscription.stripeSubscriptionId; // Assuming you have stored Stripe subscription ID
    await stripe.subscriptions.del(stripeSubscriptionId);

    // Delete the subscription record from the database
    const result = await db
      .delete(UserSubscription)
      .where(eq(UserSubscription.email, email));

    console.log('Deletion result:', result);

    return new NextResponse('Subscription deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting subscription:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
