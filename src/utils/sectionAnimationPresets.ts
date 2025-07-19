import { Variants } from 'framer-motion';
import { AnimationConfig } from '@/components/AnimationOrchestrator';

// Jeton.com inspired animation presets with sophisticated timing
export const JETON_ANIMATION_PRESETS: Record<string, Variants> = {
  // Elegant fade with subtle scale
  elegantFade: {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      filter: 'blur(2px)'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Custom smooth easing
        opacity: { duration: 0.8 },
        scale: { duration: 1.2, delay: 0.1 },
        filter: { duration: 0.6, delay: 0.2 }
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      filter: 'blur(4px)',
      transition: { duration: 0.6 }
    }
  },

  // Sophisticated slide up with momentum
  sophisticatedSlideUp: {
    initial: { 
      y: 120, 
      opacity: 0,
      rotateX: 15
    },
    animate: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120,
        mass: 1.2,
        opacity: { duration: 0.6, ease: 'easeOut' }
      }
    },
    exit: { 
      y: -60, 
      opacity: 0,
      rotateX: -10,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  },

  // Magnetic scale entrance
  magneticScale: {
    initial: { 
      scale: 0.3, 
      opacity: 0,
      rotate: -5
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
        mass: 0.8,
        opacity: { duration: 0.4, delay: 0.1 }
      }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0,
      rotate: 5,
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  },

  // Parallax background movement
  parallaxBackground: {
    initial: { y: 0, scale: 1.1 },
    animate: { y: 0, scale: 1.1 },
    exit: { y: 0, scale: 1.1 }
  },

  // Text reveal with mask effect
  textReveal: {
    initial: { 
      y: 100,
      opacity: 0,
      clipPath: 'inset(100% 0 0 0)'
    },
    animate: { 
      y: 0,
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
        clipPath: { duration: 0.8, delay: 0.1 },
        y: { duration: 0.8, delay: 0.2 },
        opacity: { duration: 0.6, delay: 0.3 }
      }
    },
    exit: { 
      y: -50,
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      transition: { duration: 0.5 }
    }
  },

  // Floating card effect
  floatingCard: {
    initial: { 
      y: 80, 
      opacity: 0,
      rotateY: 15,
      scale: 0.9
    },
    animate: { 
      y: 0, 
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        mass: 1,
        opacity: { duration: 0.6 },
        rotateY: { duration: 0.8, delay: 0.1 }
      }
    },
    exit: { 
      y: -40, 
      opacity: 0,
      rotateY: -10,
      scale: 0.95,
      transition: { duration: 0.6 }
    }
  },

  // Morphing entrance
  morphingEntrance: {
    initial: { 
      scaleX: 0.1, 
      scaleY: 1.5, 
      opacity: 0,
      borderRadius: '50%'
    },
    animate: { 
      scaleX: 1, 
      scaleY: 1, 
      opacity: 1,
      borderRadius: '0%',
      transition: {
        duration: 1.0,
        ease: [0.175, 0.885, 0.32, 1.275],
        scaleX: { duration: 0.8 },
        scaleY: { duration: 0.6, delay: 0.1 },
        borderRadius: { duration: 0.8, delay: 0.2 }
      }
    },
    exit: { 
      scaleX: 1.2, 
      scaleY: 0.1, 
      opacity: 0,
      borderRadius: '50%',
      transition: { duration: 0.5 }
    }
  },

  // Staggered line reveal
  lineReveal: {
    initial: { 
      width: 0, 
      opacity: 0 
    },
    animate: { 
      width: '100%', 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
        width: { duration: 1.0 },
        opacity: { duration: 0.3, delay: 0.5 }
      }
    },
    exit: { 
      width: 0, 
      opacity: 0,
      transition: { duration: 0.6 }
    }
  },

  // Glowing entrance
  glowingEntrance: {
    initial: { 
      opacity: 0,
      scale: 0.8,
      filter: 'brightness(0.5) blur(10px)'
    },
    animate: { 
      opacity: 1,
      scale: 1,
      filter: 'brightness(1) blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 1.0, delay: 0.2 }
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      filter: 'brightness(2) blur(20px)',
      transition: { duration: 0.8 }
    }
  }
};

// Section-specific animation configurations
export interface SectionAnimationConfig {
  sectionId: string;
  name: string;
  description: string;
  animations: AnimationConfig[];
  backgroundAnimations?: AnimationConfig[];
  exitAnimations?: AnimationConfig[];
}

// Hero section animations
export const HERO_SECTION_ANIMATIONS: SectionAnimationConfig = {
  sectionId: 'hero',
  name: 'Hero Section',
  description: 'Elegant entrance with staggered text and floating elements',
  animations: [
    {
      trigger: 'onEnter',
      elements: 'h1, .hero-title',
      animation: JETON_ANIMATION_PRESETS.textReveal,
      delay: 0.3,
      stagger: 0.2,
      duration: 1.2,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: '.hero-image, .hero-visual',
      animation: JETON_ANIMATION_PRESETS.elegantFade,
      delay: 0.5,
      duration: 1.5,
      threshold: 0.1
    },
    {
      trigger: 'onEnter',
      elements: 'p, .hero-subtitle',
      animation: JETON_ANIMATION_PRESETS.sophisticatedSlideUp,
      delay: 0.8,
      stagger: 0.15,
      duration: 1.0,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: 'button, .cta-button, .hero-button',
      animation: JETON_ANIMATION_PRESETS.magneticScale,
      delay: 1.2,
      stagger: 0.1,
      duration: 0.8,
      threshold: 0.2
    }
  ],
  backgroundAnimations: [
    {
      trigger: 'onProgress',
      elements: '.hero-background, .parallax-bg',
      animation: JETON_ANIMATION_PRESETS.parallaxBackground,
      delay: 0,
      duration: 0.1,
      threshold: 0
    }
  ],
  exitAnimations: [
    {
      trigger: 'onExit',
      elements: '.hero-content',
      animation: JETON_ANIMATION_PRESETS.elegantFade,
      delay: 0,
      duration: 0.6,
      threshold: 0.8
    }
  ]
};

// About section animations
export const ABOUT_SECTION_ANIMATIONS: SectionAnimationConfig = {
  sectionId: 'about',
  name: 'About Section',
  description: 'Professional content reveal with floating cards',
  animations: [
    {
      trigger: 'onEnter',
      elements: '.section-title, h2',
      animation: JETON_ANIMATION_PRESETS.lineReveal,
      delay: 0.2,
      duration: 1.0,
      threshold: 0.3
    },
    {
      trigger: 'onEnter',
      elements: '.about-text, .content-block',
      animation: JETON_ANIMATION_PRESETS.sophisticatedSlideUp,
      delay: 0.6,
      stagger: 0.2,
      duration: 0.8,
      threshold: 0.3
    },
    {
      trigger: 'onEnter',
      elements: '.about-card, .feature-card',
      animation: JETON_ANIMATION_PRESETS.floatingCard,
      delay: 0.8,
      stagger: 0.15,
      duration: 1.0,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: '.about-image, .content-image',
      animation: JETON_ANIMATION_PRESETS.morphingEntrance,
      delay: 1.0,
      duration: 1.2,
      threshold: 0.2
    }
  ],
  backgroundAnimations: [
    {
      trigger: 'onProgress',
      elements: '.about-background',
      animation: JETON_ANIMATION_PRESETS.parallaxBackground,
      delay: 0,
      duration: 0.1,
      threshold: 0
    }
  ]
};

// Services section animations
export const SERVICES_SECTION_ANIMATIONS: SectionAnimationConfig = {
  sectionId: 'services',
  name: 'Services Section',
  description: 'Dynamic grid reveal with glowing effects',
  animations: [
    {
      trigger: 'onEnter',
      elements: '.services-title, h2',
      animation: JETON_ANIMATION_PRESETS.glowingEntrance,
      delay: 0.2,
      duration: 1.5,
      threshold: 0.3
    },
    {
      trigger: 'onEnter',
      elements: '.service-item, .service-card',
      animation: JETON_ANIMATION_PRESETS.magneticScale,
      delay: 0.5,
      stagger: 0.12,
      duration: 0.8,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: '.service-description',
      animation: JETON_ANIMATION_PRESETS.textReveal,
      delay: 0.8,
      stagger: 0.1,
      duration: 1.0,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: '.service-icon',
      animation: JETON_ANIMATION_PRESETS.floatingCard,
      delay: 0.6,
      stagger: 0.08,
      duration: 0.6,
      threshold: 0.2
    }
  ]
};

// Contact section animations
export const CONTACT_SECTION_ANIMATIONS: SectionAnimationConfig = {
  sectionId: 'contact',
  name: 'Contact Section',
  description: 'Elegant form reveal with sophisticated transitions',
  animations: [
    {
      trigger: 'onEnter',
      elements: '.contact-title, h2',
      animation: JETON_ANIMATION_PRESETS.sophisticatedSlideUp,
      delay: 0.2,
      duration: 1.0,
      threshold: 0.3
    },
    {
      trigger: 'onEnter',
      elements: '.contact-form, form',
      animation: JETON_ANIMATION_PRESETS.morphingEntrance,
      delay: 0.5,
      duration: 1.2,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: '.form-field, input, textarea',
      animation: JETON_ANIMATION_PRESETS.elegantFade,
      delay: 0.8,
      stagger: 0.1,
      duration: 0.8,
      threshold: 0.2
    },
    {
      trigger: 'onEnter',
      elements: '.contact-info',
      animation: JETON_ANIMATION_PRESETS.floatingCard,
      delay: 1.0,
      duration: 0.8,
      threshold: 0.2
    }
  ]
};

// Collection of all section animations
export const SECTION_ANIMATION_PRESETS: Record<string, SectionAnimationConfig> = {
  hero: HERO_SECTION_ANIMATIONS,
  about: ABOUT_SECTION_ANIMATIONS,
  services: SERVICES_SECTION_ANIMATIONS,
  contact: CONTACT_SECTION_ANIMATIONS
};

// Utility function to get animations for a specific section
export const getSectionAnimations = (sectionId: string): SectionAnimationConfig | null => {
  return SECTION_ANIMATION_PRESETS[sectionId] || null;
};

// Utility function to create custom section animations
export const createCustomSectionAnimation = (
  sectionId: string,
  name: string,
  description: string,
  animationConfigs: Partial<AnimationConfig>[]
): SectionAnimationConfig => {
  const animations: AnimationConfig[] = animationConfigs.map(config => ({
    trigger: 'onEnter',
    elements: '',
    animation: JETON_ANIMATION_PRESETS.elegantFade,
    delay: 0,
    stagger: 0.1,
    duration: 0.8,
    threshold: 0.2,
    ...config
  }));

  return {
    sectionId,
    name,
    description,
    animations
  };
};

// Animation choreography utilities
export const CHOREOGRAPHY_PRESETS = {
  // Sequential reveal - one after another
  sequential: (baseDelay: number = 0, interval: number = 0.2) => ({
    calculateDelay: (index: number) => baseDelay + (index * interval)
  }),
  
  // Cascade reveal - overlapping animations
  cascade: (baseDelay: number = 0, overlap: number = 0.1) => ({
    calculateDelay: (index: number) => baseDelay + (index * overlap)
  }),
  
  // Center-out reveal - from center to edges
  centerOut: (baseDelay: number = 0, maxDelay: number = 0.5) => ({
    calculateDelay: (index: number, total: number) => {
      const center = Math.floor(total / 2);
      const distance = Math.abs(index - center);
      return baseDelay + (distance / center) * maxDelay;
    }
  }),
  
  // Random reveal - randomized timing
  random: (baseDelay: number = 0, maxRandomDelay: number = 0.3) => ({
    calculateDelay: (index: number) => baseDelay + (Math.random() * maxRandomDelay)
  })
};

// Performance optimization presets
export const PERFORMANCE_PRESETS = {
  high: {
    enableBlur: true,
    enableTransforms: true,
    enableFilters: true,
    maxAnimations: 20,
    staggerLimit: 0.05
  },
  medium: {
    enableBlur: false,
    enableTransforms: true,
    enableFilters: false,
    maxAnimations: 15,
    staggerLimit: 0.1
  },
  low: {
    enableBlur: false,
    enableTransforms: false,
    enableFilters: false,
    maxAnimations: 10,
    staggerLimit: 0.2
  }
};