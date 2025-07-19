'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface ScrollSectionProps {
  children: ReactNode;
  id: string;
  backgroundType?: 'solid' | 'gradient' | 'video' | 'image';
  backgroundSrc?: string;
  animationPreset?: 'fade' | 'slide' | 'zoom' | 'parallax' | 'custom';
  className?: string;
  minHeight?: string;
  onEnterView?: () => void;
  onExitView?: () => void;
}

const ANIMATION_PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  },
  zoom: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  },
  parallax: {
    initial: { y: 0 },
    animate: { y: 0 },
    exit: { y: 0 }
  },
  custom: {
    initial: {},
    animate: {},
    exit: {}
  }
};

export default function ScrollSection({
  children,
  id,
  backgroundType = 'solid',
  backgroundSrc,
  animationPreset = 'fade',
  className = '',
  minHeight = '100vh',
  onEnterView,
  onExitView,
}: ScrollSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && onEnterView) {
        onEnterView();
      } else if (!inView && onExitView) {
        onExitView();
      }
    }
  });

  const animationVariants = ANIMATION_PRESETS[animationPreset] || ANIMATION_PRESETS.fade;

  const getBackgroundStyles = () => {
    const baseStyles = {
      minHeight,
      position: 'relative' as const,
    };

    switch (backgroundType) {
      case 'gradient':
        return {
          ...baseStyles,
          background: backgroundSrc || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        };
      case 'image':
        return {
          ...baseStyles,
          backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      case 'video':
        return baseStyles;
      default:
        return baseStyles;
    }
  };

  const renderBackground = () => {
    if (backgroundType === 'video' && backgroundSrc) {
      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      data-testid="scroll-section"
      className={`relative flex flex-col justify-center items-center overflow-hidden ${className}`}
      style={getBackgroundStyles()}
      initial={animationVariants.initial}
      animate={inView ? animationVariants.animate : animationVariants.initial}
      exit={animationVariants.exit}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {renderBackground()}
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        {children}
      </div>
    </motion.section>
  );
}