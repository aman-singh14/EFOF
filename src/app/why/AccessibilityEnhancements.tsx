'use client';

import React, { useEffect } from 'react';
import { useAccessibility } from './AccessibilityProvider';

/**
 * Component that adds accessibility enhancements to the page
 * This includes:
 * - Color contrast improvements
 * - Focus indicators
 * - Keyboard navigation support
 * - ARIA attributes
 * - Reduced motion alternatives
 */
export function AccessibilityEnhancements() {
  const { prefersReducedMotion, highContrastMode } = useAccessibility();

  useEffect(() => {
    // Add accessibility styles to the document
    const styleElement = document.createElement('style');
    
    // Define accessibility styles
    const styles = `
      /* Enhanced focus indicators for keyboard navigation */
      .keyboard-navigation :focus:not([data-focus-visible-added]) {
        outline: 3px solid #1A6B8A !important;
        outline-offset: 3px !important;
      }
      
      /* Ensure proper color contrast for text */
      .text-[#2C4D6E]/80 {
        color: rgba(44, 77, 110, 0.9) !important; /* Increased opacity for better contrast */
      }
      
      .text-[#2C4D6E]/60 {
        color: rgba(44, 77, 110, 0.8) !important; /* Increased opacity for better contrast */
      }
      
      /* Ensure interactive elements have proper focus states */
      button:focus, 
      [role="button"]:focus,
      a:focus {
        outline: 3px solid #1A6B8A !important;
        outline-offset: 3px !important;
      }
      
      /* Skip link styles */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #1A6B8A;
        color: white;
        padding: 8px;
        z-index: 100;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 0;
      }
      
      /* High contrast mode styles */
      ${highContrastMode ? `
        body {
          background-color: #000 !important;
          color: #fff !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: #fff !important;
        }
        
        p, span, div {
          color: #fff !important;
        }
        
        .bg-white, .bg-white\\/80 {
          background-color: #000 !important;
          border: 1px solid #fff !important;
        }
        
        .text-\\[\\#2C4D6E\\], .text-\\[\\#2C4D6E\\]\\/80 {
          color: #fff !important;
        }
        
        .text-\\[\\#1A6B8A\\] {
          color: #4DB8E5 !important;
        }
        
        .bg-gradient-to-b {
          background: #000 !important;
        }
      ` : ''}
      
      /* Reduced motion styles */
      ${prefersReducedMotion ? `
        * {
          animation: none !important;
          transition: none !important;
        }
        
        .animate-float,
        .animate-pulse-slow,
        .animate-shimmer,
        .path-animation,
        .scroll-indicator {
          animation: none !important;
          transition: none !important;
        }
        
        .hover-lift:hover,
        .interactive-card:hover {
          transform: none !important;
        }
        
        .section-transition {
          transition: none !important;
        }
      ` : ''}
    `;
    
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    // Add keyboard navigation detection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };
    
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Add ARIA landmarks to sections
    const addAriaLandmarks = () => {
      // Find all sections and add appropriate ARIA roles
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        if (!section.hasAttribute('role')) {
          section.setAttribute('role', 'region');
        }
        
        // Ensure each section has an accessible name
        if (!section.hasAttribute('aria-labelledby') && !section.hasAttribute('aria-label')) {
          const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
          if (heading && heading.id) {
            section.setAttribute('aria-labelledby', heading.id);
          } else if (heading) {
            const id = `heading-${Math.random().toString(36).substr(2, 9)}`;
            heading.id = id;
            section.setAttribute('aria-labelledby', id);
          } else {
            section.setAttribute('aria-label', 'Content section');
          }
        }
      });
      
      // Add role="main" to main content area if not present
      const main = document.querySelector('main');
      if (main && !main.hasAttribute('role')) {
        main.setAttribute('role', 'main');
      }
    };
    
    // Add ARIA attributes to interactive elements
    const enhanceInteractiveElements = () => {
      // Add ARIA attributes to buttons without roles
      const buttons = document.querySelectorAll('button:not([role]), div[onclick]:not([role])');
      buttons.forEach(button => {
        if (!button.hasAttribute('role')) {
          button.setAttribute('role', 'button');
        }
        if (!button.hasAttribute('tabindex') && button.tagName !== 'BUTTON') {
          button.setAttribute('tabindex', '0');
        }
      });
      
      // Add ARIA attributes to tooltips
      const tooltips = document.querySelectorAll('[data-tooltip]');
      tooltips.forEach(tooltip => {
        if (!tooltip.hasAttribute('role')) {
          tooltip.setAttribute('role', 'tooltip');
        }
      });
      
      // Ensure all SVG icons have aria-hidden="true"
      const svgIcons = document.querySelectorAll('svg:not([role])');
      svgIcons.forEach(svg => {
        if (!svg.hasAttribute('aria-hidden')) {
          svg.setAttribute('aria-hidden', 'true');
        }
      });
    };
    
    // Run the enhancements after the DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        addAriaLandmarks();
        enhanceInteractiveElements();
      });
    } else {
      addAriaLandmarks();
      enhanceInteractiveElements();
    }
    
    // Run again after any dynamic content changes
    const observer = new MutationObserver(() => {
      addAriaLandmarks();
      enhanceInteractiveElements();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Clean up
    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      observer.disconnect();
    };
  }, [prefersReducedMotion, highContrastMode]);

  return null; // This component doesn't render anything
}