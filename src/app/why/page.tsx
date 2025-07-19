'use client';

import { AccessibilityProvider } from './AccessibilityProvider';
import { AccessibilityEnhancements } from './AccessibilityEnhancements';
import WhyPageContent from './WhyPageContent';
import { AccessibilityTest } from './AccessibilityTest';

/**
 * Main entry point for the Why page
 * This component wraps the page content with accessibility providers
 * and ensures consistent styling across the site
 * 
 * The page follows the established light blue color scheme of the website
 * while introducing innovative visual elements and interactive components.
 * It focuses on explaining the purpose and mission of Education for Our Future (EFOF),
 * highlighting key statistics and information about education challenges.
 */
export default function WhyPage() {
  return (
    <AccessibilityProvider>
      <AccessibilityEnhancements />
      {process.env.NODE_ENV === 'development' && <AccessibilityTest />}
      <WhyPageContent />
    </AccessibilityProvider>
  );
}