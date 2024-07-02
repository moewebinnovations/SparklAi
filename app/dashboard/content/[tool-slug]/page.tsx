"use client";

import React, { useEffect, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { useUsage } from '@/app/(context)/UpdateCreditUsageContext';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { UserSubscription, aiOutput } from '@/utils/schema';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from '@/components/ui/button';

interface PROPS {
  params: {
    'tool-slug': string;
  };
}

const pages = [
  { name: 'Tools', href: '/dashboard', current: false },
];

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['tool-slug']);
  const [loading, setLoading] = useState(false);
  const [aiOutputText, setAiOutputText] = useState<string>("");
  const { setTotalUsage, totalUsage, usageLimit } = useUsage();
  const [usageLoading, setUsageLoading] = useState(true);
  const { user } = useUser();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user && user.primaryEmailAddress?.emailAddress) {
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

  useEffect(() => {
    if (totalUsage !== undefined && usageLimit !== undefined) {
      setUsageLoading(false);
    }
  }, [totalUsage, usageLimit]);

  const GenerateAIContent = async (formData: any) => {
    if (usageLoading || totalUsage >= usageLimit) {
      setOpen(true);
      return;
    }

    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAiPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAiPrompt);
      const responseText = await result.response.text();
      // console.log(responseText);
      setAiOutputText(responseText || "");

      // Save response to the database
      if (user) {
        if (selectedTemplate?.slug && user.primaryEmailAddress?.emailAddress) {
          await db.insert(aiOutput).values({
              formData: JSON.stringify(formData),
              aiResponse: responseText,
              templateSlug: selectedTemplate.slug,
              createdBy: user.primaryEmailAddress.emailAddress,
              createdAt: new Date() // Ensure timestamp is compatible with Neon
          });
      } else {
          console.error("Missing required data for insertion.");
      }      
      }

      // Update usage count
      setTotalUsage((prevUsage: number) => prevUsage + getWordCount(responseText));
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className='p-10'>
      <nav className="flex border-b border-gray-200 bg-white mb-5" aria-label="Breadcrumb">
        <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-purple-500 hover:text-purple-700">
                <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="flex">
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
                <Link
                  href={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
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
              <span
                className="ml-4 text-sm font-medium text-gray-500"
                aria-current="page"
              >
                {selectedTemplate?.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {selectedTemplate?.premium && !isSubscribed ? (
        <div className="bg-red-500 text-white p-5 rounded-lg text-center">
          <h2 className="text-lg font-bold">Premium Content</h2>
          <p className="mt-2">You need to subscribe to access this premium template.</p>
          <Link href="/dashboard">
            <Button className="mt-5">Go to Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: any) => GenerateAIContent(v)}
            loading={loading}
            isSubscribed={isSubscribed} // Pass the subscription status
          />
          <div className='col-span-2'>
            <OutputSection aiOutput={aiOutputText} isSubscribed={isSubscribed} /> {/* Pass the subscription status */}
          </div>
        </div>
      )}

      <Dialog className="relative z-50" open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Usage Limit Exceeded
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You have exceeded your usage limit for the month. Upgrade to continue using the service.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Link href="/dashboard/billing">
                  <Button className="w-full mb-2" variant="default">
                    Upgrade Now
                  </Button>
                </Link>
                <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateNewContent;
