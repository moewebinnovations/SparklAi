import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export async function POST(req) {
  try {
    const { priceId, email } = await req.json();

    if (!priceId) {
      console.error("Price ID is missing");
      return NextResponse.json({ error: "Price ID is missing" }, { status: 400 });
    }

    if (!email) {
      console.error("Email is missing");
      return NextResponse.json({ error: "Email is missing" }, { status: 400 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log("Received priceId:", priceId, "Email:", email);
    }

    // Fetch the price details to determine if it's recurring or one-time
    const price = await stripe.prices.retrieve(priceId);

    if (!price) {
      console.error("Price not found");
      return NextResponse.json({ error: "Price not found" }, { status: 400 });
    }

    let sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email, // Prefill the customer email
      success_url: `${req.headers.get('origin')}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/dashboard`,
    };

    sessionConfig.mode = price.recurring ? 'subscription' : 'payment';

    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (process.env.NODE_ENV !== 'production') {
      console.log("Session created successfully:", session.id);
    }
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating session:", error.message);
    return NextResponse.json({ error: "An error occurred. Please try again later." }, { status: 500 });
  }
}
