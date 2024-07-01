"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSmile, faPaintRoller, faCog, faHeadset, faFileAlt, faMagic, faTools, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button'; // Assuming you have the shadcn button here
import Link from 'next/link';
import Footer from '@/components/Footer'; // Adjust the import path as needed
import { useUser } from '@clerk/nextjs'; // Import Clerk's useUser hook
import Header from '@/components/Header';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
];

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '/sign-up',
    priceMonthly: '$0',
    description: 'The perfect plan to start generating content with our AI.',
    features: ['10,000 words/month', '5 content templates', 'Unlimited Copy', '10 days of history'],
    featured: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '/sign-up',
    priceMonthly: '$9.99',
    description: 'Get the most out of our AI with advanced features and support.',
    features: [
      '1,000,000 words/month',
      '30+ Content templates',
      'Unlimited Download and Copy',
      'Access to early Content Templates',
      '1 Year of history',
      'Download History',
    ],
    featured: true,
  },
];

const testimonials = [
  {
    name: 'Jane D',
    rating: 4.9,
    content: 'SparkAI has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.',
    avatar: 'https://i.ibb.co/k17b8TL/Add-a-little-bit-of-body-text.png',
    position: 'SparklAI User',
  },
  {
    name: 'Harsh P.',
    rating: 4.9,
    content: 'Thanks to SparkAI, I feel more informed and confident about my investment decisions than ever before.',
    avatar: 'https://i.ibb.co/k17b8TL/Add-a-little-bit-of-body-text.png',
    position: 'Product Designer',
  },
  {
    name: 'Alex K.',
    rating: 4.9,
    content: 'The customer service team at SparkAI went above and beyond to help me resolve a billing issue.',
    avatar: 'https://i.ibb.co/k17b8TL/Add-a-little-bit-of-body-text.png',
    position: 'SparklAI User',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isSignedIn } = useUser(); // Get the sign-in status

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'pricing', 'testimonials'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 80 && rect.bottom >= 80;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <Header navigation={navigation} />

      <div id="home" className="relative isolate px-6 lg:px-28 pt-2">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]  opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-10 flex items-center">
          <div className="lg:w-1/2 pr-8">
            <div className="hidden sm:mb-8 sm:flex sm:justify-start">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Discover our latest templates.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Generate Content Effortlessly with SparkAI
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                SparkAI makes it easy to create high-quality content in seconds. Enhance your productivity and focus on what matters most with our cutting-edge AI technology.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href={'/sign-up'}>
                  <Button className="text-sm">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center pl-8">
            <img
              src="https://i.ibb.co/RhsHFqw/Untitled-design-1.png"
              alt="SparkAI Screenshot"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-indigo-600">Core Features</h2>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Our Awesome Features</h3>
            <p className="mt-4 text-lg text-gray-600">
              Discover the powerful features of SparkAI that help you create high-quality content effortlessly.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">30+ Templates</h4>
              <p className="mt-2 text-base text-gray-600">Choose from over 30 professionally designed templates to jumpstart your content creation.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faSmile} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">Easy To Use</h4>
              <p className="mt-2 text-base text-gray-600">Our intuitive interface allows you to create content effortlessly without any technical skills.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faPaintRoller} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">Customizable</h4>
              <p className="mt-2 text-base text-gray-600">Easily customize templates to match your brand and style preferences.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faMagic} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">AI-Powered</h4>
              <p className="mt-2 text-base text-gray-600">Leverage advanced AI technology to generate unique and engaging content effortlessly.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faCog} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">Automation</h4>
              <p className="mt-2 text-base text-gray-600">Automate repetitive tasks and streamline your content creation process.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faHeadset} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">24/7 Support</h4>
              <p className="mt-2 text-base text-gray-600">Get round-the-clock support to assist you with any issues or questions.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faTools} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">Advanced Tools</h4>
              <p className="mt-2 text-base text-gray-600">Access a suite of advanced tools to enhance your content creation experience.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faSmile} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="mt-6 text-lg font-medium text-gray-900">User-Friendly</h4>
              <p className="mt-2 text-base text-gray-600">Designed with user experience in mind, making it simple for anyone to use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
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
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            The right price for you, whoever you are
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Start generating content with our AI for free, or upgrade to unlock premium features.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                  'text-base font-semibold leading-7',
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-5xl font-bold tracking-tight',
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
              </p>
              <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7')}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm leading-6 sm:mt-10',
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                )}
              >
                Get started today
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
            <h2 className="text-4xl font-bold text-gray-900">What our happy users say!</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-indigo-600 hover:shadow-sm">
                <div>
                  <div className="flex items-center mb-7 gap-2 text-">
                    <FontAwesomeIcon icon={faSmile} className="w-5 h-5" />
                    <span className="text-base font-semibold text-indigo-600">{testimonial.rating}</span>
                  </div>
                  <p className="text-base text-gray-600 leading-6 group-hover:text-gray-800">
                    {testimonial.content}
                  </p>
                </div>
                <div className="flex items-center gap-5 border-t border-solid border-gray-200 pt-5 mt-5">
                  <img className="h-10 w-10 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <h5 className="text-gray-900 font-medium">{testimonial.name}</h5>
                    <span className="text-sm text-gray-500">{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
