"use client";
import React, { useState } from 'react';
import SideBar from './_components/SideBar';
import Header from './_components/Header';
import { UsageProvider } from '../(context)/UpdateCreditUsageContext';

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <UsageProvider>
      <div className='bg-slate-100 h-screen flex'>
        <div className={`fixed md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 w-64 z-50 md:z-auto h-full`}>
          <SideBar closeSidebar={closeSidebar} />
        </div>
        <div className='flex-1 flex flex-col overflow-auto'>
          <Header toggleSidebar={toggleSidebar} />
          <div className='overflow-auto h-full'>
            {children}
          </div>
        </div>
      </div>
    </UsageProvider>
  );
}

export default Layout;
