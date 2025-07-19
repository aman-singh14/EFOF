'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './PerformanceUtils';

interface AccessibilityContextType {
  prefersReducedMotion: boolean;
  highContrastMode: boolean;
  focusVisible: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  prefersReducedMotion: false,
  highContrastMode: false,
  focusVisible: false,
  toggleHighContrast: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setHighContrastMode(prev => !prev);
  };

  // Detect keyboard navigation to show focus indicators
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
        
        // Add class to body for global styling
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      setFocusVisible(false);
      
      // Remove class from body
      document.body.classList.remove('keyboard-navigation');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply accessibility styles
  useEffect(() => {
    // Create style element for accessibility styles
    const styleElement = document.createElement('style');
    
    // Define styles based on current accessibility settings
    const styles = `
      /* Enhanced focus styles for keyboard navigation */
      .keyboard-navigation :focus {
        outline: 3px solid #1A6B8A !important;
        outline-offset: 3px !important;
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
      
      /* Skip to content link */
      .skip-to-content {
        position: absolute;
        left: -9999px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
      
      .skip-to-content:focus {
        position: fixed;
        top: 8px;
        left: 8px;
        width: auto;
        height: auto;
        padding: 8px 16px;
        background-color: #1A6B8A;
        color: white;
        z-index: 9999;
        border-radius: 4px;
        outline: none;
      }
    `;
    
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    // Clean up
    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, [highContrastMode]);

  return (
    <AccessibilityContext.Provider
      value={{
        prefersReducedMotion,
        highContrastMode,
        focusVisible,
        toggleHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}