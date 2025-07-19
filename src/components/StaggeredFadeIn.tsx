'use client';

import { ReactNode } from 'react';
import { FadeIn } from './FadeIn';

interface StaggeredFadeInProps {
  children: ReactNode;
  baseDelay?: number;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredFadeIn = ({ 
  children, 
  baseDelay = 0, 
  staggerDelay = 100, 
  className = '' 
}: StaggeredFadeInProps) => {
  // Convert children to array if it's not already
  const childrenArray = Array.isArray(children) ? children : [children];
  
  return (
    <>
      {childrenArray.map((child, index) => (
        <FadeIn 
          key={index} 
          delay={baseDelay + (index * staggerDelay)} 
          className={className}
        >
          {child}
        </FadeIn>
      ))}
    </>
  );
};