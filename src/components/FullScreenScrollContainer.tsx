'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useScrollController } from '@/hooks/useScrollController';

export interface FullScreenScrollContainerProps {
  children: ReactNode;
  scrollResistance?: number;
  transitionDuration?: number;
  enableParallax?: boolean;
  className?: string;
  onSectionChange?: (sectionIndex: number) => void;
}

export default function FullScreenScrollContainer({
  children,
  scrollResistance = 0.01,
  transitionDuration = 800,
  enableParallax = true,
  className = '',
  onSectionChange,
}: FullScreenScrollContainerProps) {
  const [totalSections, setTotalSections] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const {
    scrollState,
    scrollToSection,
    enableScrollResistance,
    setScrollResistance,
    applyScrollResistance,
  } = useScrollController({
    totalSections,
    scrollResistance,
    transitionDuration,
  });

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Count sections and set up scroll behavior
  useEffect(() => {
    if (!isClient) return;

    const sections = document.querySelectorAll('[data-scroll-section]');
    setTotalSections(sections.length);

    // Add CSS for smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [isClient, children]);

  // Handle section change callback
  useEffect(() => {
    if (onSectionChange && scrollState.currentSection !== undefined) {
      onSectionChange(scrollState.currentSection);
    }
  }, [scrollState.currentSection, onSectionChange]);

  // Removed all custom scroll resistance and event interception. Native scroll is now used.

  // Provide scroll context to children
  const scrollContext = {
    scrollState,
    scrollToSection,
    enableScrollResistance,
    setScrollResistance,
    totalSections,
  };

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`relative h-screen overflow-y-auto scroll-smooth ${className}`}
      style={{ scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}
      data-scroll-container
    >
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollState.totalProgress * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="relative">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              'data-scroll-section': true,
              'data-section-index': index,
              style: {
                ...(child.props.style || {}),
                scrollSnapAlign: 'start',
                minHeight: '100vh',
              },
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}