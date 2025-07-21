'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation configuration interfaces
export interface AnimationConfig {
  trigger: 'onEnter' | 'onExit' | 'onProgress';
  elements: string; // CSS selector
  animation: Variants;
  delay?: number;
  stagger?: number;
  duration?: number;
  threshold?: number; // Intersection observer threshold
}

export interface AnimationOrchestratorProps {
  animations: AnimationConfig[];
  sectionId: string;
  scrollProgress?: number;
  className?: string;
  children?: React.ReactNode;
}

// Predefined animation presets inspired by jeton.com
export const ANIMATION_PRESETS: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  },
  slideDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  },
  slideLeft: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  slideRight: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  zoom: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  },
  zoomOut: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  parallax: {
    initial: { y: 0, scale: 1 },
    animate: { y: 0, scale: 1 },
    exit: { y: 0, scale: 1 }
  },
  rotate: {
    initial: { rotate: -10, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 10, opacity: 0 }
  },
  blur: {
    initial: { filter: 'blur(10px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
    exit: { filter: 'blur(10px)', opacity: 0 }
  }
};

// Custom easing functions for natural motion
export const EASING_PRESETS = {
  smooth: [0.16, 1, 0.3, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  sharp: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.46, 0.45, 0.94]
} as const;

interface AnimatedElement {
  element: Element;
  controls: ReturnType<typeof useAnimation>;
  config: AnimationConfig;
  isVisible: boolean;
}

export default function AnimationOrchestrator({
  animations,
  sectionId,
  scrollProgress = 0,
  className = '',
  children
}: AnimationOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Intersection observer for the main container
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '-10% 0px -10% 0px'
  });

  // Create a set of pre-initialized animation controls
  const control1 = useAnimation();
  const control2 = useAnimation();
  const control3 = useAnimation();
  const control4 = useAnimation();
  const control5 = useAnimation();
  const control6 = useAnimation();
  const control7 = useAnimation();
  const control8 = useAnimation();
  const control9 = useAnimation();
  const control10 = useAnimation();
  
  // Store all controls in an array for easy access
  const controlsArray = [
    control1, control2, control3, control4, control5,
    control6, control7, control8, control9, control10
  ];
  
  // Track which controls are already used
  const nextControlIndex = useRef(0);
  
  // Initialize animated elements
  useEffect(() => {
    if (!containerRef.current || isInitialized) return;

    const elements: AnimatedElement[] = [];
    nextControlIndex.current = 0;
    
    animations.forEach((config) => {
      const foundElements = containerRef.current!.querySelectorAll(config.elements);
      
      foundElements.forEach((element) => {
        // Get the next available control
        const controlIndex = nextControlIndex.current % controlsArray.length;
        const controls = controlsArray[controlIndex];
        nextControlIndex.current += 1;
        
        // Set initial state immediately
        controls.set(config.animation.initial || {});
        
        elements.push({
          element,
          controls,
          config,
          isVisible: false
        });
      });
    });

    setAnimatedElements(elements);
    setIsInitialized(true);
  }, [animations, isInitialized]);

  // Handle entrance animations
  useEffect(() => {
    if (!inView || animatedElements.length === 0) return;

    const entranceElements = animatedElements.filter(
      item => item.config.trigger === 'onEnter' && !item.isVisible
    );

    entranceElements.forEach((item, index) => {
      const { config, controls } = item;
      const delay = (config.delay || 0) + (config.stagger || 0) * index;
      
      setTimeout(() => {
        controls.start('animate', {
          duration: config.duration || 0.8,
          ease: EASING_PRESETS.smooth,
        });
        
        // Mark as visible
        item.isVisible = true;
      }, delay * 1000);
    });
  }, [inView, animatedElements]);

  // Handle exit animations
  useEffect(() => {
    if (inView || animatedElements.length === 0) return;

    const exitElements = animatedElements.filter(
      item => item.config.trigger === 'onExit' && item.isVisible
    );

    exitElements.forEach((item, index) => {
      const { config, controls } = item;
      const delay = (config.delay || 0) + (config.stagger || 0) * index;
      
      setTimeout(() => {
        controls.start('exit', {
          duration: config.duration || 0.6,
          ease: EASING_PRESETS.smooth,
        });
        
        // Mark as not visible
        item.isVisible = false;
      }, delay * 1000);
    });
  }, [inView, animatedElements]);

  // Handle progress-based animations (parallax, etc.)
  useEffect(() => {
    if (animatedElements.length === 0) return;

    const progressElements = animatedElements.filter(
      item => item.config.trigger === 'onProgress'
    );

    progressElements.forEach((item) => {
      const { config, controls } = item;
      
      // Calculate parallax offset based on scroll progress
      if (config.animation === ANIMATION_PRESETS.parallax) {
        const parallaxOffset = (scrollProgress - 0.5) * 100; // -50 to +50
        const scaleValue = 1 + (scrollProgress * 0.1); // 1 to 1.1
        
        controls.start({
          y: parallaxOffset,
          scale: scaleValue,
          transition: {
            duration: 0.1,
            ease: 'linear'
          }
        });
      }
    });
  }, [scrollProgress, animatedElements]);

  // Combine refs for intersection observer and container
  const setRefs = (element: HTMLDivElement | null) => {
    // Use a mutable ref object
    if (containerRef) {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
    inViewRef(element);
  };

  // Create motion components for each animated element
  const createMotionComponent = (element: AnimatedElement, index: number) => {
    const { config, controls } = element;
    
    return (
      <motion.div
        key={`${sectionId}-${index}`}
        initial="initial"
        animate={controls}
        variants={config.animation}
        className="contents" // Use contents to avoid affecting layout
      />
    );
  };

  return (
    <div
      ref={setRefs}
      className={`relative ${className}`}
      data-animation-orchestrator
      data-section-id={sectionId}
    >
      {children}
      
      {/* Render motion components for animations */}
      {animatedElements.map((element, index) => 
        createMotionComponent(element, index)
      )}
    </div>
  );
}

// Helper function to create common animation configurations
export const createAnimationConfig = (
  selector: string,
  preset: keyof typeof ANIMATION_PRESETS,
  options: Partial<AnimationConfig> = {}
): AnimationConfig => ({
  trigger: 'onEnter',
  elements: selector,
  animation: ANIMATION_PRESETS[preset],
  delay: 0,
  stagger: 0.1,
  duration: 0.8,
  threshold: 0.2,
  ...options
});

// Preset animation sequences for common use cases
export const ANIMATION_SEQUENCES = {
  heroSection: [
    createAnimationConfig('h1', 'slideUp', { delay: 0.2 }),
    createAnimationConfig('p', 'fade', { delay: 0.4 }),
    createAnimationConfig('button', 'slideUp', { delay: 0.6 }),
  ],
  cardGrid: [
    createAnimationConfig('.card', 'slideUp', { stagger: 0.15 }),
  ],
  textReveal: [
    createAnimationConfig('.text-line', 'slideUp', { stagger: 0.1 }),
  ],
  imageParallax: [
    createAnimationConfig('.parallax-bg', 'parallax', { trigger: 'onProgress' }),
  ],
  fadeInSequence: [
    createAnimationConfig('.fade-item', 'fade', { stagger: 0.2 }),
  ]
};