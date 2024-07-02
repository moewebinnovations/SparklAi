import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const { priceId, email } = await req.json();
    // console.log("Received priceId:", priceId, "Email:", email); // Debug log

    if (!priceId) {
      console.error("Price ID is missing");
      return NextResponse.json({ error: "Price ID is missing" }, { status: 400 });
    }

    // Fetch the price details to determine if it's recurring or one-time
    const price = await stripe.prices.retrieve(priceId);

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

    if (price.recurring) {
      sessionConfig.mode = 'subscription';
    } else {
      sessionConfig.mode = 'payment';
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // console.log("Session created successfully:", session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating session:", error.message);
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
