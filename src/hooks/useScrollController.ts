'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface ScrollState {
  currentSection: number;
  scrollProgress: number; // 0-1 for current section
  totalProgress: number; // 0-1 for entire page
  isScrolling: boolean;
  scrollDirection: 'up' | 'down';
  velocity: number;
  rawVelocity: number; // Unfiltered velocity for resistance calculations
  inputMethod: 'wheel' | 'touch' | 'keyboard' | 'programmatic';
}

export interface ScrollController {
  scrollState: ScrollState;
  scrollToSection: (index: number) => void;
  enableScrollResistance: (enabled: boolean) => void;
  setScrollResistance: (value: number) => void;
  applyScrollResistance: (delta: number, inputMethod: string) => number;
}

interface UseScrollControllerOptions {
  totalSections: number;
  scrollResistance?: number;
  transitionDuration?: number;
}

export const useScrollController = ({
  totalSections,
  scrollResistance = 0.3,
  transitionDuration = 800,
}: UseScrollControllerOptions): ScrollController => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    currentSection: 0,
    scrollProgress: 0,
    totalProgress: 0,
    isScrolling: false,
    scrollDirection: 'down',
    velocity: 0,
    rawVelocity: 0,
    inputMethod: 'programmatic',
  });

  const [resistanceEnabled, setResistanceEnabled] = useState(true);
  const [resistanceValue, setResistanceValue] = useState(scrollResistance);
  
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const velocityHistory = useRef<number[]>([]);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const isScrollingToSection = useRef(false);
  const currentInputMethod = useRef<ScrollState['inputMethod']>('programmatic');

  // Enhanced velocity calculation with smoothing
  const calculateVelocity = useCallback((scrollY: number): { velocity: number; rawVelocity: number } => {
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime.current;
    const scrollDelta = Math.abs(scrollY - lastScrollY.current);
    
    // Calculate raw velocity (pixels per millisecond)
    const rawVelocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;
    
    // Add to velocity history for smoothing
    velocityHistory.current.push(rawVelocity);
    if (velocityHistory.current.length > 5) {
      velocityHistory.current.shift();
    }
    
    // Calculate smoothed velocity (average of recent values)
    const velocity = velocityHistory.current.reduce((sum, v) => sum + v, 0) / velocityHistory.current.length;
    
    lastScrollTime.current = currentTime;
    
    return { velocity, rawVelocity };
  }, []);

  // Enhanced scroll resistance algorithm with velocity and input method consideration
  const applyScrollResistance = useCallback((
    delta: number,
    inputMethod: string = 'wheel'
  ): number => {
    if (!resistanceEnabled || isScrollingToSection.current) return delta;
    
    const { scrollProgress, velocity } = scrollState;
    
    // Base resistance from configuration
    let resistance = resistanceValue;
    
    // Increase resistance near section boundaries (0-20% and 80-100% of section)
    const boundaryDistance = Math.min(scrollProgress, 1 - scrollProgress);
    if (boundaryDistance < 0.2) {
      const boundaryMultiplier = 1 - (boundaryDistance / 0.2);
      resistance += boundaryMultiplier * 0.4;
    }
    
    // Velocity-based resistance - higher velocity = more resistance
    const velocityResistance = Math.min(velocity * 0.001, 0.3);
    resistance += velocityResistance;
    
    // Input method specific adjustments
    switch (inputMethod) {
      case 'wheel':
        // Standard resistance for mouse wheel
        break;
      case 'touch':
        // Reduced resistance for touch to feel more natural
        resistance *= 0.7;
        break;
      case 'keyboard':
        // Minimal resistance for keyboard navigation
        resistance *= 0.3;
        break;
      default:
        break;
    }
    
    // Clamp total resistance to prevent complete blocking
    const totalResistance = Math.min(resistance, 0.85);
    
    return delta * (1 - totalResistance);
  }, [resistanceEnabled, resistanceValue, scrollState]);

  // Easing functions for smooth transitions
  const easeOutCubic = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  const easeInOutCubic = useCallback((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, []);

  // Update scroll state based on current scroll position
  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate current section
    const sectionHeight = windowHeight;
    const currentSection = Math.floor(scrollY / sectionHeight);
    const clampedSection = Math.max(0, Math.min(currentSection, totalSections - 1));
    
    // Calculate progress within current section
    const sectionStart = clampedSection * sectionHeight;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionStart) / sectionHeight));
    
    // Calculate total progress
    const totalProgress = Math.max(0, Math.min(1, scrollY / (documentHeight - windowHeight)));
    
    // Enhanced velocity calculation
    const { velocity, rawVelocity } = calculateVelocity(scrollY);
    const scrollDirection = scrollY > lastScrollY.current ? 'down' : 'up';
    
    lastScrollY.current = scrollY;

    setScrollState(prev => ({
      ...prev,
      currentSection: clampedSection,
      scrollProgress,
      totalProgress,
      scrollDirection,
      velocity,
      rawVelocity,
      inputMethod: currentInputMethod.current,
    }));
  }, [totalSections, calculateVelocity]);

  // Handle scroll events with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }

      // Set scrolling state
      setScrollState(prev => ({ ...prev, isScrolling: true }));
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setScrollState(prev => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial state update
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [updateScrollState]);

  // Enhanced smooth scroll to specific section with custom easing
  const scrollToSection = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, totalSections - 1));
    const targetY = clampedIndex * window.innerHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    
    if (Math.abs(distance) < 10) return; // Already at target
    
    isScrollingToSection.current = true;
    currentInputMethod.current = 'programmatic';
    
    const startTime = Date.now();
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / transitionDuration, 1);
      
      // Use easeInOutCubic for smooth transitions
      const easedProgress = easeInOutCubic(progress);
      const currentY = startY + (distance * easedProgress);
      
      window.scrollTo(0, currentY);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Reset flag after transition completes
        setTimeout(() => {
          isScrollingToSection.current = false;
        }, 100);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, [totalSections, transitionDuration, easeInOutCubic]);

  const enableScrollResistance = useCallback((enabled: boolean) => {
    setResistanceEnabled(enabled);
  }, []);

  const setScrollResistance = useCallback((value: number) => {
    setResistanceValue(Math.max(0, Math.min(1, value)));
  }, []);

  return {
    scrollState,
    scrollToSection,
    enableScrollResistance,
    setScrollResistance,
    applyScrollResistance,
  };
};