'use client';

import { useEffect, useState, useRef, memo } from 'react';

/**
 * Component that monitors and reports Core Web Vitals metrics
 * This helps identify performance issues in the page
 */
export const WebVitalsMonitor = memo(function WebVitalsMonitor() {
  useEffect(() => {
    // Only run in production and if the Web Vitals API is available
    if (process.env.NODE_ENV !== 'production' || typeof window.performance === 'undefined') {
      return;
    }

    // Load web-vitals library dynamically
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getLCP(sendToAnalytics);
      getFCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });

    // Function to send metrics to analytics
    function sendToAnalytics({ name, delta, id }: { name: string; delta: number; id: string }) {
      // Here you would typically send this data to your analytics service
      // For now, we'll just log it to console in production
      console.log({ name, delta, id });
    }
  }, []);

  // This component doesn't render anything
  return null;
});

/**
 * Component that preloads critical resources
 */
export const ResourcePreloader = memo(function ResourcePreloader({
  resources = []
}: {
  resources: Array<{
    href: string;
    as: 'image' | 'style' | 'script' | 'font' | 'fetch';
    type?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    media?: string;
  }>;
}) {
  useEffect(() => {
    // Skip if no resources or if not in browser
    if (!resources.length || typeof document === 'undefined') {
      return;
    }

    // Create and append preload links
    const links = resources.map(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      if (resource.media) link.media = resource.media;
      return link;
    });

    // Append links to head
    links.forEach(link => document.head.appendChild(link));

    // Clean up
    return () => {
      links.forEach(link => {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);

  // This component doesn't render anything
  return null;
});

/**
 * Component that implements resource hints for performance optimization
 */
export const ResourceHints = memo(function ResourceHints({
  preconnect = [],
  prefetch = [],
  prerender = [],
  dnsPrefetch = []
}: {
  preconnect?: string[];
  prefetch?: string[];
  prerender?: string[];
  dnsPrefetch?: string[];
}) {
  useEffect(() => {
    // Skip if not in browser
    if (typeof document === 'undefined') {
      return;
    }

    const links: HTMLLinkElement[] = [];

    // Create preconnect links
    preconnect.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      links.push(link);
    });

    // Create prefetch links
    prefetch.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      links.push(link);
    });

    // Create prerender links
    prerender.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prerender';
      link.href = url;
      links.push(link);
    });

    // Create DNS prefetch links
    dnsPrefetch.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      links.push(link);
    });

    // Append all links to head
    links.forEach(link => document.head.appendChild(link));

    // Clean up
    return () => {
      links.forEach(link => {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
      });
    };
  }, [preconnect, prefetch, prerender, dnsPrefetch]);

  // This component doesn't render anything
  return null;
});

/**
 * Component that implements font optimization
 */
export const FontOptimizer = memo(function FontOptimizer() {
  useEffect(() => {
    // Skip if not in browser
    if (typeof document === 'undefined') {
      return;
    }

    // Add font-display: swap to all font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-display: swap !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
});

/**
 * Component that implements image optimization best practices
 * Enhanced with accessibility features
 */
export const ImageOptimizationProvider = memo(function ImageOptimizationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Skip if not in browser
    if (typeof document === 'undefined') {
      return;
    }

    // Add support for native lazy loading
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

    // Add decoding="async" to images
    const imagesWithoutDecoding = document.querySelectorAll('img:not([decoding])');
    imagesWithoutDecoding.forEach(img => {
      img.setAttribute('decoding', 'async');
    });
    
    // Ensure all images have alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach(img => {
      // Set a descriptive alt text based on image filename if possible
      const src = img.getAttribute('src') || '';
      const filename = src.split('/').pop()?.split('.')[0] || '';
      const altText = filename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      img.setAttribute('alt', altText || 'Image');
    });
    
    // Add role="presentation" to decorative images
    const decorativeImages = document.querySelectorAll('.decorative-image');
    decorativeImages.forEach(img => {
      img.setAttribute('role', 'presentation');
      img.setAttribute('aria-hidden', 'true');
    });
  }, []);

  return <>{children}</>;
});