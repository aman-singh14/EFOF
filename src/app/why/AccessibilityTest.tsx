'use client';

import { useEffect } from 'react';

/**
 * Component that tests accessibility features on the page
 * This is a development tool to help identify accessibility issues
 */
export function AccessibilityTest() {
  useEffect(() => {
    // Skip if not in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    
    console.log('Running accessibility tests...');
    
    // Test for proper heading structure
    const testHeadingStructure = () => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let lastLevel = 0;
      let issues = 0;
      
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.substring(1));
        
        // Check for skipped heading levels
        if (level > lastLevel + 1 && lastLevel !== 0) {
          console.warn(`Heading structure issue: Skipped heading level from h${lastLevel} to h${level}`, heading);
          issues++;
        }
        
        lastLevel = level;
      });
      
      if (issues === 0) {
        console.log('✅ Heading structure test passed');
      } else {
        console.warn(`❌ Heading structure test failed with ${issues} issues`);
      }
    };
    
    // Test for images without alt text
    const testImagesAltText = () => {
      const images = Array.from(document.querySelectorAll('img'));
      let issues = 0;
      
      images.forEach(img => {
        if (!img.hasAttribute('alt')) {
          console.warn('Image missing alt text:', img);
          issues++;
        } else if (img.alt === '' && !img.hasAttribute('role') && !img.hasAttribute('aria-hidden')) {
          console.warn('Decorative image should have role="presentation" or aria-hidden="true":', img);
          issues++;
        }
      });
      
      if (issues === 0) {
        console.log('✅ Image alt text test passed');
      } else {
        console.warn(`❌ Image alt text test failed with ${issues} issues`);
      }
    };
    
    // Test for proper ARIA landmarks
    const testAriaLandmarks = () => {
      const landmarks = {
        main: document.querySelectorAll('main, [role="main"]'),
        navigation: document.querySelectorAll('nav, [role="navigation"]'),
        contentinfo: document.querySelectorAll('footer, [role="contentinfo"]'),
        region: document.querySelectorAll('section[aria-labelledby], section[aria-label], [role="region"][aria-labelledby], [role="region"][aria-label]')
      };
      
      let issues = 0;
      
      if (landmarks.main.length === 0) {
        console.warn('No main landmark found. Add <main> or role="main"');
        issues++;
      } else if (landmarks.main.length > 1) {
        console.warn(`Multiple main landmarks found (${landmarks.main.length}). There should only be one.`);
        issues++;
      }
      
      if (landmarks.navigation.length === 0) {
        console.warn('No navigation landmark found. Add <nav> or role="navigation"');
        issues++;
      }
      
      if (landmarks.contentinfo.length === 0) {
        console.warn('No contentinfo landmark found. Add <footer> or role="contentinfo"');
        issues++;
      }
      
      if (landmarks.region.length === 0) {
        console.warn('No labeled regions found. Add aria-labelledby or aria-label to <section> elements');
        issues++;
      }
      
      if (issues === 0) {
        console.log('✅ ARIA landmarks test passed');
      } else {
        console.warn(`❌ ARIA landmarks test failed with ${issues} issues`);
      }
    };
    
    // Test for color contrast
    const testColorContrast = () => {
      console.log('Color contrast should be manually tested with a tool like axe or Wave');
    };
    
    // Test for keyboard navigation
    const testKeyboardNavigation = () => {
      const interactiveElements = Array.from(document.querySelectorAll('a, button, [role="button"], [tabindex="0"]'));
      let issues = 0;
      
      interactiveElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const outlineStyle = computedStyle.getPropertyValue('outline-style');
        const outlineWidth = computedStyle.getPropertyValue('outline-width');
        
        // Check if the element has a visible focus indicator
        if ((outlineStyle === 'none' || outlineWidth === '0px') && 
            !el.classList.contains('focus:outline-none') && 
            !el.classList.contains('focus:ring')) {
          console.warn('Interactive element missing visible focus indicator:', el);
          issues++;
        }
      });
      
      if (issues === 0) {
        console.log('✅ Keyboard navigation test passed');
      } else {
        console.warn(`❌ Keyboard navigation test failed with ${issues} issues`);
      }
    };
    
    // Run all tests after the DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          testHeadingStructure();
          testImagesAltText();
          testAriaLandmarks();
          testColorContrast();
          testKeyboardNavigation();
        }, 1000);
      });
    } else {
      setTimeout(() => {
        testHeadingStructure();
        testImagesAltText();
        testAriaLandmarks();
        testColorContrast();
        testKeyboardNavigation();
      }, 1000);
    }
  }, []);

  return null; // This component doesn't render anything
}