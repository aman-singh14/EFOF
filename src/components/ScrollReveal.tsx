'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 800,
  threshold = 0.1,
  className = '' 
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Define animation classes
  const animationClasses = {
    'fade-up': 'translate-y-16 opacity-0',
    'fade-down': '-translate-y-16 opacity-0',
    'fade-left': 'translate-x-16 opacity-0',
    'fade-right': '-translate-x-16 opacity-0',
    'zoom-in': 'scale-75 opacity-0',
    'rotate': 'rotate-12 opacity-0'
  };

  return (
    <div 
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transform: isVisible ? 'none' : undefined,
        opacity: isVisible ? 1 : undefined,
        transitionProperty: 'transform, opacity',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`,
      }}
      data-animate={animation}
      data-visible={isVisible}
    >
      <div 
        className={`${isVisible ? '' : animationClasses[animation]}`}
        style={{
          transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
};