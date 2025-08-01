'use client';

import { motion } from 'framer-motion';
import { ReactNode, lazy, Suspense } from 'react';

type LazyScrollAnimationProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  amount?: number;
  className?: string;
  once?: boolean;
  duration?: number;
};

// Lazy load the animation component for non-critical elements
const LazyMotionDiv = lazy(() => 
  Promise.resolve({
    default: motion.div
  })
);

export default function LazyScrollAnimation({
  children,
  delay = 0,
  direction = 'up',
  amount = 0.1,
  className = '',
  once = true,
  duration = 0.6,
}: LazyScrollAnimationProps) {
  const directionVariants = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
    fade: { opacity: 0 },
    zoom: { scale: 0.9, opacity: 0 },
  };

  const animateTo = {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
  };

  const initial = directionVariants[direction] || { opacity: 0 };

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotionDiv
        initial={initial}
        whileInView={animateTo}
        viewport={{ once, amount }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </LazyMotionDiv>
    </Suspense>
  );
}