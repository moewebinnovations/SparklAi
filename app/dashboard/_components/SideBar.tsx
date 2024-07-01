"use client";

import { faHome, faClock, faWallet, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import TrackUsage from './TrackUsage';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: faHome, current: true },
  { name: 'History', href: '/dashboard/history', icon: faClock, current: false },
  { name: 'Billing', href: '/dashboard/billing', icon: faWallet, current: false },
  { name: 'Settings', href: '/dashboard/settings', icon: faCog, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface SideBarProps {
  closeSidebar: () => void;
}

export default function SideBar({ closeSidebar }: SideBarProps) {
  const path = usePathname();

  return (
    <div className="flex flex-col h-screen gap-y-5 border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center border-b">
        <img
          className="h-8 w-auto"
          src={'/logo.svg'}
          alt="SparkAI"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} legacyBehavior>
                    <a
                      onClick={closeSidebar}
                      className={classNames(
                        path === item.href
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={classNames(
                          path === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <TrackUsage />
          </li>
        </ul>
      </nav>
    </div>
  );
}
