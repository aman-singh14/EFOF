import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  AnimationTimer,
  AnimationSequenceBuilder,
  AnimationPerformanceMonitor,
  animationUtils,
  ADVANCED_ANIMATION_PRESETS,
  animationTimer,
  animationSequenceBuilder,
  performanceMonitor
} from '@/utils/animationUtils';
import { ANIMATION_PRESETS } from '@/components/AnimationOrchestrator';

// Mock performance API
Object.defineProperty(global, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
  },
});

// Mock requestAnimationFrame
Object.defineProperty(global, 'requestAnimationFrame', {
  writable: true,
  value: vi.fn((cb) => setTimeout(cb, 16)),
});

describe('AnimationTimer', () => {
  let timer: AnimationTimer;

  beforeEach(() => {
    timer = new AnimationTimer();
    vi.useFakeTimers();
  });

  afterEach(() => {
    timer.clearAll();
    vi.useRealTimers();
  });

  it('schedules and executes callbacks', () => {
    const callback = vi.fn();
    timer.schedule('test', callback, 1000);
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('clears specific timers', () => {
    const callback = vi.fn();
    timer.schedule('test', callback, 1000);
    timer.clear('test');
    
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('clears all timers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    
    timer.schedule('test1', callback1, 1000);
    timer.schedule('test2', callback2, 1000);
    timer.clearAll();
    
    vi.advanceTimersByTime(1000);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it('checks if timer exists', () => {
    const callback = vi.fn();
    timer.schedule('test', callback, 1000);
    
    expect(timer.has('test')).toBe(true);
    expect(timer.has('nonexistent')).toBe(false);
    
    timer.clear('test');
    expect(timer.has('test')).toBe(false);
  });

  it('replaces existing timers with same key', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    
    timer.schedule('test', callback1, 1000);
    timer.schedule('test', callback2, 500);
    
    vi.advanceTimersByTime(500);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledOnce();
    
    vi.advanceTimersByTime(500);
    expect(callback1).not.toHaveBeenCalled();
  });
});

describe('AnimationSequenceBuilder', () => {
  let builder: AnimationSequenceBuilder;

  beforeEach(() => {
    builder = new AnimationSequenceBuilder();
  });

  it('builds empty sequence', () => {
    const sequence = builder.build();
    expect(sequence).toEqual([]);
  });

  it('adds animations to sequence', () => {
    const sequence = builder
      .add('.test1', 'fade')
      .add('.test2', 'slideUp')
      .build();
    
    expect(sequence).toHaveLength(2);
    expect(sequence[0].elements).toBe('.test1');
    expect(sequence[0].animation).toBe(ANIMATION_PRESETS.fade);
    expect(sequence[1].elements).toBe('.test2');
    expect(sequence[1].animation).toBe(ANIMATION_PRESETS.slideUp);
  });

  it('adds custom animations', () => {
    const customAnimation = {
      trigger: 'onExit' as const,
      elements: '.custom',
      animation: ANIMATION_PRESETS.zoom,
      delay: 0.5,
    };
    
    const sequence = builder
      .addCustom(customAnimation)
      .build();
    
    expect(sequence).toHaveLength(1);
    expect(sequence[0]).toEqual(customAnimation);
  });

  it('applies delays correctly', () => {
    const sequence = builder
      .add('.test', 'fade')
      .delay(0.5)
      .build();
    
    expect(sequence[0].delay).toBe(0.5);
  });

  it('applies stagger correctly', () => {
    const sequence = builder
      .add('.test', 'fade')
      .stagger(0.2)
      .build();
    
    expect(sequence[0].stagger).toBe(0.2);
  });

  it('chains operations correctly', () => {
    const sequence = builder
      .add('.test1', 'fade', { delay: 0.1 })
      .delay(0.2)
      .stagger(0.15)
      .add('.test2', 'slideUp')
      .build();
    
    expect(sequence).toHaveLength(2);
    expect(sequence[0].delay).toBeCloseTo(0.3); // 0.1 + 0.2
    expect(sequence[0].stagger).toBe(0.15);
    expect(sequence[1].delay).toBe(0); // default
  });

  it('resets builder correctly', () => {
    builder.add('.test', 'fade');
    expect(builder.build()).toHaveLength(1);
    
    builder.reset();
    expect(builder.build()).toHaveLength(0);
  });
});

describe('ADVANCED_ANIMATION_PRESETS', () => {
  it('contains all expected advanced presets', () => {
    const expectedPresets = ['elasticEnter', 'morph', 'typewriter', 'glitch'];
    
    expectedPresets.forEach(preset => {
      expect(ADVANCED_ANIMATION_PRESETS[preset]).toBeDefined();
      expect(ADVANCED_ANIMATION_PRESETS[preset]).toHaveProperty('initial');
      expect(ADVANCED_ANIMATION_PRESETS[preset]).toHaveProperty('animate');
      expect(ADVANCED_ANIMATION_PRESETS[preset]).toHaveProperty('exit');
    });
  });

  it('has correct elasticEnter structure', () => {
    const preset = ADVANCED_ANIMATION_PRESETS.elasticEnter;
    expect(preset.initial).toEqual({ scale: 0, rotate: -180, opacity: 0 });
    expect(preset.exit).toEqual({ scale: 0, rotate: 180, opacity: 0 });
  });

  it('has correct typewriter structure', () => {
    const preset = ADVANCED_ANIMATION_PRESETS.typewriter;
    expect(preset.initial).toEqual({ width: 0, opacity: 0 });
    expect(preset.exit).toEqual({ width: 0, opacity: 0 });
  });
});

describe('animationUtils', () => {
  describe('calculateStaggerDelay', () => {
    it('calculates stagger delay correctly', () => {
      expect(animationUtils.calculateStaggerDelay(0, 0.1, 0.05)).toBe(0.1);
      expect(animationUtils.calculateStaggerDelay(1, 0.1, 0.05)).toBeCloseTo(0.15);
      expect(animationUtils.calculateStaggerDelay(2, 0.1, 0.05)).toBeCloseTo(0.2);
    });
  });

  describe('calculateParallaxOffset', () => {
    it('calculates vertical parallax offset', () => {
      const result = animationUtils.calculateParallaxOffset(0.5, 1, 'vertical');
      expect(result).toEqual({ x: 0, y: 0 });
      
      const result2 = animationUtils.calculateParallaxOffset(0.75, 1, 'vertical');
      expect(result2).toEqual({ x: 0, y: 25 });
    });

    it('calculates horizontal parallax offset', () => {
      const result = animationUtils.calculateParallaxOffset(0.25, 1, 'horizontal');
      expect(result).toEqual({ x: -25, y: 0 });
    });

    it('applies intensity correctly', () => {
      const result = animationUtils.calculateParallaxOffset(0.75, 2, 'vertical');
      expect(result).toEqual({ x: 0, y: 50 });
    });
  });

  describe('calculateScrollScale', () => {
    it('calculates scale within range', () => {
      expect(animationUtils.calculateScrollScale(0)).toBe(0.8);
      expect(animationUtils.calculateScrollScale(0.5)).toBe(1);
      expect(animationUtils.calculateScrollScale(1)).toBe(1.2);
    });

    it('uses custom min/max scale', () => {
      expect(animationUtils.calculateScrollScale(0, 0.5, 1.5)).toBe(0.5);
      expect(animationUtils.calculateScrollScale(1, 0.5, 1.5)).toBe(1.5);
    });
  });

  describe('calculateScrollRotation', () => {
    it('calculates rotation correctly', () => {
      expect(animationUtils.calculateScrollRotation(0.5)).toBe(0);
      expect(animationUtils.calculateScrollRotation(0.75)).toBe(7.5);
      expect(animationUtils.calculateScrollRotation(0.25)).toBe(-7.5);
    });

    it('uses custom max rotation', () => {
      expect(animationUtils.calculateScrollRotation(0.75, 30)).toBe(15);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('throttles function calls', () => {
      const fn = vi.fn();
      const throttled = animationUtils.throttle(fn, 100);
      
      throttled();
      throttled();
      throttled();
      
      expect(fn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(100);
      throttled();
      
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('debounces function calls', () => {
      const fn = vi.fn();
      const debounced = animationUtils.debounce(fn, 100);
      
      debounced();
      debounced();
      debounced();
      
      expect(fn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});

describe('AnimationPerformanceMonitor', () => {
  let monitor: AnimationPerformanceMonitor;

  beforeEach(() => {
    monitor = new AnimationPerformanceMonitor();
    vi.useFakeTimers();
  });

  afterEach(() => {
    monitor.stop();
    vi.useRealTimers();
  });

  it('starts and stops monitoring', () => {
    expect(monitor.getFPS()).toBe(60); // default
    
    monitor.start();
    monitor.stop();
    
    expect(monitor.getFPS()).toBeGreaterThanOrEqual(0);
  });

  it('provides performance recommendations', () => {
    // Mock high performance
    monitor['fps'] = 58;
    expect(monitor.getPerformanceRecommendation()).toBe('high');
    expect(monitor.isPerformanceGood()).toBe(true);
    
    // Mock medium performance
    monitor['fps'] = 50;
    expect(monitor.getPerformanceRecommendation()).toBe('medium');
    expect(monitor.isPerformanceGood()).toBe(true);
    
    // Mock low performance
    monitor['fps'] = 40;
    expect(monitor.getPerformanceRecommendation()).toBe('low');
    expect(monitor.isPerformanceGood()).toBe(false);
  });
});

describe('Singleton instances', () => {
  it('exports singleton instances', () => {
    expect(animationTimer).toBeInstanceOf(AnimationTimer);
    expect(animationSequenceBuilder).toBeInstanceOf(AnimationSequenceBuilder);
    expect(performanceMonitor).toBeInstanceOf(AnimationPerformanceMonitor);
  });

  it('maintains state across imports', () => {
    animationSequenceBuilder.add('.test', 'fade');
    expect(animationSequenceBuilder.build()).toHaveLength(1);
  });
});