import { UserButton } from '@clerk/nextjs';
import { Flame, Bell, Menu } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className='p-5 shadow-sm bg-white border-b-2 flex justify-between items-center'>
      <Link href="/">
        <div className='flex items-center gap-2'>
          <Image src={'/logo.svg'} alt="Logo" width={40} height={40} />
          <span className='font-bold text-lg text-primary'>SparklAi</span>
        </div>
      </Link>

      <div className='flex gap-2 sm:gap-5 items-center'>
        <button className='md:hidden' onClick={toggleSidebar}>
          <Menu className='h-6 w-6' />
        </button>
        <Link href={'/dashboard/billing'} className='cursor-pointer'>
        <h2 className=' cursor-pointer hidden sm:flex bg-gradient-to-r from-purple-500 to-indigo-500 p-1 rounded-sm text-sm text-white px-2 items-center'>
          <Flame className='mr-1' /> Upgrade now for $9.99
        </h2>
        </Link>

        <UserButton />
      </div>
    </div>
  );
};

export default Header;
