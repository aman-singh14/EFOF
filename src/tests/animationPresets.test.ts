import { describe, it, expect } from 'vitest';
import {
  JETON_ANIMATION_PRESETS,
  SECTION_ANIMATION_PRESETS,
  getSectionAnimations,
  createCustomSectionAnimation,
  CHOREOGRAPHY_PRESETS,
  PERFORMANCE_PRESETS
} from '@/utils/sectionAnimationPresets';

describe('Animation Presets Integration Tests', () => {
  describe('Jeton Animation Presets', () => {
    it('should have all required animation variants', () => {
      const presets = Object.keys(JETON_ANIMATION_PRESETS);
      expect(presets).toContain('elegantFade');
      expect(presets).toContain('sophisticatedSlideUp');
      expect(presets).toContain('magneticScale');
      expect(presets).toContain('parallaxBackground');
      expect(presets).toContain('textReveal');
      expect(presets).toContain('floatingCard');
      expect(presets).toContain('morphingEntrance');
      expect(presets).toContain('lineReveal');
      expect(presets).toContain('glowingEntrance');
    });

    it('should have proper Framer Motion structure', () => {
      Object.values(JETON_ANIMATION_PRESETS).forEach(preset => {
        expect(preset).toHaveProperty('initial');
        expect(preset).toHaveProperty('animate');
        expect(preset).toHaveProperty('exit');
      });
    });

    it('should have sophisticated timing configurations', () => {
      const elegantFade = JETON_ANIMATION_PRESETS.elegantFade;
      expect(elegantFade.animate).toHaveProperty('transition');
      expect(elegantFade.animate.transition).toHaveProperty('duration');
      expect(elegantFade.animate.transition.duration).toBeGreaterThan(0.5);
    });

    it('should have spring animations for dynamic effects', () => {
      const slideUp = JETON_ANIMATION_PRESETS.sophisticatedSlideUp;
      expect(slideUp.animate.transition).toHaveProperty('type', 'spring');
      expect(slideUp.animate.transition).toHaveProperty('damping');
      expect(slideUp.animate.transition).toHaveProperty('stiffness');
    });

    it('should have complex multi-property animations', () => {
      const textReveal = JETON_ANIMATION_PRESETS.textReveal;
      expect(textReveal.initial).toHaveProperty('clipPath');
      expect(textReveal.animate).toHaveProperty('clipPath');
      expect(textReveal.animate.transition).toHaveProperty('clipPath');
      expect(textReveal.animate.transition).toHaveProperty('y');
      expect(textReveal.animate.transition).toHaveProperty('opacity');
    });
  });

  describe('Section Animation Configurations', () => {
    it('should have configurations for all main sections', () => {
      expect(SECTION_ANIMATION_PRESETS).toHaveProperty('hero');
      expect(SECTION_ANIMATION_PRESETS).toHaveProperty('about');
      expect(SECTION_ANIMATION_PRESETS).toHaveProperty('services');
      expect(SECTION_ANIMATION_PRESETS).toHaveProperty('contact');
    });

    it('should have proper section structure', () => {
      Object.values(SECTION_ANIMATION_PRESETS).forEach(section => {
        expect(section).toHaveProperty('sectionId');
        expect(section).toHaveProperty('name');
        expect(section).toHaveProperty('description');
        expect(section).toHaveProperty('animations');
        expect(Array.isArray(section.animations)).toBe(true);
        expect(section.animations.length).toBeGreaterThan(0);
      });
    });

    it('should have choreographed timing for hero section', () => {
      const hero = SECTION_ANIMATION_PRESETS.hero;
      const delays = hero.animations.map(anim => anim.delay || 0);
      
      // Verify delays are in ascending order (choreographed)
      for (let i = 1; i < delays.length; i++) {
        expect(delays[i]).toBeGreaterThanOrEqual(delays[i - 1]);
      }
    });

    it('should have appropriate element selectors', () => {
      const hero = SECTION_ANIMATION_PRESETS.hero;
      const selectors = hero.animations.map(anim => anim.elements);
      
      expect(selectors.some(sel => sel.includes('h1') || sel.includes('title'))).toBe(true);
      expect(selectors.some(sel => sel.includes('p') || sel.includes('subtitle'))).toBe(true);
      expect(selectors.some(sel => sel.includes('button'))).toBe(true);
    });

    it('should have background animations for parallax effects', () => {
      const hero = SECTION_ANIMATION_PRESETS.hero;
      expect(hero.backgroundAnimations).toBeTruthy();
      expect(hero.backgroundAnimations!.length).toBeGreaterThan(0);
      
      const bgAnim = hero.backgroundAnimations![0];
      expect(bgAnim.trigger).toBe('onProgress');
      expect(bgAnim.animation).toBe(JETON_ANIMATION_PRESETS.parallaxBackground);
    });
  });

  describe('Animation Configuration Functions', () => {
    it('should retrieve section animations correctly', () => {
      const heroConfig = getSectionAnimations('hero');
      expect(heroConfig).toBeTruthy();
      expect(heroConfig!.sectionId).toBe('hero');
      expect(heroConfig!.animations.length).toBeGreaterThan(0);
      
      const nonExistent = getSectionAnimations('nonexistent');
      expect(nonExistent).toBeNull();
    });

    it('should create custom section animations with defaults', () => {
      const customConfig = createCustomSectionAnimation(
        'test-section',
        'Test Section',
        'A test section for validation',
        [
          {
            elements: '.test-element',
            delay: 0.5
          },
          {
            elements: '.another-element',
            animation: JETON_ANIMATION_PRESETS.magneticScale
          }
        ]
      );

      expect(customConfig.sectionId).toBe('test-section');
      expect(customConfig.name).toBe('Test Section');
      expect(customConfig.animations).toHaveLength(2);
      
      // Check defaults are applied
      const firstAnim = customConfig.animations[0];
      expect(firstAnim.trigger).toBe('onEnter');
      expect(firstAnim.delay).toBe(0.5);
      expect(firstAnim.stagger).toBe(0.1);
      expect(firstAnim.duration).toBe(0.8);
      expect(firstAnim.threshold).toBe(0.2);
      
      // Check custom animation is preserved
      const secondAnim = customConfig.animations[1];
      expect(secondAnim.animation).toBe(JETON_ANIMATION_PRESETS.magneticScale);
    });
  });

  describe('Choreography Presets', () => {
    it('should calculate sequential delays correctly', () => {
      const sequential = CHOREOGRAPHY_PRESETS.sequential(0.2, 0.15);
      
      expect(sequential.calculateDelay(0)).toBe(0.2);
      expect(sequential.calculateDelay(1)).toBeCloseTo(0.35);
      expect(sequential.calculateDelay(2)).toBeCloseTo(0.5);
      expect(sequential.calculateDelay(3)).toBeCloseTo(0.65);
    });

    it('should calculate cascade delays with overlap', () => {
      const cascade = CHOREOGRAPHY_PRESETS.cascade(0.1, 0.05);
      
      expect(cascade.calculateDelay(0)).toBe(0.1);
      expect(cascade.calculateDelay(1)).toBeCloseTo(0.15);
      expect(cascade.calculateDelay(2)).toBeCloseTo(0.2);
    });

    it('should calculate center-out delays correctly', () => {
      const centerOut = CHOREOGRAPHY_PRESETS.centerOut(0.1, 0.3);
      
      // For 5 elements (0-4), center is at index 2
      expect(centerOut.calculateDelay(2, 5)).toBe(0.1); // Center
      expect(centerOut.calculateDelay(1, 5)).toBeCloseTo(0.25); // 1 step from center
      expect(centerOut.calculateDelay(3, 5)).toBeCloseTo(0.25); // 1 step from center
      expect(centerOut.calculateDelay(0, 5)).toBeCloseTo(0.4); // 2 steps from center
      expect(centerOut.calculateDelay(4, 5)).toBeCloseTo(0.4); // 2 steps from center
    });

    it('should generate random delays within bounds', () => {
      const random = CHOREOGRAPHY_PRESETS.random(0.1, 0.2);
      
      // Test multiple times to ensure randomness works
      for (let i = 0; i < 10; i++) {
        const delay = random.calculateDelay(i);
        expect(delay).toBeGreaterThanOrEqual(0.1);
        expect(delay).toBeLessThanOrEqual(0.3);
      }
    });
  });

  describe('Performance Presets', () => {
    it('should have all performance levels with proper structure', () => {
      const levels = ['high', 'medium', 'low'] as const;
      
      levels.forEach(level => {
        const preset = PERFORMANCE_PRESETS[level];
        expect(preset).toHaveProperty('enableBlur');
        expect(preset).toHaveProperty('enableTransforms');
        expect(preset).toHaveProperty('enableFilters');
        expect(preset).toHaveProperty('maxAnimations');
        expect(preset).toHaveProperty('staggerLimit');
        
        expect(typeof preset.enableBlur).toBe('boolean');
        expect(typeof preset.enableTransforms).toBe('boolean');
        expect(typeof preset.enableFilters).toBe('boolean');
        expect(typeof preset.maxAnimations).toBe('number');
        expect(typeof preset.staggerLimit).toBe('number');
      });
    });

    it('should have decreasing capabilities from high to low performance', () => {
      const { high, medium, low } = PERFORMANCE_PRESETS;
      
      // Animation limits should decrease
      expect(high.maxAnimations).toBeGreaterThan(medium.maxAnimations);
      expect(medium.maxAnimations).toBeGreaterThan(low.maxAnimations);
      
      // Stagger limits should increase (less frequent animations)
      expect(high.staggerLimit).toBeLessThan(medium.staggerLimit);
      expect(medium.staggerLimit).toBeLessThan(low.staggerLimit);
      
      // High performance should enable all features
      expect(high.enableBlur).toBe(true);
      expect(high.enableTransforms).toBe(true);
      expect(high.enableFilters).toBe(true);
      
      // Low performance should disable expensive features
      expect(low.enableBlur).toBe(false);
      expect(low.enableTransforms).toBe(false);
      expect(low.enableFilters).toBe(false);
    });

    it('should have reasonable performance thresholds', () => {
      Object.values(PERFORMANCE_PRESETS).forEach(preset => {
        expect(preset.maxAnimations).toBeGreaterThan(5);
        expect(preset.maxAnimations).toBeLessThan(50);
        expect(preset.staggerLimit).toBeGreaterThan(0);
        expect(preset.staggerLimit).toBeLessThan(1);
      });
    });
  });

  describe('Animation Timing Validation', () => {
    it('should have reasonable timing values across all sections', () => {
      Object.values(SECTION_ANIMATION_PRESETS).forEach(section => {
        section.animations.forEach(animation => {
          // Duration should be reasonable (0.1s to 3s)
          if (animation.duration) {
            expect(animation.duration).toBeGreaterThan(0.1);
            expect(animation.duration).toBeLessThan(3);
          }
          
          // Delay should be reasonable (0s to 2s)
          if (animation.delay !== undefined) {
            expect(animation.delay).toBeGreaterThanOrEqual(0);
            expect(animation.delay).toBeLessThan(2);
          }
          
          // Stagger should be reasonable (0s to 0.5s)
          if (animation.stagger) {
            expect(animation.stagger).toBeGreaterThan(0);
            expect(animation.stagger).toBeLessThan(0.5);
          }
          
          // Threshold should be between 0 and 1
          if (animation.threshold !== undefined) {
            expect(animation.threshold).toBeGreaterThanOrEqual(0);
            expect(animation.threshold).toBeLessThanOrEqual(1);
          }
        });
      });
    });

    it('should have valid trigger types', () => {
      const validTriggers = ['onEnter', 'onExit', 'onProgress'];
      
      Object.values(SECTION_ANIMATION_PRESETS).forEach(section => {
        section.animations.forEach(animation => {
          expect(validTriggers).toContain(animation.trigger);
        });
      });
    });
  });

  describe('Section-Specific Animation Features', () => {
    it('should have appropriate animations for services section', () => {
      const services = SECTION_ANIMATION_PRESETS.services;
      
      // Should have glowing entrance for title
      const titleAnim = services.animations.find(anim => 
        anim.elements.includes('title')
      );
      expect(titleAnim).toBeTruthy();
      expect(titleAnim!.animation).toBe(JETON_ANIMATION_PRESETS.glowingEntrance);
      
      // Should have staggered service items
      const serviceItemAnim = services.animations.find(anim =>
        anim.elements.includes('service-item')
      );
      expect(serviceItemAnim).toBeTruthy();
      expect(serviceItemAnim!.stagger).toBeGreaterThan(0);
    });

    it('should have form-specific animations for contact section', () => {
      const contact = SECTION_ANIMATION_PRESETS.contact;
      
      // Should have morphing entrance for form
      const formAnim = contact.animations.find(anim =>
        anim.elements.includes('form')
      );
      expect(formAnim).toBeTruthy();
      expect(formAnim!.animation).toBe(JETON_ANIMATION_PRESETS.morphingEntrance);
      
      // Should have field-level animations
      const fieldAnim = contact.animations.find(anim =>
        anim.elements.includes('input') || anim.elements.includes('textarea')
      );
      expect(fieldAnim).toBeTruthy();
      expect(fieldAnim!.stagger).toBeGreaterThan(0);
    });

    it('should have card-based animations for about section', () => {
      const about = SECTION_ANIMATION_PRESETS.about;
      
      const cardAnim = about.animations.find(anim =>
        anim.elements.includes('card')
      );
      expect(cardAnim).toBeTruthy();
      expect(cardAnim!.animation).toBe(JETON_ANIMATION_PRESETS.floatingCard);
    });
  });
});