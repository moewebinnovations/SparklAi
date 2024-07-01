"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { aiOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import { useUsage } from '@/app/(context)/UpdateCreditUsageContext';
import Link from 'next/link';

function TrackUsage() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage, usageLimit, setUsageLimit } = useUsage();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const allowedUsagePremium = process.env.NEXT_PUBLIC_PREMIUM_USAGE_LIMIT ? parseInt(process.env.NEXT_PUBLIC_PREMIUM_USAGE_LIMIT, 10) : 1000000; // Provide a default value if the env variable is not set

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
      const id = setInterval(() => {
        fetchSubscriptionStatus();
      }, 5000); // Polling interval of 5 seconds
      setIntervalId(id);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User email is not defined");
      return;
    }

    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));
    
    const subscription = result.length > 0 ? result[0] : null;

    if (subscription && subscription.active) {
      setIsSubscribed(true);
      setUsageLimit(allowedUsagePremium); // Increase limit if user is subscribed and active
    } else {
      setIsSubscribed(false);
    }

    GetData(email);
  };

  const GetData = async (email: string) => {
    const result = await db
      .select()
      .from(aiOutput)
      .where(eq(aiOutput.createdBy, email));

    GetTotalUsage(result);
  };

  const GetTotalUsage = (result: any[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total += getWordCount(element.aiResponse);
    });

    setTotalUsage(total);
    console.log(total);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div>
      <div className='bg-gradient-to-r from-purple-500 to-indigo-500 p-5 text-white rounded-lg shadow-lg mb-10'>
        <h2 className='font-medium text-lg mb-2'>Remaining Credits</h2>
        <div className='relative h-4 bg-gradient-to-r from-indigo-300 to-purple-300 w-full rounded-full overflow-hidden'>
          <div
            className='absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-500'
            style={{
              width: (totalUsage / usageLimit) * 100 + '%',
            }}
          ></div>
        </div>
        <h2 className='text-sm mt-2'>{totalUsage}/{usageLimit.toLocaleString()} words used</h2>
      </div>
      {!isSubscribed && (
        <Link href={'/dsahboard/billing'}>
          <Button className="w-full my-3 bg-gradient-to-r from-purple-500 to-indigo-500">Upgrade</Button>
        </Link>
      )}
    </div>
  );
}

export default TrackUsage;
