'use client';

import { useEffect, useState, useRef, useCallback, memo } from 'react';

/**
 * Hook to detect if the user prefers reduced motion
 * This helps ensure animations respect user preferences for accessibility
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Check initial preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Add listener for changes
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      // Clean up
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
}

/**
 * Enhanced hook to throttle animations based on device performance
 * This helps ensure smooth animations on lower-end devices
 */
export function usePerformanceOptimizedAnimations() {
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('high');
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Use deviceMemory API if available to detect low-end devices
      const memoryLevel = 'deviceMemory' in navigator ? (navigator as Navigator & { deviceMemory: number }).deviceMemory : 8;
      
      // Check for CPU cores if available
      const cpuCores = 'hardwareConcurrency' in navigator ? navigator.hardwareConcurrency : 8;
      
      // Check for mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check for battery status if available
      if ('getBattery' in navigator) {
        (navigator as Navigator & { getBattery: () => Promise<{ level: number; charging: boolean }> }).getBattery().then((battery) => {
          const isLowBattery = battery.level < 0.2 && !battery.charging;
          
          // Determine performance level based on all factors
          if ((memoryLevel <= 2 || cpuCores <= 2) && isMobile) {
            setPerformanceLevel('low');
          } else if ((memoryLevel <= 4 || cpuCores <= 4 || isLowBattery) && isMobile) {
            setPerformanceLevel('medium');
          } else {
            setPerformanceLevel('high');
          }
        });
      } else {
        // Fallback without battery info
        if ((memoryLevel <= 2 || cpuCores <= 2) && isMobile) {
          setPerformanceLevel('low');
        } else if ((memoryLevel <= 4 || cpuCores <= 4) && isMobile) {
          setPerformanceLevel('medium');
        } else {
          setPerformanceLevel('high');
        }
      }
      
      // Check for Data Saver mode
      if ('connection' in navigator && (navigator as Navigator & { connection: { saveData: boolean } }).connection.saveData) {
        setPerformanceLevel('low');
      }
    }
  }, []);
  
  return performanceLevel;
}

/**
 * Hook for throttling animations based on scroll performance
 */
export function useScrollOptimizedAnimations() {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);
  
  return isScrolling;
}

/**
 * Component to defer non-critical JavaScript execution
 * This helps improve initial page load performance
 */
export const DeferredScript = memo(function DeferredScript({ 
  children,
  priority = 'low'
}: { 
  children: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
}) {
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    // Different timing strategies based on priority
    if (priority === 'high') {
      // High priority: render after first paint
      requestAnimationFrame(() => {
        setShouldRender(true);
      });
    } else if (priority === 'medium') {
      // Medium priority: wait for page to be interactive
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setShouldRender(true);
      } else {
        const handleDOMContentLoaded = () => setShouldRender(true);
        document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
        return () => document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      }
    } else {
      // Low priority: wait until after the page has fully loaded
      if (document.readyState === 'complete') {
        // Use requestIdleCallback if available
        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number }).requestIdleCallback(() => {
            setShouldRender(true);
          }, { timeout: 2000 });
        } else {
          // Fallback to setTimeout
          setTimeout(() => setShouldRender(true), 1000);
        }
      } else {
        const handleLoad = () => {
          // Use requestIdleCallback if available
          if ('requestIdleCallback' in window) {
            (window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number }).requestIdleCallback(() => {
              setShouldRender(true);
            }, { timeout: 2000 });
          } else {
            // Fallback to setTimeout
            setTimeout(() => setShouldRender(true), 1000);
          }
        };
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [priority]);
  
  return shouldRender ? <>{children}</> : null;
});

/**
 * Hook for optimizing animations with requestAnimationFrame
 */
export function useAnimationFrame(callback: (deltaTime: number) => void, dependencies: React.DependencyList = []) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const callbackRef = useRef(callback);
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, dependencies);
}

/**
 * Component for optimizing image loading
 */
export const OptimizedImageLoader = memo(function OptimizedImageLoader({
  src,
  onLoad,
  priority = 'low'
}: {
  src: string;
  onLoad: () => void;
  priority?: 'high' | 'medium' | 'low';
}) {
  useEffect(() => {
    const img = new Image();
    
    if (priority === 'high') {
      // High priority: load immediately
      img.src = src;
    } else if (priority === 'medium') {
      // Medium priority: load after first paint
      requestAnimationFrame(() => {
        img.src = src;
      });
    } else {
      // Low priority: use Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              img.src = src;
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px 0px' }
      );
      
      // Observe a dummy element
      const dummyElement = document.createElement('div');
      document.body.appendChild(dummyElement);
      observer.observe(dummyElement);
      
      return () => {
        observer.disconnect();
        document.body.removeChild(dummyElement);
      };
    }
    
    img.onload = onLoad;
    
    return () => {
      img.onload = null;
    };
  }, [src, onLoad, priority]);
  
  return null;
});