'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SectionAnimationConfig, 
  getSectionAnimations,
  CHOREOGRAPHY_PRESETS,
  PERFORMANCE_PRESETS,
  JETON_ANIMATION_PRESETS
} from '@/utils/sectionAnimationPresets';
import { AnimationConfig } from '@/components/AnimationOrchestrator';

interface SectionAnimationControllerProps {
  sectionId: string;
  children: React.ReactNode;
  scrollProgress?: number;
  customAnimations?: AnimationConfig[];
  performanceLevel?: 'high' | 'medium' | 'low';
  choreographyType?: 'sequential' | 'cascade' | 'centerOut' | 'random';
  className?: string;
  onAnimationStart?: (sectionId: string) => void;
  onAnimationComplete?: (sectionId: string) => void;
}

interface AnimatedElementState {
  element: Element;
  config: AnimationConfig;
  controls: ReturnType<typeof useAnimation>;
  hasAnimated: boolean;
  isVisible: boolean;
  timeoutId?: NodeJS.Timeout;
}

export default function SectionAnimationController({
  sectionId,
  children,
  scrollProgress = 0,
  customAnimations,
  performanceLevel = 'high',
  choreographyType = 'sequential',
  className = '',
  onAnimationStart,
  onAnimationComplete
}: SectionAnimationControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedElements, setAnimatedElements] = useState<AnimatedElementState[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [animationConfig, setAnimationConfig] = useState<SectionAnimationConfig | null>(null);
  
  // Intersection observer for entrance animations
  const { ref: inViewRef, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '-5% 0px -5% 0px'
  });

  // Exit detection observer
  const { ref: exitRef, inView: inViewExit } = useInView({
    threshold: 0.9,
    triggerOnce: false,
    rootMargin: '0px'
  });

  // Performance settings
  const performanceSettings = PERFORMANCE_PRESETS[performanceLevel];
  
  // Create choreography functions
  const getChoreographyDelay = (type: string, index: number, total?: number): number => {
    switch (type) {
      case 'sequential':
        return index * 0.2;
      case 'cascade':
        return index * 0.1;
      case 'centerOut':
        if (total) {
          const center = Math.floor(total / 2);
          const distance = Math.abs(index - center);
          return (distance / center) * 0.5;
        }
        return index * 0.15;
      case 'random':
        return Math.random() * 0.3;
      default:
        return index * 0.1;
    }
  };

  // Initialize animation configuration
  useEffect(() => {
    const config = getSectionAnimations(sectionId);
    if (config || customAnimations) {
      setAnimationConfig(config);
    }
  }, [sectionId, customAnimations]);

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
  const usedControlsMap = useRef(new Map<string, number>());
  const nextControlIndex = useRef(0);
  
  // Get the next available control
  const getNextControl = () => {
    const index = nextControlIndex.current % controlsArray.length;
    nextControlIndex.current += 1;
    return controlsArray[index];
  };
  
  // Initialize animated elements
  useEffect(() => {
    if (!containerRef.current || !animationConfig || isInitialized) return;

    const elements: AnimatedElementState[] = [];
    const allAnimations = [
      ...(animationConfig.animations || []),
      ...(customAnimations || [])
    ];

    // Limit animations based on performance level
    const limitedAnimations = allAnimations.slice(0, performanceSettings.maxAnimations);

    limitedAnimations.forEach((config) => {
      const foundElements = containerRef.current!.querySelectorAll(config.elements);
      
      foundElements.forEach((element, index) => {
        // Get the next available control
        const controls = getNextControl();
        
        // Apply performance optimizations
        const optimizedAnimation = { ...config.animation };
        
        if (!performanceSettings.enableBlur) {
          // Remove blur effects
          Object.keys(optimizedAnimation).forEach(key => {
            const variant = optimizedAnimation[key as keyof typeof optimizedAnimation];
            if (variant && typeof variant === 'object' && 'filter' in variant) {
              delete variant.filter;
            }
          });
        }

        if (!performanceSettings.enableTransforms) {
          // Simplify transforms
          Object.keys(optimizedAnimation).forEach(key => {
            const variant = optimizedAnimation[key as keyof typeof optimizedAnimation];
            if (variant && typeof variant === 'object') {
              delete variant.rotateX;
              delete variant.rotateY;
              delete variant.rotateZ;
              delete variant.skewX;
              delete variant.skewY;
            }
          });
        }

        // Set initial state
        controls.set(optimizedAnimation.initial || {});
        
        elements.push({
          element,
          config: { ...config, animation: optimizedAnimation },
          controls,
          hasAnimated: false,
          isVisible: false
        });
      });
    });

    setAnimatedElements(elements);
    setIsInitialized(true);
  }, [animationConfig, customAnimations, isInitialized, performanceSettings]);

  // Handle entrance animations
  useEffect(() => {
    if (!inView || animatedElements.length === 0) return;

    const entranceElements = animatedElements.filter(
      item => item.config.trigger === 'onEnter' && !item.hasAnimated
    );

    if (entranceElements.length === 0) return;

    // Notify animation start
    if (onAnimationStart) {
      onAnimationStart(sectionId);
    }

    // Calculate choreographed delays
    entranceElements.forEach((item, index) => {
      const { config, controls } = item;
      let calculatedDelay = config.delay || 0;

      // Apply choreography based on type using our custom function
      calculatedDelay += getChoreographyDelay(choreographyType, index, entranceElements.length);

      // Apply stagger if specified
      if (config.stagger) {
        calculatedDelay += config.stagger * index;
      }

      // Respect performance stagger limits
      calculatedDelay = Math.max(calculatedDelay, performanceSettings.staggerLimit * index);

      // Execute animation
      const timeoutId = setTimeout(() => {
        controls.start('animate', {
          duration: config.duration || 0.8,
          ease: [0.16, 1, 0.3, 1], // Smooth easing
        }).then(() => {
          // Mark as animated
          item.hasAnimated = true;
          item.isVisible = true;

          // Check if all entrance animations are complete
          const allEntranceComplete = entranceElements.every(el => el.hasAnimated);
          if (allEntranceComplete && onAnimationComplete) {
            onAnimationComplete(sectionId);
          }
        });
      }, calculatedDelay * 1000);

      // Store timeout for cleanup
      (item as AnimatedElementState & { timeoutId?: NodeJS.Timeout }).timeoutId = timeoutId;
    });

    // Cleanup function
    return () => {
      entranceElements.forEach(item => {
        if ((item as AnimatedElementState & { timeoutId?: NodeJS.Timeout }).timeoutId) {
          clearTimeout((item as AnimatedElementState & { timeoutId?: NodeJS.Timeout }).timeoutId);
        }
      });
    };
  }, [inView, animatedElements, choreographyType, sectionId, onAnimationStart, onAnimationComplete]);

  // Handle exit animations
  useEffect(() => {
    if (inViewExit || animatedElements.length === 0) return;

    const exitElements = animatedElements.filter(
      item => item.config.trigger === 'onExit' && item.isVisible
    );

    exitElements.forEach((item, index) => {
      const { config, controls } = item;
      const delay = (config.delay || 0) + (config.stagger || 0) * index;
      
      setTimeout(() => {
        controls.start('exit', {
          duration: config.duration || 0.6,
          ease: [0.4, 0, 0.2, 1], // Sharp exit easing
        }).then(() => {
          item.isVisible = false;
        });
      }, delay * 1000);
    });
  }, [inViewExit, animatedElements]);

  // Handle progress-based animations (parallax)
  useEffect(() => {
    if (animatedElements.length === 0) return;

    const progressElements = animatedElements.filter(
      item => item.config.trigger === 'onProgress'
    );

    progressElements.forEach((item) => {
      const { config, controls } = item;
      
      if (config.animation === JETON_ANIMATION_PRESETS.parallaxBackground) {
        // Calculate parallax values
        const parallaxY = (scrollProgress - 0.5) * 50; // -25 to +25
        const parallaxScale = 1.05 + (scrollProgress * 0.1); // 1.05 to 1.15
        const parallaxOpacity = Math.max(0.3, 1 - (Math.abs(scrollProgress - 0.5) * 1.4));

        controls.start({
          y: parallaxY,
          scale: parallaxScale,
          opacity: parallaxOpacity,
          transition: {
            duration: 0.1,
            ease: 'linear'
          }
        });
      }
    });
  }, [scrollProgress, animatedElements]);

  // Handle background animations
  useEffect(() => {
    if (!animationConfig?.backgroundAnimations || animatedElements.length === 0) return;

    const backgroundElements = animatedElements.filter(
      item => animationConfig.backgroundAnimations?.some(bg => bg.elements === item.config.elements)
    );

    backgroundElements.forEach((item) => {
      const { controls } = item;
      
      // Apply continuous background animation based on scroll progress
      const backgroundY = scrollProgress * 30; // Subtle movement
      const backgroundScale = 1 + (scrollProgress * 0.05);
      
      controls.start({
        y: backgroundY,
        scale: backgroundScale,
        transition: {
          duration: 0.2,
          ease: 'easeOut'
        }
      });
    });
  }, [scrollProgress, animationConfig, animatedElements]);

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    // Use a mutable ref object
    if (containerRef) {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
    }
    inViewRef(element);
    exitRef(element);
  };

  return (
    <div
      ref={setRefs}
      className={`relative ${className}`}
      data-section-animation-controller
      data-section-id={sectionId}
      data-performance-level={performanceLevel}
      data-choreography={choreographyType}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
      
      {/* Debug information in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
          <div>Section: {sectionId}</div>
          <div>In View: {inView ? 'Yes' : 'No'}</div>
          <div>Scroll Progress: {Math.round(scrollProgress * 100)}%</div>
          <div>Animated Elements: {animatedElements.length}</div>
          <div>Performance: {performanceLevel}</div>
        </div>
      )}
    </div>
  );
}

// Higher-order component for easy section animation wrapping
export function withSectionAnimations<P extends object>(
  Component: React.ComponentType<P>,
  sectionId: string,
  animationOptions?: Partial<SectionAnimationControllerProps>
) {
  return function AnimatedSection(props: P) {
    return (
      <SectionAnimationController
        sectionId={sectionId}
        {...animationOptions}
      >
        <Component {...props} />
      </SectionAnimationController>
    );
  };
}

// Hook for accessing section animation state
export function useSectionAnimation(sectionId: string) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleAnimationStart = (id: string) => {
    if (id === sectionId) {
      setIsAnimating(true);
    }
  };

  const handleAnimationComplete = (id: string) => {
    if (id === sectionId) {
      setIsAnimating(false);
      setHasAnimated(true);
    }
  };

  return {
    isAnimating,
    hasAnimated,
    onAnimationStart: handleAnimationStart,
    onAnimationComplete: handleAnimationComplete
  };
}