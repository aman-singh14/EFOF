import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import AnimationOrchestrator, { 
  ANIMATION_PRESETS, 
  createAnimationConfig,
  ANIMATION_SEQUENCES,
  EASING_PRESETS
} from '@/components/AnimationOrchestrator';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
}));

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn(() => ({
    ref: vi.fn(),
    inView: true,
  })),
}));

// Mock DOM methods
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: vi.fn((cb) => setTimeout(cb, 16)),
});

describe('AnimationOrchestrator', () => {
  const mockAnimations = [
    {
      trigger: 'onEnter' as const,
      elements: '.test-element',
      animation: ANIMATION_PRESETS.fade,
      delay: 0.1,
      stagger: 0.05,
      duration: 0.8,
    },
    {
      trigger: 'onExit' as const,
      elements: '.exit-element',
      animation: ANIMATION_PRESETS.slideUp,
      delay: 0,
      stagger: 0.1,
      duration: 0.6,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <AnimationOrchestrator
        animations={mockAnimations}
        sectionId="test-section"
      >
        <div>Test content</div>
      </AnimationOrchestrator>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct data attributes', () => {
    const { container } = render(
      <AnimationOrchestrator
        animations={mockAnimations}
        sectionId="test-section"
        className="custom-class"
      >
        <div>Test content</div>
      </AnimationOrchestrator>
    );

    const orchestrator = container.querySelector('[data-animation-orchestrator]');
    expect(orchestrator).toBeInTheDocument();
    expect(orchestrator).toHaveAttribute('data-section-id', 'test-section');
    expect(orchestrator).toHaveClass('custom-class');
  });

  it('handles empty animations array', () => {
    render(
      <AnimationOrchestrator
        animations={[]}
        sectionId="empty-section"
      >
        <div>Empty animations</div>
      </AnimationOrchestrator>
    );

    expect(screen.getByText('Empty animations')).toBeInTheDocument();
  });

  it('processes scroll progress for parallax animations', async () => {
    const parallaxAnimation = {
      trigger: 'onProgress' as const,
      elements: '.parallax-element',
      animation: ANIMATION_PRESETS.parallax,
    };

    render(
      <AnimationOrchestrator
        animations={[parallaxAnimation]}
        sectionId="parallax-section"
        scrollProgress={0.5}
      >
        <div className="parallax-element">Parallax content</div>
      </AnimationOrchestrator>
    );

    await waitFor(() => {
      expect(screen.getByText('Parallax content')).toBeInTheDocument();
    });
  });

  it('handles different scroll progress values', () => {
    const { rerender } = render(
      <AnimationOrchestrator
        animations={[{
          trigger: 'onProgress' as const,
          elements: '.progress-element',
          animation: ANIMATION_PRESETS.parallax,
        }]}
        sectionId="progress-section"
        scrollProgress={0}
      >
        <div className="progress-element">Progress content</div>
      </AnimationOrchestrator>
    );

    // Test different scroll progress values
    rerender(
      <AnimationOrchestrator
        animations={[{
          trigger: 'onProgress' as const,
          elements: '.progress-element',
          animation: ANIMATION_PRESETS.parallax,
        }]}
        sectionId="progress-section"
        scrollProgress={0.25}
      >
        <div className="progress-element">Progress content</div>
      </AnimationOrchestrator>
    );

    rerender(
      <AnimationOrchestrator
        animations={[{
          trigger: 'onProgress' as const,
          elements: '.progress-element',
          animation: ANIMATION_PRESETS.parallax,
        }]}
        sectionId="progress-section"
        scrollProgress={1}
      >
        <div className="progress-element">Progress content</div>
      </AnimationOrchestrator>
    );

    expect(screen.getByText('Progress content')).toBeInTheDocument();
  });
});

describe('ANIMATION_PRESETS', () => {
  it('contains all expected animation presets', () => {
    const expectedPresets = [
      'fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight',
      'zoom', 'zoomOut', 'parallax', 'rotate', 'blur'
    ];

    expectedPresets.forEach(preset => {
      expect(ANIMATION_PRESETS[preset]).toBeDefined();
      expect(ANIMATION_PRESETS[preset]).toHaveProperty('initial');
      expect(ANIMATION_PRESETS[preset]).toHaveProperty('animate');
      expect(ANIMATION_PRESETS[preset]).toHaveProperty('exit');
    });
  });

  it('has correct fade animation structure', () => {
    const fade = ANIMATION_PRESETS.fade;
    expect(fade.initial).toEqual({ opacity: 0 });
    expect(fade.animate).toEqual({ opacity: 1 });
    expect(fade.exit).toEqual({ opacity: 0 });
  });

  it('has correct slideUp animation structure', () => {
    const slideUp = ANIMATION_PRESETS.slideUp;
    expect(slideUp.initial).toEqual({ y: 100, opacity: 0 });
    expect(slideUp.animate).toEqual({ y: 0, opacity: 1 });
    expect(slideUp.exit).toEqual({ y: -100, opacity: 0 });
  });

  it('has correct zoom animation structure', () => {
    const zoom = ANIMATION_PRESETS.zoom;
    expect(zoom.initial).toEqual({ scale: 0.8, opacity: 0 });
    expect(zoom.animate).toEqual({ scale: 1, opacity: 1 });
    expect(zoom.exit).toEqual({ scale: 1.2, opacity: 0 });
  });

  it('has correct parallax animation structure', () => {
    const parallax = ANIMATION_PRESETS.parallax;
    expect(parallax.initial).toEqual({ y: 0, scale: 1 });
    expect(parallax.animate).toEqual({ y: 0, scale: 1 });
    expect(parallax.exit).toEqual({ y: 0, scale: 1 });
  });
});

describe('EASING_PRESETS', () => {
  it('contains all expected easing presets', () => {
    const expectedEasings = ['smooth', 'bounce', 'elastic', 'sharp', 'gentle'];
    
    expectedEasings.forEach(easing => {
      expect(EASING_PRESETS[easing as keyof typeof EASING_PRESETS]).toBeDefined();
      expect(Array.isArray(EASING_PRESETS[easing as keyof typeof EASING_PRESETS])).toBe(true);
      expect(EASING_PRESETS[easing as keyof typeof EASING_PRESETS]).toHaveLength(4);
    });
  });

  it('has correct smooth easing values', () => {
    expect(EASING_PRESETS.smooth).toEqual([0.16, 1, 0.3, 1]);
  });

  it('has correct bounce easing values', () => {
    expect(EASING_PRESETS.bounce).toEqual([0.68, -0.55, 0.265, 1.55]);
  });
});

describe('createAnimationConfig', () => {
  it('creates animation config with default values', () => {
    const config = createAnimationConfig('.test', 'fade');
    
    expect(config).toEqual({
      trigger: 'onEnter',
      elements: '.test',
      animation: ANIMATION_PRESETS.fade,
      delay: 0,
      stagger: 0.1,
      duration: 0.8,
      threshold: 0.2,
    });
  });

  it('creates animation config with custom options', () => {
    const config = createAnimationConfig('.custom', 'slideUp', {
      trigger: 'onExit',
      delay: 0.5,
      stagger: 0.2,
      duration: 1.2,
      threshold: 0.5,
    });
    
    expect(config).toEqual({
      trigger: 'onExit',
      elements: '.custom',
      animation: ANIMATION_PRESETS.slideUp,
      delay: 0.5,
      stagger: 0.2,
      duration: 1.2,
      threshold: 0.5,
    });
  });

  it('handles all animation presets', () => {
    Object.keys(ANIMATION_PRESETS).forEach(preset => {
      const config = createAnimationConfig('.test', preset as keyof typeof ANIMATION_PRESETS);
      expect(config.animation).toBe(ANIMATION_PRESETS[preset as keyof typeof ANIMATION_PRESETS]);
    });
  });
});

describe('ANIMATION_SEQUENCES', () => {
  it('contains all expected animation sequences', () => {
    const expectedSequences = [
      'heroSection', 'cardGrid', 'textReveal', 'imageParallax', 'fadeInSequence'
    ];
    
    expectedSequences.forEach(sequence => {
      expect(ANIMATION_SEQUENCES[sequence as keyof typeof ANIMATION_SEQUENCES]).toBeDefined();
      expect(Array.isArray(ANIMATION_SEQUENCES[sequence as keyof typeof ANIMATION_SEQUENCES])).toBe(true);
    });
  });

  it('has correct heroSection sequence structure', () => {
    const heroSection = ANIMATION_SEQUENCES.heroSection;
    expect(heroSection).toHaveLength(3);
    
    expect(heroSection[0].elements).toBe('h1');
    expect(heroSection[0].animation).toBe(ANIMATION_PRESETS.slideUp);
    expect(heroSection[0].delay).toBe(0.2);
    
    expect(heroSection[1].elements).toBe('p');
    expect(heroSection[1].animation).toBe(ANIMATION_PRESETS.fade);
    expect(heroSection[1].delay).toBe(0.4);
    
    expect(heroSection[2].elements).toBe('button');
    expect(heroSection[2].animation).toBe(ANIMATION_PRESETS.slideUp);
    expect(heroSection[2].delay).toBe(0.6);
  });

  it('has correct cardGrid sequence structure', () => {
    const cardGrid = ANIMATION_SEQUENCES.cardGrid;
    expect(cardGrid).toHaveLength(1);
    expect(cardGrid[0].elements).toBe('.card');
    expect(cardGrid[0].animation).toBe(ANIMATION_PRESETS.slideUp);
    expect(cardGrid[0].stagger).toBe(0.15);
  });

  it('has correct imageParallax sequence structure', () => {
    const imageParallax = ANIMATION_SEQUENCES.imageParallax;
    expect(imageParallax).toHaveLength(1);
    expect(imageParallax[0].elements).toBe('.parallax-bg');
    expect(imageParallax[0].animation).toBe(ANIMATION_PRESETS.parallax);
    expect(imageParallax[0].trigger).toBe('onProgress');
  });
});

describe('Animation Timing and Coordination', () => {
  it('handles stagger delays correctly', () => {
    const config = createAnimationConfig('.stagger-test', 'fade', {
      stagger: 0.2
    });
    
    expect(config.stagger).toBe(0.2);
  });

  it('handles entrance and exit triggers', () => {
    const entranceConfig = createAnimationConfig('.entrance', 'slideUp', {
      trigger: 'onEnter'
    });
    
    const exitConfig = createAnimationConfig('.exit', 'slideDown', {
      trigger: 'onExit'
    });
    
    expect(entranceConfig.trigger).toBe('onEnter');
    expect(exitConfig.trigger).toBe('onExit');
  });

  it('handles progress-based animations', () => {
    const progressConfig = createAnimationConfig('.progress', 'parallax', {
      trigger: 'onProgress'
    });
    
    expect(progressConfig.trigger).toBe('onProgress');
    expect(progressConfig.animation).toBe(ANIMATION_PRESETS.parallax);
  });
});

describe('Integration with Intersection Observer', () => {
  it('renders with intersection observer integration', () => {
    const testAnimations = [
      {
        trigger: 'onEnter' as const,
        elements: '.test-element',
        animation: ANIMATION_PRESETS.fade,
      }
    ];
    
    render(
      <AnimationOrchestrator
        animations={testAnimations}
        sectionId="observer-test"
      >
        <div className="test-element">Observer test</div>
      </AnimationOrchestrator>
    );
    
    expect(screen.getByText('Observer test')).toBeInTheDocument();
  });
});