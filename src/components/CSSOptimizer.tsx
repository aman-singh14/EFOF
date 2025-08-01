"use client";

import { useEffect } from 'react';

export default function CSSOptimizer() {
  useEffect(() => {
    // Load non-critical CSS after initial render
    const loadNonCriticalCSS = () => {
      // Create a link element for non-critical styles
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/css/non-critical.css';
      link.media = 'print';
      link.onload = function() {
        // @ts-expect-error - HTMLLinkElement media property assignment
        this.media = 'all';
      };
      
      // Only add if not already present
      if (!document.querySelector('link[href="/css/non-critical.css"]')) {
        document.head.appendChild(link);
      }
    };

    // Load after a short delay to prioritize critical rendering
    const timer = setTimeout(loadNonCriticalCSS, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}