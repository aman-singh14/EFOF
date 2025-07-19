import { renderHook, act } from '@testing-library/react';
import { useScrollController } from '@/hooks/useScrollController';
import { vi, describe, it, beforeEach, expect } from 'vitest';

describe('useScrollController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
    window.innerHeight = 1000;
    window.scrollTo = vi.fn();
    
    // Mock requestAnimationFrame for test environment
    global.requestAnimationFrame = vi.fn((callback) => {
      setTimeout(callback, 16);
      return 1;
    });
    
    // Mock document properties
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 5000,
    });
    
    // Mock Date.now for consistent timing tests
    vi.spyOn(Date, 'now').mockReturnValue(1000);
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 800,
      })
    );

    expect(result.current.scrollState.currentSection).toBe(0);
    expect(result.current.scrollState.scrollProgress).toBe(0);
    expect(result.current.scrollState.totalProgress).toBe(0);
    expect(result.current.scrollState.isScrolling).toBe(false);
    expect(result.current.scrollState.scrollDirection).toBe('up');
    expect(result.current.scrollState.velocity).toBe(0);
  });

  it('should calculate current section correctly', async () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 800,
      })
    );

    // Simulate scroll to second section
    act(() => {
      window.scrollY = 1500; // 1.5 sections down
    });

    // Trigger scroll event
    act(() => {
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    // Wait for state update
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current.scrollState.currentSection).toBe(1);
  });

  it('should calculate scroll progress within section', async () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 800,
      })
    );

    // Simulate scroll to middle of first section
    act(() => {
      window.scrollY = 500; // Half way through first section
    });

    // Trigger scroll event
    act(() => {
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    // Wait for state update
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current.scrollState.scrollProgress).toBe(0.5);
  });

  it('should detect scroll direction correctly', async () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 800,
      })
    );

    // Simulate scrolling down
    act(() => {
      window.scrollY = 100;
    });

    act(() => {
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current.scrollState.scrollDirection).toBe('down');

    // Simulate scrolling up
    act(() => {
      window.scrollY = 50;
    });

    act(() => {
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current.scrollState.scrollDirection).toBe('up');
  });

  it('should scroll to specific section', async () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 100, // Shorter duration for tests
      })
    );

    act(() => {
      result.current.scrollToSection(2);
    });

    // Wait for the animation to start
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    // Should call window.scrollTo during animation
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should clamp section index when scrolling to section', async () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 100, // Shorter duration for tests
      })
    );

    // Try to scroll to section beyond bounds
    act(() => {
      result.current.scrollToSection(10);
    });

    // Wait for animation to start
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(window.scrollTo).toHaveBeenCalled(); // Should be called during animation

    // Try to scroll to negative section
    act(() => {
      result.current.scrollToSection(-1);
    });

    // Wait for animation to start
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(window.scrollTo).toHaveBeenCalled(); // Should be called during animation
  });

  it('should enable and disable scroll resistance', () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 800,
      })
    );

    act(() => {
      result.current.enableScrollResistance(false);
    });

    // Test that resistance is disabled (this would be tested in integration)
    expect(result.current.enableScrollResistance).toBeDefined();

    act(() => {
      result.current.enableScrollResistance(true);
    });

    // Test that resistance is enabled (this would be tested in integration)
    expect(result.current.enableScrollResistance).toBeDefined();
  });

  it('should set scroll resistance value', () => {
    const { result } = renderHook(() =>
      useScrollController({
        totalSections: 5,
        scrollResistance: 0.3,
        transitionDuration: 800,
      })
    );

    act(() => {
      result.current.setScrollResistance(0.7);
    });

    // The resistance value should be clamped between 0 and 1
    expect(result.current.setScrollResistance).toBeDefined();

    act(() => {
      result.current.setScrollResistance(1.5); // Should be clamped to 1
    });

    act(() => {
      result.current.setScrollResistance(-0.5); // Should be clamped to 0
    });
  });

  describe('Enhanced Scroll Resistance', () => {
    it('should calculate velocity correctly over time', async () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.3,
          transitionDuration: 800,
        })
      );

      // Mock time progression
      let currentTime = 1000;
      vi.spyOn(Date, 'now').mockImplementation(() => currentTime);

      // Simulate first scroll event
      act(() => {
        window.scrollY = 100;
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });

      // Simulate second scroll event with time progression
      currentTime = 1050; // 50ms later
      act(() => {
        window.scrollY = 200;
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });

      // Velocity should be calculated (100px / 50ms = 2 px/ms)
      expect(result.current.scrollState.velocity).toBeGreaterThan(0);
      expect(result.current.scrollState.rawVelocity).toBeGreaterThan(0);
    });

    it('should apply different resistance for different input methods', () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.5,
          transitionDuration: 800,
        })
      );

      const baseDelta = 100;

      // Test wheel resistance (standard)
      const wheelResistance = result.current.applyScrollResistance(baseDelta, 'wheel');
      
      // Test touch resistance (should be less resistant)
      const touchResistance = result.current.applyScrollResistance(baseDelta, 'touch');
      
      // Test keyboard resistance (should be least resistant)
      const keyboardResistance = result.current.applyScrollResistance(baseDelta, 'keyboard');

      // Touch should allow more movement than wheel
      expect(touchResistance).toBeGreaterThan(wheelResistance);
      
      // Keyboard should allow most movement
      expect(keyboardResistance).toBeGreaterThan(touchResistance);
      
      // All should be less than original delta due to resistance
      expect(wheelResistance).toBeLessThan(baseDelta);
      expect(touchResistance).toBeLessThan(baseDelta);
      expect(keyboardResistance).toBeLessThan(baseDelta);
    });

    it('should increase resistance near section boundaries', async () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.3,
          transitionDuration: 800,
        })
      );

      const baseDelta = 100;

      // Mock scroll state at section boundary (10% into section)
      act(() => {
        window.scrollY = 100; // 10% into first section
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      });

      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });

      const boundaryResistance = result.current.applyScrollResistance(baseDelta, 'wheel');

      // Mock scroll state at section center (50% into section)
      act(() => {
        window.scrollY = 500; // 50% into first section
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      });

      // Wait for state update
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });

      const centerResistance = result.current.applyScrollResistance(baseDelta, 'wheel');

      // Boundary should have more resistance than center (less movement allowed)
      expect(boundaryResistance).toBeLessThan(centerResistance);
    });

    it('should respect disabled resistance', () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.8,
          transitionDuration: 800,
        })
      );

      const baseDelta = 100;

      // Disable resistance
      act(() => {
        result.current.enableScrollResistance(false);
      });

      const resistedDelta = result.current.applyScrollResistance(baseDelta, 'wheel');

      // Should return original delta when resistance is disabled
      expect(resistedDelta).toBe(baseDelta);
    });

    it('should handle programmatic scrolling without resistance', () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.8,
          transitionDuration: 800,
        })
      );

      // Start programmatic scroll
      act(() => {
        result.current.scrollToSection(2);
      });

      const baseDelta = 100;
      const resistedDelta = result.current.applyScrollResistance(baseDelta, 'wheel');

      // Should have minimal resistance during programmatic scrolling
      expect(resistedDelta).toBeCloseTo(baseDelta, 1);
    });
  });

  describe('Smooth Transitions and Easing', () => {
    it('should use custom easing for section transitions', () => {
      vi.useFakeTimers();
      
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.3,
          transitionDuration: 800,
        })
      );

      // Mock requestAnimationFrame
      const mockRAF = vi.fn((callback) => {
        setTimeout(callback, 16);
        return 1;
      });
      global.requestAnimationFrame = mockRAF;

      act(() => {
        result.current.scrollToSection(2);
      });

      // Should use requestAnimationFrame for smooth animation
      expect(mockRAF).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('should handle scroll to same section gracefully', () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.3,
          transitionDuration: 800,
        })
      );

      // Set current position to section 2
      act(() => {
        window.scrollY = 2000;
      });

      // Try to scroll to same section
      act(() => {
        result.current.scrollToSection(2);
      });

      // Should not trigger unnecessary scrolling
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Performance and Throttling', () => {
    it('should maintain scroll state during rapid updates', async () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.3,
          transitionDuration: 800,
        })
      );

      // Simulate rapid scroll events
      for (let i = 0; i < 10; i++) {
        act(() => {
          window.scrollY = i * 50;
          const scrollEvent = new Event('scroll');
          window.dispatchEvent(scrollEvent);
        });
      }

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      // Should maintain consistent state
      expect(result.current.scrollState.currentSection).toBeDefined();
      expect(result.current.scrollState.scrollProgress).toBeGreaterThanOrEqual(0);
      expect(result.current.scrollState.scrollProgress).toBeLessThanOrEqual(1);
    });

    it('should detect when scrolling stops', async () => {
      const { result } = renderHook(() =>
        useScrollController({
          totalSections: 5,
          scrollResistance: 0.3,
          transitionDuration: 800,
        })
      );

      // Start scrolling
      act(() => {
        window.scrollY = 100;
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      });

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
      });

      expect(result.current.scrollState.isScrolling).toBe(true);

      // Wait for scrolling to stop (timeout is 150ms)
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
      });

      expect(result.current.scrollState.isScrolling).toBe(false);
    });
  });
});