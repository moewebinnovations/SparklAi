"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye, faLightbulb, faCogs, faHandHoldingHeart, faGlobe, faSyncAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';

const aboutNavigation = [
  { name: 'Home', href: '/' },
];

const missionContent = "Our mission is to empower individuals and businesses to effortlessly create high-quality content using advanced AI technology.";
const visionContent = "Our vision is to become the leading AI content generation platform, continually innovating and expanding our tools to meet the evolving needs of our users.";
const valuesContent = [
  "Innovation: We are committed to pushing the boundaries of AI technology.",
  "User-Centric: We prioritize the needs and experiences of our users in everything we do.",
  "Integrity: We maintain the highest standards of honesty and transparency.",
  "Excellence: We strive for excellence in all aspects of our work.",
];

export default function AboutUs() {
  return (
    <div>
      <Header navigation={aboutNavigation} />
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">About Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to SparklAI, founded in 2024. We are dedicated to revolutionizing the way content is generated using state-of-the-art AI technology.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-4xl text-left text-gray-700">
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faLightbulb} />
              </span>
              Our Motivation
            </h3>
            <p>
              As tech enthusiasts, we recognized the potential of AI to simplify and enhance the content creation process. This motivated us to develop SparklAI, an AI-driven content generator designed to help individuals and businesses create high-quality content effortlessly.
            </p>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faUsers} />
              </span>
              Our Mission
            </h3>
            <p>{missionContent}</p>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faBullseye} />
              </span>
              Our Vision
            </h3>
            <p>{visionContent}</p>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </span>
              Our Values
            </h3>
            <ul className="list-disc ml-8">
              {valuesContent.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faCogs} />
              </span>
              Team and Culture
            </h3>
            <p>
              Our team is composed of passionate tech enthusiasts dedicated to innovation and excellence. We foster a culture of collaboration, creativity, and continuous learning to ensure we deliver the best AI-driven solutions to our users.
            </p>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              Customer Focus
            </h3>
            <p>
              Our platform is designed for everyone who uses the internet and needs high-quality content. Whether you are a blogger, marketer, or business owner, SparklAI provides the tools you need to generate compelling content effortlessly.
            </p>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faSyncAlt} />
              </span>
              Future Plans
            </h3>
            <p>
              We are constantly working on adding new features to our platform. Our future plans include introducing tools for image generation, voice generation, and other advanced AI-driven solutions to further enhance your content creation experience.
            </p>
          </section>
          <section className="mb-8 border-b border-gray-200 pb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-100 text-indigo-600 rounded-full p-3 mr-4 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
                <FontAwesomeIcon icon={faHeadset} />
              </span>
              Contact Information
            </h3>
            <p>
              If you have any questions or would like to learn more about SparklAI, please visit our contact page and reach out to us.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
