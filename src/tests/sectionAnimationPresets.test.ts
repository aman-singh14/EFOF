import { describe, it, expect, beforeEach } from 'vitest';
import {
  JETON_ANIMATION_PRESETS,
  SECTION_ANIMATION_PRESETS,
  getSectionAnimations,
  createCustomSectionAnimation,
  CHOREOGRAPHY_PRESETS,
  PERFORMANCE_PRESETS,
  HERO_SECTION_ANIMATIONS,
  ABOUT_SECTION_ANIMATIONS,
  SERVICES_SECTION_ANIMATIONS,
  CONTACT_SECTION_ANIMATIONS
} from '@/utils/sectionAnimationPresets';

describe('Jeton Animation Presets', () => {
  it('should have all required animation presets', () => {
    const expectedPresets = [
      'elegantFade',
      'sophisticatedSlideUp',
      'magneticScale',
      'parallaxBackground',
      'textReveal',
      'floatingCard',
      'morphingEntrance',
      'lineReveal',
      'glowingEntrance'
    ];

    expectedPresets.forEach(preset => {
      expect(JETON_ANIMATION_PRESETS).toHaveProperty(preset);
    });
  });

  it('should have proper animation structure for elegantFade', () => {
    const elegantFade = JETON_ANIMATION_PRESETS.elegantFade;
    
    expect(elegantFade).toHaveProperty('initial');
    expect(elegantFade).toHaveProperty('animate');
    expect(elegantFade).toHaveProperty('exit');
    
    expect(elegantFade.initial).toMatchObject({
      opacity: 0,
      scale: 0.95,
      filter: 'blur(2px)'
    });
    
    expect(elegantFade.animate).toHaveProperty('opacity', 1);
    expect(elegantFade.animate).toHaveProperty('scale', 1);
    expect(elegantFade.animate).toHaveProperty('filter', 'blur(0px)');
    expect(elegantFade.animate).toHaveProperty('transition');
  });

  it('should have spring animation for sophisticatedSlideUp', () => {
    const slideUp = JETON_ANIMATION_PRESETS.sophisticatedSlideUp;
    
    expect(slideUp.initial).toMatchObject({
      y: 120,
      opacity: 0,
      rotateX: 15
    });
    
    expect(slideUp.animate).toHaveProperty('y', 0);
    expect(slideUp.animate).toHaveProperty('opacity', 1);
    expect(slideUp.animate).toHaveProperty('rotateX', 0);
    expect(slideUp.animate.transition).toHaveProperty('type', 'spring');
  });

  it('should have complex transition for textReveal', () => {
    const textReveal = JETON_ANIMATION_PRESETS.textReveal;
    
    expect(textReveal.initial).toHaveProperty('clipPath', 'inset(100% 0 0 0)');
    expect(textReveal.animate).toHaveProperty('clipPath', 'inset(0% 0 0 0)');
    expect(textReveal.animate.transition).toHaveProperty('duration', 1.0);
    expect(textReveal.animate.transition).toHaveProperty('clipPath');
  });

  it('should have morphing properties for morphingEntrance', () => {
    const morphing = JETON_ANIMATION_PRESETS.morphingEntrance;
    
    expect(morphing.initial).toMatchObject({
      scaleX: 0.1,
      scaleY: 1.5,
      borderRadius: '50%'
    });
    
    expect(morphing.animate).toMatchObject({
      scaleX: 1,
      scaleY: 1,
      borderRadius: '0%'
    });
  });
});

describe('Section Animation Configurations', () => {
  it('should have all required section configurations', () => {
    const expectedSections = ['hero', 'about', 'services', 'contact'];
    
    expectedSections.forEach(section => {
      expect(SECTION_ANIMATION_PRESETS).toHaveProperty(section);
    });
  });

  it('should have proper structure for hero section', () => {
    const hero = HERO_SECTION_ANIMATIONS;
    
    expect(hero).toHaveProperty('sectionId', 'hero');
    expect(hero).toHaveProperty('name', 'Hero Section');
    expect(hero).toHaveProperty('description');
    expect(hero).toHaveProperty('animations');
    expect(hero).toHaveProperty('backgroundAnimations');
    expect(hero).toHaveProperty('exitAnimations');
    
    expect(Array.isArray(hero.animations)).toBe(true);
    expect(hero.animations.length).toBeGreaterThan(0);
  });

  it('should have staggered animations for hero section', () => {
    const hero = HERO_SECTION_ANIMATIONS;
    const delays = hero.animations.map(anim => anim.delay || 0);
    
    // Check that delays are increasing (staggered)
    for (let i = 1; i < delays.length; i++) {
      expect(delays[i]).toBeGreaterThanOrEqual(delays[i - 1]);
    }
  });

  it('should have proper element selectors', () => {
    const hero = HERO_SECTION_ANIMATIONS;
    
    hero.animations.forEach(animation => {
      expect(animation.elements).toBeTruthy();
      expect(typeof animation.elements).toBe('string');
      expect(animation.elements.length).toBeGreaterThan(0);
    });
  });

  it('should have valid animation presets referenced', () => {
    const hero = HERO_SECTION_ANIMATIONS;
    
    hero.animations.forEach(animation => {
      expect(animation.animation).toBeTruthy();
      expect(animation.animation).toHaveProperty('initial');
      expect(animation.animation).toHaveProperty('animate');
    });
  });
});

describe('Animation Configuration Functions', () => {
  it('should get section animations correctly', () => {
    const heroConfig = getSectionAnimations('hero');
    expect(heroConfig).toBeTruthy();
    expect(heroConfig?.sectionId).toBe('hero');
    
    const nonExistent = getSectionAnimations('nonexistent');
    expect(nonExistent).toBeNull();
  });

  it('should create custom section animation', () => {
    const customConfig = createCustomSectionAnimation(
      'custom',
      'Custom Section',
      'Test description',
      [
        {
          elements: '.test-element',
          animation: JETON_ANIMATION_PRESETS.elegantFade,
          delay: 0.5
        }
      ]
    );
    
    expect(customConfig.sectionId).toBe('custom');
    expect(customConfig.name).toBe('Custom Section');
    expect(customConfig.description).toBe('Test description');
    expect(customConfig.animations).toHaveLength(1);
    expect(customConfig.animations[0].elements).toBe('.test-element');
    expect(customConfig.animations[0].delay).toBe(0.5);
  });

  it('should apply default values in custom animation', () => {
    const customConfig = createCustomSectionAnimation(
      'test',
      'Test',
      'Test',
      [{ elements: '.test' }]
    );
    
    const animation = customConfig.animations[0];
    expect(animation.trigger).toBe('onEnter');
    expect(animation.delay).toBe(0);
    expect(animation.stagger).toBe(0.1);
    expect(animation.duration).toBe(0.8);
    expect(animation.threshold).toBe(0.2);
  });
});

describe('Choreography Presets', () => {
  it('should calculate sequential delays correctly', () => {
    const sequential = CHOREOGRAPHY_PRESETS.sequential(0.5, 0.2);
    
    expect(sequential.calculateDelay(0)).toBe(0.5);
    expect(sequential.calculateDelay(1)).toBe(0.7);
    expect(sequential.calculateDelay(2)).toBe(0.9);
  });

  it('should calculate cascade delays correctly', () => {
    const cascade = CHOREOGRAPHY_PRESETS.cascade(0.3, 0.1);
    
    expect(cascade.calculateDelay(0)).toBe(0.3);
    expect(cascade.calculateDelay(1)).toBe(0.4);
    expect(cascade.calculateDelay(2)).toBe(0.5);
  });

  it('should calculate center-out delays correctly', () => {
    const centerOut = CHOREOGRAPHY_PRESETS.centerOut(0.2, 0.4);
    
    // For 5 elements (indices 0-4), center is at index 2
    expect(centerOut.calculateDelay(2, 5)).toBe(0.2); // Center element
    expect(centerOut.calculateDelay(1, 5)).toBeCloseTo(0.4); // One step from center
    expect(centerOut.calculateDelay(3, 5)).toBeCloseTo(0.4); // One step from center
    expect(centerOut.calculateDelay(0, 5)).toBeCloseTo(0.6); // Two steps from center
    expect(centerOut.calculateDelay(4, 5)).toBeCloseTo(0.6); // Two steps from center
  });

  it('should calculate random delays within range', () => {
    const random = CHOREOGRAPHY_PRESETS.random(0.1, 0.3);
    
    // Test multiple times to ensure randomness
    for (let i = 0; i < 10; i++) {
      const delay = random.calculateDelay(0);
      expect(delay).toBeGreaterThanOrEqual(0.1);
      expect(delay).toBeLessThanOrEqual(0.4);
    }
  });
});

describe('Performance Presets', () => {
  it('should have all performance levels', () => {
    expect(PERFORMANCE_PRESETS).toHaveProperty('high');
    expect(PERFORMANCE_PRESETS).toHaveProperty('medium');
    expect(PERFORMANCE_PRESETS).toHaveProperty('low');
  });

  it('should have decreasing capabilities from high to low', () => {
    const { high, medium, low } = PERFORMANCE_PRESETS;
    
    // Animation limits should decrease
    expect(high.maxAnimations).toBeGreaterThan(medium.maxAnimations);
    expect(medium.maxAnimations).toBeGreaterThan(low.maxAnimations);
    
    // Stagger limits should increase (less frequent)
    expect(high.staggerLimit).toBeLessThan(medium.staggerLimit);
    expect(medium.staggerLimit).toBeLessThan(low.staggerLimit);
    
    // High performance should enable more features
    expect(high.enableBlur).toBe(true);
    expect(high.enableTransforms).toBe(true);
    expect(high.enableFilters).toBe(true);
    
    // Low performance should disable expensive features
    expect(low.enableBlur).toBe(false);
    expect(low.enableTransforms).toBe(false);
    expect(low.enableFilters).toBe(false);
  });

  it('should have consistent property structure', () => {
    Object.values(PERFORMANCE_PRESETS).forEach(preset => {
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
});

describe('Specific Section Configurations', () => {
  describe('Hero Section', () => {
    it('should have proper animation sequence', () => {
      const hero = HERO_SECTION_ANIMATIONS;
      
      // Should target common hero elements
      const selectors = hero.animations.map(anim => anim.elements);
      expect(selectors.some(sel => sel.includes('h1') || sel.includes('hero-title'))).toBe(true);
      expect(selectors.some(sel => sel.includes('p') || sel.includes('subtitle'))).toBe(true);
      expect(selectors.some(sel => sel.includes('button'))).toBe(true);
    });

    it('should have background animations', () => {
      const hero = HERO_SECTION_ANIMATIONS;
      expect(hero.backgroundAnimations).toBeTruthy();
      expect(hero.backgroundAnimations!.length).toBeGreaterThan(0);
      
      const bgAnim = hero.backgroundAnimations![0];
      expect(bgAnim.trigger).toBe('onProgress');
    });
  });

  describe('About Section', () => {
    it('should have card-based animations', () => {
      const about = ABOUT_SECTION_ANIMATIONS;
      
      const cardAnimation = about.animations.find(anim => 
        anim.elements.includes('card')
      );
      expect(cardAnimation).toBeTruthy();
      expect(cardAnimation?.animation).toBe(JETON_ANIMATION_PRESETS.floatingCard);
    });
  });

  describe('Services Section', () => {
    it('should have glowing entrance for title', () => {
      const services = SERVICES_SECTION_ANIMATIONS;
      
      const titleAnimation = services.animations.find(anim =>
        anim.elements.includes('title')
      );
      expect(titleAnimation).toBeTruthy();
      expect(titleAnimation?.animation).toBe(JETON_ANIMATION_PRESETS.glowingEntrance);
    });

    it('should have staggered service items', () => {
      const services = SERVICES_SECTION_ANIMATIONS;
      
      const serviceItemAnimation = services.animations.find(anim =>
        anim.elements.includes('service-item')
      );
      expect(serviceItemAnimation).toBeTruthy();
      expect(serviceItemAnimation?.stagger).toBeTruthy();
      expect(serviceItemAnimation!.stagger!).toBeGreaterThan(0);
    });
  });

  describe('Contact Section', () => {
    it('should have form-specific animations', () => {
      const contact = CONTACT_SECTION_ANIMATIONS;
      
      const formAnimation = contact.animations.find(anim =>
        anim.elements.includes('form')
      );
      expect(formAnimation).toBeTruthy();
      expect(formAnimation?.animation).toBe(JETON_ANIMATION_PRESETS.morphingEntrance);
    });

    it('should have field-level animations', () => {
      const contact = CONTACT_SECTION_ANIMATIONS;
      
      const fieldAnimation = contact.animations.find(anim =>
        anim.elements.includes('input') || anim.elements.includes('textarea')
      );
      expect(fieldAnimation).toBeTruthy();
      expect(fieldAnimation?.stagger).toBeTruthy();
    });
  });
});

describe('Animation Timing and Coordination', () => {
  it('should have reasonable timing values', () => {
    Object.values(SECTION_ANIMATION_PRESETS).forEach(section => {
      section.animations.forEach(animation => {
        // Duration should be reasonable (0.1s to 3s)
        if (animation.duration) {
          expect(animation.duration).toBeGreaterThan(0.1);
          expect(animation.duration).toBeLessThan(3);
        }
        
        // Delay should be reasonable (0s to 2s)
        if (animation.delay) {
          expect(animation.delay).toBeGreaterThanOrEqual(0);
          expect(animation.delay).toBeLessThan(2);
        }
        
        // Stagger should be reasonable (0s to 0.5s)
        if (animation.stagger) {
          expect(animation.stagger).toBeGreaterThan(0);
          expect(animation.stagger).toBeLessThan(0.5);
        }
        
        // Threshold should be between 0 and 1
        if (animation.threshold) {
          expect(animation.threshold).toBeGreaterThanOrEqual(0);
          expect(animation.threshold).toBeLessThanOrEqual(1);
        }
      });
    });
  });

  it('should have proper trigger types', () => {
    const validTriggers = ['onEnter', 'onExit', 'onProgress'];
    
    Object.values(SECTION_ANIMATION_PRESETS).forEach(section => {
      section.animations.forEach(animation => {
        expect(validTriggers).toContain(animation.trigger);
      });
    });
  });
});