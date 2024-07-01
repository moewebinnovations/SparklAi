import templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import ToolsCard from './ToolsCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { userlikedtemplates } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export interface TEMPLATE {
  name: string;
  desc: string;
  category: string;
  icon: any;
  aiPrompt: string;
  slug: string;
  premium: boolean;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

const itemsPerPage = 12;

function TemplateListSection({ userSearchInput, selectedCategory, isSubscribed }: any) {
  const { user } = useUser();
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(templates);
  const [currentPage, setCurrentPage] = useState(0);
  const [likedTemplates, setLikedTemplates] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedTemplates = async () => {
      if (user) {
        const email = user.primaryEmailAddress?.emailAddress;
        if (email) {
          const result = await db.select().from(userlikedtemplates).where(eq(userlikedtemplates.email, email));
          setLikedTemplates(result.map((item: any) => item.templateslug));
        }
      }
    };

    fetchLikedTemplates();
  }, [user]);

  useEffect(() => {
    let filteredTemplates = templates;

    if (userSearchInput) {
      filteredTemplates = filteredTemplates.filter(item =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All Templates') {
      filteredTemplates = filteredTemplates.filter(item =>
        item.category === selectedCategory
      );
    }

    // Sort templates with liked ones at the top
    filteredTemplates.sort((a, b) => {
      if (likedTemplates.includes(a.slug) && !likedTemplates.includes(b.slug)) return -1;
      if (!likedTemplates.includes(a.slug) && likedTemplates.includes(b.slug)) return 1;
      return 0;
    });

    setTemplateList(filteredTemplates);
    setCurrentPage(0);
  }, [userSearchInput, selectedCategory, likedTemplates]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLike = async (slug: string, liked: boolean) => {
    const action = liked ? 'like' : 'unlike';
    await fetch('/api/favs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, templateSlug: slug, action }),
    });

    if (liked) {
      setLikedTemplates([...likedTemplates, slug]);
    } else {
      setLikedTemplates(likedTemplates.filter((templateSlug) => templateSlug !== slug));
    }
  };

  const paginatedTemplates = templateList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(templateList.length / itemsPerPage);

  return (
    <div>
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1 pl-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-indigo-600 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLeft className="mr-3 h-5 w-5 text-indigo-600" aria-hidden="true" />
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`inline-flex items-center border-t-2 ${
                currentPage === page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } px-4 pt-4 text-sm font-medium`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end pr-12">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-indigo-600 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowRight className="ml-3 h-5 w-5 text-indigo-600" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 bg-[#F1F5F9]'>
        {paginatedTemplates.map((item: TEMPLATE, index: number) => (
          <ToolsCard key={index} {...item} isSubscribed={isSubscribed} liked={likedTemplates.includes(item.slug)} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}

export default TemplateListSection;
