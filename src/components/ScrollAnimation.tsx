'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ScrollAnimationProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  amount?: number;
  className?: string;
  once?: boolean;
  duration?: number;
};

export default function ScrollAnimation({
  children,
  delay = 0,
  direction = 'up',
  amount = 0.1,
  className = '',
  once = true,
  duration = 0.6,
}: ScrollAnimationProps) {
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
    <motion.div
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
    </motion.div>
  );
}
