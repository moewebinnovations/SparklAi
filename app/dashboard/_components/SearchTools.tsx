import { Home, Search } from 'lucide-react';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenNib, faFileAlt, faLightbulb, faVideo, faComment, faTags, faEnvelope,
  faShoppingCart, faBullhorn, faGlobe, faUtensils, faDumbbell, faPlane, faBriefcase,
  faCalendar, faMoneyBillWave, faLanguage, faCamera, faPray, faMicrophone, faHome,
  faSeedling, faBook, faCode, faChartBar, faMusic, faPalette, faTools
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const categories = [
  { name: 'All Templates', icon: faTools },
  { name: 'Blog', icon: faPenNib },
  { name: 'Email', icon: faEnvelope },
  { name: 'Social Media', icon: faComment },
  { name: 'YouTube', icon: faVideo },
  { name: 'E-commerce', icon: faShoppingCart },
  { name: 'Marketing', icon: faBullhorn },
  { name: 'Web', icon: faGlobe },
  { name: 'SEO', icon: faChartBar },
  { name: 'Development', icon: faCode },
  { name: 'Music', icon: faMusic },
  { name: 'Art', icon: faPalette },
  { name: 'Food', icon: faUtensils },
  { name: 'Fitness', icon: faDumbbell },
  { name: 'Travel', icon: faPlane },
  { name: 'Books', icon: faBook },
  { name: 'HR', icon: faBriefcase },
  { name: 'Events', icon: faCalendar },
  { name: 'Career', icon: faFileAlt },
  { name: 'Finance', icon: faMoneyBillWave },
  { name: 'Education', icon: faLanguage },
  { name: 'Photography', icon: faCamera },
  { name: 'Wellness', icon: faPray },
  { name: 'Podcasting', icon: faMicrophone },
  { name: 'Design', icon: faHome },
  { name: 'Gardening', icon: faSeedling },
];

function SearchTools({ onSearchInput, onCategoryChange }: any) {
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const visibleCategories = showMoreCategories ? categories : categories.slice(0, 14);

  return (
    <div className='pb-7 flex flex-col justify-center items-center text-white border-b'>
      <nav className="flex border-b border-gray-200 bg-white w-full mb-5" aria-label="Breadcrumb">
        <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center">
              <Link href="/" className="text-purple-500 hover:text-purple-700">
                <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
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
              <Link
                href="/dashboard"
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className='w-full flex justify-center'>
        <div className='flex gap-2 items-center p-2 rounded-full bg-white my-5 w-full sm:w-[75%] lg:w-[50%] border-2 border-blue-500'>
          <div className='bg-blue-500 p-2 rounded-full'>
            <Search className='text-white' />
          </div>
          <input
            type='text'
            placeholder='Search tools...'
            onChange={(event) => onSearchInput(event.target.value)}
            className='bg-transparent w-full outline-none text-black'
          />
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mt-5'>
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => onCategoryChange(category.name)}
            className='flex items-center gap-2 p-2 bg-white text-black rounded-md cursor-pointer hover:bg-gray-200 transition-all justify-center'
          >
            <FontAwesomeIcon icon={category.icon} className='text-indigo-600' />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      {!showMoreCategories && (
        <button
          className='mt-5 p-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md hover:bg-blue-600 transition-all'
          onClick={() => setShowMoreCategories(true)}
        >
          More Categories
        </button>
      )}
    </div>
  );
}

export default SearchTools;
