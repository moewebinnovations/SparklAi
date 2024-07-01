"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { aiOutput, UserSubscription } from '@/utils/schema';
import { sql, eq } from 'drizzle-orm';
import { Copy, Loader, CheckCircle, Home, Lock, Download } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faExclamationCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import Templates from '@/app/(data)/Templates';
import moment from 'moment';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react';
import Link from 'next/link';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: Date;
}

const getTemplateNameAndIcon = (slug: string) => {
  const template = Templates.find(template => template.slug === slug);
  return template ? { name: template.name, icon: template.icon as IconProp } : { name: 'Unknown Template', icon: '' as IconProp };
};

const getWordCount = (text: string) => {
  return text.trim().split(/\s+/).length;
};

const formatDateString = (date: string | Date) => {
  return moment(date).format('DD/MM/YYYY');
};

function HistoryPage() {
  const { user } = useUser();
  const [history, setHistory] = useState<HISTORY[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const result = await db
            .select()
            .from(UserSubscription)
            .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress));

          const subscription = result.length > 0 ? result[0] : null;
          if (subscription && subscription.active) {
            setIsSubscribed(true);
          }
        } catch (err) {
          console.error("Failed to fetch subscription status:", err);
        }
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        if (user?.primaryEmailAddress?.emailAddress) {
          const userEmail = user.primaryEmailAddress.emailAddress;
          const userHistory = await db
            .select()
            .from(aiOutput)
            .where(sql`${aiOutput.createdBy} = ${userEmail}`);

          const formattedHistory = userHistory.map((item: any) => ({
            ...item,
            aiResponse: item.aiResponse || "",
            createdAt: moment(item.createdAt, 'DD/MM/YYYY').toDate()
          }));

          const filterDate = isSubscribed ? moment().subtract(1, 'years').toDate() : moment().subtract(10, 'days').toDate();
          const filteredHistory = formattedHistory.filter(item => item.createdAt >= filterDate);

          setHistory(filteredHistory);
          setFilteredHistory(filteredHistory);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Failed to fetch history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isSubscribed !== undefined) {
      fetchHistory();
    }
  }, [user, isSubscribed]);

  useEffect(() => {
    let filtered = history;
    if (selectedTemplate) {
      filtered = filtered.filter(item => item.templateSlug === selectedTemplate);
    }
    if (selectedDate) {
      filtered = filtered.filter(item => formatDateString(item.createdAt) === selectedDate);
    }
    setFilteredHistory(filtered);
  }, [selectedTemplate, selectedDate, history]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('AI Response copied to clipboard!');
  };

  const handleOpenModal = (content: string) => {
    setModalContent(content);
    setOpen(true);
  };

  const handleDownloadHistory = () => {
    const csvContent = [
      ["Template Name", "AI Response", "Word Count", "Created At"],
      ...filteredHistory.map(item => [
        getTemplateNameAndIcon(item.templateSlug).name,
        item.aiResponse,
        getWordCount(item.aiResponse),
        formatDateString(item.createdAt)
      ])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "history.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
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
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center p-5 md:pb-2 justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3">
            <label className="block text-gray-700 mb-2">Template Name</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Templates</option>
              {Templates.map((template) => (
                <option key={template.slug} value={template.slug}>{template.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-gray-700 mb-2">Created At</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadHistory}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md ${isSubscribed ? 'bg-indigo-600 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
            disabled={!isSubscribed}
          >
            <Download className="w-5 h-5" />
            Download History
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin" size={48} />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" size="2x" />
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto p-5 md:pb-5">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-2 md:px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Template Name
                </th>
                <th className="px-2 md:px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  AI Response
                </th>
                <th className="px-2 md:px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Word Count
                </th>
                <th className="px-2 md:px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-2 md:px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => {
                const { name, icon } = getTemplateNameAndIcon(item.templateSlug);
                return (
                  <tr key={index}>
                    <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex items-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <FontAwesomeIcon icon={icon} className="text-indigo-600 w-5 h-5" />
                      </div>
                      {name}
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 hidden md:table-cell">
                      {item.aiResponse.length > 50 ? item.aiResponse.substring(0, 50) + "..." : item.aiResponse}
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {getWordCount(item.aiResponse)}
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {formatDateString(item.createdAt)}
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex gap-2">
                      <button
                        onClick={() => handleCopy(item.aiResponse)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <FontAwesomeIcon icon={faCopy} className="mr-1" /> Copy
                      </button>
                      <button
                        onClick={() => handleOpenModal(item.aiResponse)}
                        className="text-blue-600 hover:text-blue-900 flex items-center md:hidden"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Dialog className="relative z-10" open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    AI Response
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {modalContent}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default HistoryPage;
