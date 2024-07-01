import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function POST(req) {
  try {
    const { customerId, email } = await req.json(); // Get customerId and email from the request body
    if (!customerId || !email) {
      throw new Error('Missing customerId or email');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get('origin')}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating customer portal session:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
