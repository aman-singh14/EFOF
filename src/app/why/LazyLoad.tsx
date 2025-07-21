'use client';

import { ReactNode, useEffect, useState, useRef, memo } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

/**
 * LazyLoad component that renders content only when it's about to enter the viewport
 * This helps improve initial page load performance by deferring the rendering of off-screen content
 * 
 * Enhanced with:
 * - Memory optimization with memoization
 * - Optional delay parameter for staggered loading
 * - Improved placeholder with skeleton loading
 */
export const LazyLoad = memo(function LazyLoad({
  children,
  placeholder = <div className="h-32 bg-gray-100 animate-pulse rounded-md"></div>,
  threshold = 0.1,
  rootMargin = '300px 0px', // Increased rootMargin for earlier loading
  triggerOnce = true,
  delay = 0,
}: LazyLoadProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView && !shouldRender) {
      if (delay > 0) {
        // Apply delay if specified
        timeoutRef.current = setTimeout(() => {
          setShouldRender(true);
        }, delay);
      } else {
        setShouldRender(true);
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView, shouldRender, delay]);

  return (
    <div ref={ref} className="w-full">
      {shouldRender ? children : placeholder}
    </div>
  );
});

/**
 * Enhanced skeleton placeholder for content that's loading
 */
export function ContentSkeleton({ 
  height = 'h-32',
  width = 'w-full',
  rounded = 'rounded-md'
}: { 
  height?: string;
  width?: string;
  rounded?: string;
}) {
  return (
    <div className={`${height} ${width} ${rounded} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-[shimmer_1.5s_infinite]`}></div>
  );
}

/**
 * LazyLoadSection component that renders an entire section only when it's about to enter the viewport
 * Useful for deferring the rendering of large sections with complex components
 * 
 * Enhanced with:
 * - Memory optimization with memoization
 * - Improved placeholder with content skeleton
 * - Increased rootMargin for earlier loading
 */
export const LazyLoadSection = memo(function LazyLoadSection({
  children,
  id,
  className = '',
  threshold = 0.05, // Lower threshold for earlier loading
  rootMargin = '600px 0px', // Increased rootMargin for earlier loading
  minHeight = 'min-h-[50vh]',
  skipPlaceholder = false,
}: {
  children: ReactNode;
  id: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
  skipPlaceholder?: boolean;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !shouldRender) {
      // Use requestIdleCallback if available for non-critical rendering
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number }).requestIdleCallback(() => {
          setShouldRender(true);
        }, { timeout: 1000 });
      } else {
        // Fallback to setTimeout
        setTimeout(() => setShouldRender(true), 100);
      }
    }
  }, [inView, shouldRender]);

  return (
    <section id={id} ref={ref} className={className}>
      {shouldRender ? (
        children
      ) : skipPlaceholder ? (
        <div className={minHeight}></div>
      ) : (
        <div className={`${minHeight} flex items-center justify-center`}>
          <div className="w-16 h-16 border-4 border-[#1A6B8A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
});

/**
 * Component for lazy loading images specifically
 */
export const LazyImage = memo(function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div 
      ref={ref} 
      className={`relative ${className}`} 
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {inView ? (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
          )}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        </>
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-md" />
      )}
    </div>
  );
});