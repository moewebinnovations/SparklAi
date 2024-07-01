"use client"
import React, { useState, useEffect } from 'react';
import SearchTools from './_components/SearchTools';
import TemplateListSection from './_components/TemplateListSection';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';

function Dashboard() {
  const { user } = useUser();
  const [userSearchInput, setUserSearchInput] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Templates');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        const result = await db
          .select()
          .from(UserSubscription)
          .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress));
        
        const subscription = result.length > 0 ? result[0] : null;
        
        if (subscription && subscription.active) {
          setIsSubscribed(true);
        }
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  return (
    <div>
      <SearchTools
        onSearchInput={(value: string) => setUserSearchInput(value)}
        onCategoryChange={(category: string) => setSelectedCategory(category)}
      />
      <TemplateListSection
        userSearchInput={userSearchInput}
        isSubscribed={isSubscribed}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Dashboard;
