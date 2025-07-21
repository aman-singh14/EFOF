import { Variants } from 'framer-motion';
import { AnimationConfig, ANIMATION_PRESETS, EASING_PRESETS } from '@/components/AnimationOrchestrator';

// Animation timing utilities
export class AnimationTimer {
  private timers: Map<string, NodeJS.Timeout> = new Map();
  
  // Schedule an animation with a unique key
  schedule(key: string, callback: () => void, delay: number): void {
    // Clear existing timer if it exists
    this.clear(key);
    
    const timer = setTimeout(callback, delay);
    this.timers.set(key, timer);
  }
  
  // Clear a specific timer
  clear(key: string): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
  
  // Clear all timers
  clearAll(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
  
  // Check if a timer exists
  has(key: string): boolean {
    return this.timers.has(key);
  }
}

// Animation sequence builder
export class AnimationSequenceBuilder {
  private sequence: AnimationConfig[] = [];
  
  // Add an animation to the sequence
  add(
    selector: string,
    preset: keyof typeof ANIMATION_PRESETS,
    options: Partial<AnimationConfig> = {}
  ): AnimationSequenceBuilder {
    this.sequence.push({
      trigger: 'onEnter',
      elements: selector,
      animation: ANIMATION_PRESETS[preset],
      delay: 0,
      stagger: 0.1,
      duration: 0.8,
      threshold: 0.2,
      ...options
    });
    return this;
  }
  
  // Add a custom animation to the sequence
  addCustom(config: AnimationConfig): AnimationSequenceBuilder {
    this.sequence.push(config);
    return this;
  }
  
  // Add a delay to the sequence
  delay(duration: number): AnimationSequenceBuilder {
    const lastIndex = this.sequence.length - 1;
    if (lastIndex >= 0) {
      this.sequence[lastIndex].delay = (this.sequence[lastIndex].delay || 0) + duration;
    }
    return this;
  }
  
  // Set stagger for the last added animation
  stagger(duration: number): AnimationSequenceBuilder {
    const lastIndex = this.sequence.length - 1;
    if (lastIndex >= 0) {
      this.sequence[lastIndex].stagger = duration;
    }
    return this;
  }
  
  // Build and return the sequence
  build(): AnimationConfig[] {
    return [...this.sequence];
  }
  
  // Reset the builder
  reset(): AnimationSequenceBuilder {
    this.sequence = [];
    return this;
  }
}

// Advanced animation presets with complex timing
export const ADVANCED_ANIMATION_PRESETS: Record<string, Variants> = {
  // Elastic entrance with bounce
  elasticEnter: {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        duration: 1.2
      }
    },
    exit: { scale: 0, rotate: 180, opacity: 0 }
  },
  
  // Morphing scale effect
  morph: {
    initial: { scaleX: 0, scaleY: 1.5, opacity: 0 },
    animate: { 
      scaleX: 1, 
      scaleY: 1, 
      opacity: 1,
      transition: {
        scaleX: { duration: 0.6, ease: EASING_PRESETS.elastic },
        scaleY: { duration: 0.8, ease: EASING_PRESETS.bounce },
        opacity: { duration: 0.4, ease: EASING_PRESETS.smooth }
      }
    },
    exit: { scaleX: 1.5, scaleY: 0, opacity: 0 }
  },
  
  // Typewriter effect
  typewriter: {
    initial: { width: 0, opacity: 0 },
    animate: { 
      width: 'auto', 
      opacity: 1,
      transition: {
        width: { duration: 1.5, ease: 'linear' },
        opacity: { duration: 0.1 }
      }
    },
    exit: { width: 0, opacity: 0 }
  },
  
  // Glitch effect
  glitch: {
    initial: { 
      x: 0, 
      y: 0, 
      opacity: 0,
      filter: 'hue-rotate(0deg) saturate(1)'
    },
    animate: { 
      x: [0, -2, 2, 0],
      y: [0, 1, -1, 0],
      opacity: 1,
      filter: [
        'hue-rotate(0deg) saturate(1)',
        'hue-rotate(90deg) saturate(1.5)',
        'hue-rotate(180deg) saturate(0.8)',
        'hue-rotate(0deg) saturate(1)'
      ],
      transition: {
        duration: 0.6,
        times: [0, 0.3, 0.6, 1],
        ease: 'easeInOut'
      }
    },
    exit: { opacity: 0, filter: 'hue-rotate(360deg) saturate(0)' }
  }
};

// Utility functions for animation calculations
export const animationUtils = {
  // Calculate staggered delay for multiple elements
  calculateStaggerDelay: (index: number, baseDelay: number, stagger: number): number => {
    return baseDelay + (index * stagger);
  },
  
  // Calculate eased progress value
  easeProgress: (progress: number, easing: keyof typeof EASING_PRESETS): number => {
    const [x1, y1, x2, y2] = EASING_PRESETS[easing];
    // Simplified cubic-bezier calculation
    const t = progress;
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    
    return ay * t * t * t + by * t * t + cy * t;
  },
  
  // Generate parallax offset based on scroll progress
  calculateParallaxOffset: (
    scrollProgress: number, 
    intensity: number = 1, 
    direction: 'vertical' | 'horizontal' = 'vertical'
  ): { x: number; y: number } => {
    const offset = (scrollProgress - 0.5) * 100 * intensity;
    return direction === 'vertical' 
      ? { x: 0, y: offset }
      : { x: offset, y: 0 };
  },
  
  // Calculate scale based on scroll progress
  calculateScrollScale: (
    scrollProgress: number, 
    minScale: number = 0.8, 
    maxScale: number = 1.2
  ): number => {
    return minScale + (scrollProgress * (maxScale - minScale));
  },
  
  // Generate rotation based on scroll progress
  calculateScrollRotation: (
    scrollProgress: number, 
    maxRotation: number = 15
  ): number => {
    return (scrollProgress - 0.5) * maxRotation * 2;
  },
  
  // Check if element is in viewport
  isElementInViewport: (element: Element, threshold: number = 0): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    const verticalInView = (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    );
    
    const horizontalInView = (
      rect.left <= windowWidth * (1 - threshold) &&
      rect.right >= windowWidth * threshold
    );
    
    return verticalInView && horizontalInView;
  },
  
  // Throttle function for performance
  throttle: <T extends (...args: Array<unknown>) => unknown>(
    func: T, 
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return function(this: unknown, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Debounce function for performance
  debounce: <T extends (...args: Array<unknown>) => unknown>(
    func: T, 
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return function(this: unknown, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
};

// Performance monitoring utilities
export class AnimationPerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private isMonitoring = false;
  
  start(): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.monitor();
  }
  
  stop(): void {
    this.isMonitoring = false;
  }
  
  getFPS(): number {
    return Math.round(this.fps);
  }
  
  private monitor(): void {
    if (!this.isMonitoring) return;
    
    const currentTime = performance.now();
    this.frameCount++;
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = (this.frameCount * 1000) / (currentTime - this.lastTime);
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    requestAnimationFrame(() => this.monitor());
  }
  
  // Check if performance is acceptable
  isPerformanceGood(): boolean {
    return this.fps >= 50; // Consider 50+ FPS as good performance
  }
  
  // Get performance recommendation
  getPerformanceRecommendation(): 'high' | 'medium' | 'low' {
    if (this.fps >= 55) return 'high';
    if (this.fps >= 45) return 'medium';
    return 'low';
  }
}

// Export singleton instances
export const animationTimer = new AnimationTimer();
export const animationSequenceBuilder = new AnimationSequenceBuilder();
export const performanceMonitor = new AnimationPerformanceMonitor();