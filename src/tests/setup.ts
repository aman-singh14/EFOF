import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  
  constructor(_callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    if (options) {
      // Handle the root type correctly
      if (options.root instanceof Element) {
        this.root = options.root;
      } else {
        this.root = null;
      }
      this.rootMargin = options.rootMargin || '0px';
      this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0];
    }
  }
  
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  return setTimeout(cb, 16);
};

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock window.scrollBy
Object.defineProperty(window, 'scrollBy', {
  value: vi.fn(),
  writable: true,
});

// Mock window properties
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 1000,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1920,
});

Object.defineProperty(window, 'scrollY', {
  writable: true,
  configurable: true,
  value: 0,
});

Object.defineProperty(document.documentElement, 'scrollHeight', {
  writable: true,
  configurable: true,
  value: 5000,
});