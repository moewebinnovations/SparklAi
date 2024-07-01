import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      throw new Error('Missing email');
    }

    // Find the subscription in the database
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    if (result.length === 0) {
      throw new Error('Subscription not found');
    }

    const subscription = result[0];

    // Cancel the subscription immediately
    await stripe.subscriptions.del(subscription.stripeSubscriptionId);

    // Delete the subscription record from the database
    await db
      .delete(UserSubscription)
      .where(eq(UserSubscription.email, email));

    return new NextResponse('Subscription deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting subscription:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
