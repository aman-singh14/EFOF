'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const MainNav = () => {
  const pathname = usePathname();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { 
      label: 'About',
      subItems: [
        { href: '/brief', label: 'Brief' },
        { href: '/why', label: 'Why?' },
        { href: '/board', label: 'Board' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/team', label: 'Team' },
      ]
    },
    { href: '/contact', label: 'Contact' },
  ];

  // Close dropdowns when route changes
  useEffect(() => {
    setIsAboutOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if current path is part of the about or contact sections
  const isAboutSection = pathname === '/brief' ||
                        pathname === '/why' || 
                        pathname === '/board' || 
                        pathname === '/portfolio' || 
                        pathname === '/team';
  
  const isContactSection = pathname === '/contact';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-sm border-b border-black">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/EFOF Logo.png"
              alt="EFOF Logo"
              width={200}
              height={60}
              className="h-12 w-auto hover:opacity-90 transition-opacity duration-200"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => {
                        setIsAboutOpen(!isAboutOpen);
                      }}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isAboutSection || isAboutOpen
                          ? 'text-black font-semibold' 
                          : 'text-black hover:text-gray-600'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isAboutOpen}
                    >
                      {item.label}
                      <svg
                        className={`ml-1 w-4 h-4 transition-transform ${
                          isAboutOpen ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isAboutOpen && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md bg-white border border-black z-50">
                        <div className="py-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                setIsAboutOpen(false);
                              }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-black font-semibold'
                      : 'text-black hover:text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
