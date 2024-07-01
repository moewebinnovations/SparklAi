"use client";

import React from 'react';
import Header from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faUserShield, faExchangeAlt, faLock, faUserCheck, faSyncAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';
import Footer from '@/components/Footer';

const privacyNavigation = [
  { name: 'Home', href: '/' },
];

export default function PrivacyPolicy() {
  return (
    <div>
      <Header navigation={privacyNavigation} />
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Privacy Policy</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines
            the types of information we collect, how we use it, and the measures we take to ensure your data is safe.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-4xl text-left text-gray-700">
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faShieldAlt} /></span>1. Information We Collect</h3>
            <p>
              We collect information that you provide directly to us, such as when you create or modify your account,
              request services, or communicate with us. This may include your name, email address, and payment information.
              When you sign up or log in using Google, Apple, or Microsoft, we collect the same information through Clerk.
              Payment information, including card details and billing information, is collected securely by Stripe during the upgrade process.
            </p>
          </section>
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faUserShield} /></span>2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services. This includes using your
              information to process transactions through Stripe, send you service-related communications, and respond to your inquiries.
              Your login and signup details are securely managed by Clerk.
            </p>
          </section>
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faExchangeAlt} /></span>3. Sharing of Information</h3>
            <p>
              We do not share your personal information with third parties except as necessary to provide our services,
              comply with the law, or protect our rights. This may include sharing your information with service providers
              like Stripe and Clerk, who perform services on our behalf.
            </p>
          </section>
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faLock} /></span>4. Data Security</h3>
            <p>
              We implement a variety of security measures to protect your personal information. This includes using
              encryption technology to safeguard your data during transmission and storage. Both Stripe and Clerk use industry-standard
              security practices to protect your data.
            </p>
          </section>
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faUserCheck} /></span>5. Your Choices</h3>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can do this by
              logging into your account or contacting us directly. We will respond to your request as quickly as possible.
              You can also cancel your subscription or delete your account and data, including history, upon confirmation.
            </p>
          </section>
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faSyncAlt} /></span>6. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. If we make significant changes, we will notify you through our website.
              Your continued use of our services after any changes become effective constitutes your acceptance of the new policy.
            </p>
          </section>
          <section className="mb-8 border-b p-5">
            <h3 className="text-2xl font-bold mb-4 flex items-center"><span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4"><FontAwesomeIcon icon={faHeadset} /></span>Contact Us</h3>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
