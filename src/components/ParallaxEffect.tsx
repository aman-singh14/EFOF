'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface ParallaxEffectProps {
  children: ReactNode;
  speed?: number; // Positive values move slower, negative values move faster
  className?: string;
}

export const ParallaxEffect = ({ 
  children, 
  speed = 0.2,
  className = '' 
}: ParallaxEffectProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    let startPosition = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (element) {
            const scrollPosition = window.scrollY;
            const elementPosition = element.offsetTop;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when element is in viewport
            if (
              elementPosition + element.offsetHeight > scrollPosition &&
              elementPosition < scrollPosition + windowHeight
            ) {
              const distance = scrollPosition - startPosition;
              const translateY = distance * speed;
              element.style.transform = `translateY(${translateY}px)`;
            }
          }
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    startPosition = element.offsetTop;
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};