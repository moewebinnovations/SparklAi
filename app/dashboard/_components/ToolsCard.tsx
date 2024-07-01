import React, { useState, useEffect } from 'react';
import { TEMPLATE } from './TemplateListSection';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Lock, Heart, Loader } from 'lucide-react';

interface ToolsCardProps extends TEMPLATE {
  isSubscribed: boolean;
  liked: boolean;
  onLike: (slug: string, liked: boolean) => void;
}

function ToolsCard({ isSubscribed, liked: initialLiked, onLike, ...item }: ToolsCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const isLocked = !isSubscribed && item.premium;

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    onLike(item.slug, !liked);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    setLoading(true);
  };

  return (
    <Link href={'/dashboard/content/' + item.slug} className={isLocked ? 'pointer-events-none' : ''} onClick={handleClick}>
      <div className='relative p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all h-56'>
        <div className='bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full self-start'>
          <FontAwesomeIcon icon={item.icon} className='text-white' />
        </div>
        <h2 className='font-medium text-lg'>{item.name}</h2>
        <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
        {isLocked && (
          <div className='absolute inset-0 bg-white bg-opacity-75 flex flex-col justify-center items-center rounded-md'>
            <div className='flex items-center gap-2 text-indigo-600'>
              <Lock className='w-5 h-5' />
              <span>Premium Only</span>
            </div>
          </div>
        )}
        {loading && (
          <div className='absolute inset-0 bg-white bg-opacity-75 flex flex-col justify-center items-center rounded-md'>
            <Loader className='w-6 h-6 animate-spin text-indigo-600' />
            <span className='mt-2 text-indigo-600'>Getting Ready</span>
          </div>
        )}
        <button onClick={toggleLike} className='absolute top-3 right-3'>
          <Heart className={`w-5 h-5 ${liked ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>
      </div>
    </Link>
  );
}

export default ToolsCard;
