"use client";
import React, { useState, useEffect } from 'react';
import { CheckIcon, Home, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("STRIPE_PUBLISHABLE_KEY is not defined");
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

async function redirectToCheckout(priceId: string, email: string) {
  console.log("Price ID in redirectToCheckout:", priceId); // Debug log
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId, email }),
  });

  if (!response.ok) {
    console.error('Failed to create checkout session');
    return;
  }

  const { sessionId } = await response.json();

  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe initialization failed');
  }
  await stripe.redirectToCheckout({ sessionId });
}

async function redirectToCustomerPortal(customerId: string) {
  if (!customerId || typeof customerId !== 'string') {
    console.error('Invalid customer ID');
    return;
  }

  const response = await fetch('/api/stripe-portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId }), // Pass the customer ID in the request body
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to create customer portal session:', errorText);
    return;
  }

  const { url } = await response.json();
  window.location.href = url;
}

async function deleteSubscriptionRecord(email: string) {
  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    console.error('Invalid email');
    return;
  }

  try {
    const response = await fetch('/api/subscription/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Pass the user email in the request body
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to delete subscription record:', errorText);
      return;
    }

    console.log('Subscription record deleted');
  } catch (error) {
    console.error('Error deleting subscription record:', error);
  }
}

export default function BillingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string | null>(null); // State to hold the Stripe customer ID
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCancelButton, setLoadingCancelButton] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
  
    if (!email) {
      console.error('Email address is undefined');
      return;
    }
  
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));
  
    const subscription = result.length > 0 ? result[0] : null;
  
    if (subscription && subscription.active) {
      setIsSubscribed(true);
      setCustomerId(subscription.stripeCustomerId || null); // Set the Stripe customer ID from your database
    } else {
      setIsSubscribed(false);
    }
  };
  

  const handleUpgradeClick = async (priceId: string) => {
    setLoading(true);
    try {
      console.log("Price ID in handleUpgradeClick:", priceId); // Debug log
      await redirectToCheckout(priceId, userEmail);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!customerId) {
      console.error('Customer ID is not defined');
      return;
    }
    setLoadingCancelButton(true);
    try {
      await redirectToCustomerPortal(customerId); // Redirect the customer to Stripe's billing portal
      await deleteSubscriptionRecord(userEmail); // Delete the subscription record from the database
      setIsSubscribed(false); // Update local state to reflect cancellation
      router.push('/dashboard'); // Redirect to the dashboard
    } finally {
      setLoadingCancelButton(false);
    }
  };

  return (
    <div className="relative isolate bg-white px-4 pt-2 pb-12 sm:pb-16 lg:px-4">
      <nav className="flex border-b border-gray-200 mb-10 bg-white" aria-label="Breadcrumb">
        <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-500">
                <Home className="h-5 w-5 flex-shrink-0 text-purple-600" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link href="/dashboard/history" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
            </div>
          </li>
          <li className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                History
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-24 blur-3xl" aria-hidden="true">
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {isSubscribed ? "Manage Your Subscription" : "Choose the plan that's right for you"}
        </p>
      </div>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-6 text-gray-600">
        Start generating content with our AI for free, or upgrade to unlock premium features.
      </p>
      <div className={`mx-auto mt-8 flex ${isSubscribed ? 'justify-center' : 'grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2'}`}>
        {!isSubscribed && (
          <div className={classNames('bg-white/60 sm:mx-8 lg:mx-0', 'rounded-3xl p-4 ring-1 ring-gray-900/10 sm:p-6')}>
            <h3 id="tier-free" className={classNames('text-indigo-600', 'text-base font-semibold leading-6')}>
              Free
            </h3>
            <p className="mt-2 flex items-baseline gap-x-1">
              <span className="text-gray-900 text-4xl font-bold tracking-tight">$0</span>
              <span className="text-gray-500 text-sm">/month</span>
            </p>
            <p className="text-gray-600 mt-2 text-sm leading-6">The perfect plan to start generating content with our AI.</p>
            <ul role="list" className="text-gray-600 mt-4 space-y-2 text-xs leading-5">
              {['10,000 words/month', '5 content templates', 'Unlimited Copy', '10 days of history'].map((feature) => (
                <li key={feature} className="flex gap-x-2">
                  <CheckIcon className="text-indigo-600 h-5 w-4 flex-none" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 block rounded-md px-2.5 py-2 text-center text-xs font-semibold text-gray-200 bg-gray-600 cursor-not-allowed"
              disabled
            >
              Currently Active Plan
            </button>
          </div>
        )}
        <div className={classNames('relative bg-gray-900 shadow-2xl', 'rounded-3xl p-4 ring-1 ring-gray-900/10 sm:p-6', isSubscribed ? 'max-w-md' : '')}>
          <h3 id="tier-premium" className="text-indigo-400 text-base font-semibold leading-6">
            Premium
          </h3>
          <p className="mt-2 flex items-baseline gap-x-1">
            <span className="text-white text-4xl font-bold tracking-tight">$9.99</span>
            <span className="text-gray-400 text-sm">/month</span>
          </p>
          <p className="text-gray-300 mt-2 text-sm leading-6">Get the most out of our AI with advanced features and support.</p>
          <ul role="list" className="text-gray-300 mt-4 space-y-2 text-xs leading-5">
            {[
              '1,000,000 words/month',
              '30+ Content templates',
              'Unlimited Download and Copy',
              'Access to early Content Templates',
              '1 Year of history',
              'Download History',
            ].map((feature) => (
              <li key={feature} className="flex gap-x-2">
                <CheckIcon className="text-indigo-400 h-5 w-4 flex-none" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          {isSubscribed ? (
            <>
              <button
                className="mt-4 w-full block rounded-md px-2.5 py-2 text-center text-sm font-semibold text-gray-200 bg-gray-600 cursor-not-allowed"
                disabled
              >
                Current Plan
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="mt-4 w-full block rounded-md px-2.5 py-2 text-center text-sm font-semibold text-white bg-red-600 shadow-sm hover:bg-red-500 focus-visible:outline-red-600"
                  >
                    {loadingCancelButton ? (
                      <Loader className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      'Cancel Subscription'
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your subscription and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelSubscription}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <button
              onClick={() => handleUpgradeClick('price_1PXqUHP2RWOJhMEQsnfdevyh')} // Replace with your actual price ID from Stripe
              className="mt-4 block rounded-md px-2.5 py-2 w-full text-center text-sm font-semibold bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                'Upgrade Now'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
