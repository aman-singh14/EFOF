'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Users2, Newspaper, Mail, ChevronDown, ChevronUp, Info, Briefcase, Users as TeamIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if current path is part of the about section
  const isAboutSection = pathname === '/why' || 
                        pathname === '/board' || 
                        pathname === '/portfolio' || 
                        pathname === '/team';

  // Navigation items with their respective paths and icons
  const navItems = [
    { 
      href: '/', 
      label: 'Home', 
      icon: Home,
      isLink: true
    },
    { 
      label: 'About', 
      icon: Info,
      isLink: false,
      subItems: [
        { href: '/why', label: 'Why?', icon: Info },
        { href: '/board', label: 'Board', icon: Users },
        { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
        { href: '/team', label: 'Team', icon: TeamIcon },
      ]
    },
    { 
      href: '/news', 
      label: 'News', 
      icon: Newspaper,
      isLink: true
    },
    { 
      href: '/contact', 
      label: 'Contact', 
      icon: Mail,
      isLink: true
    },
  ];

  // Close dropdown when clicking outside
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

  // Close dropdown when route changes
  useEffect(() => {
    setIsAboutOpen(false);
  }, [pathname]);

  // Animation variants for the dropdown
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { 
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: 0.05,
      }
    }
  };

  // Animation variants for dropdown items
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1] as const,
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6">
      {/* Dropdown menu */}
      <AnimatePresence>
        {isAboutOpen && (
          <motion.div 
            className="bg-white/95 backdrop-blur-xl rounded-2xl border border-border mb-3 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="p-1.5">
              <div className="flex flex-col space-y-1.5">
                {navItems.find(item => item.label === 'About')?.subItems?.map((subItem) => {
                  const isActive = pathname === subItem.href;
                  const Icon = subItem.icon;
                  
                  return (
                    <motion.div 
                      key={subItem.href} 
                      variants={itemVariants}
                    >
                      <Link
                        href={subItem.href || '#'}
                        className={`flex items-center justify-center p-2.5 rounded-xl transition-colors duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                        onClick={() => setIsAboutOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                        <span className="ml-3 text-sm font-medium">{subItem.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navigation bar */}
      <motion.nav 
        className="bg-white/95 backdrop-blur-xl rounded-[2rem] border border-border p-1.5 mx-auto w-full"
        aria-label="Main navigation"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex items-center justify-between px-2">
          {navItems.map((item) => {
            // Skip rendering if it's a sub-item (they're rendered in the dropdown)
            if (!item.isLink && item.label !== 'About') return null;
            
            const isActive = item.isLink ? pathname === item.href : isAboutSection;
            const Icon = item.icon;
            
            if (item.label === 'About') {
              return (
                <div key={item.label} ref={dropdownRef} className="relative">
                  <motion.button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className={`flex items-center justify-center p-3 rounded-full transition-colors duration-200 ${
                      isActive || isAboutOpen
                        ? 'text-primary-foreground bg-primary'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isAboutOpen}
                    title={item.label}
                  >
                    <Icon className={`w-5 h-5 ${isActive || isAboutOpen ? 'text-primary-foreground' : 'text-primary'}`} />
                    {isAboutOpen && (
                      <motion.span 
                        className="ml-2 text-sm font-medium text-primary whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        Close
                      </motion.span>
                    )}
                  </motion.button>
                </div>
              );
            }
            
            return (
              <div key={item.href}>
                <Link 
                  href={item.href || '#'}
                  className={`flex items-center justify-center p-3 rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-foreground bg-primary' 
                      : 'text-foreground hover:bg-secondary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                </Link>
              </div>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
