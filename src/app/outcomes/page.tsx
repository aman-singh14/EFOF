'use client';

import { AccessibilityProvider } from '../why/AccessibilityProvider';
import { AccessibilityEnhancements } from '../why/AccessibilityEnhancements';
import OutcomesPageContent from './OutcomesPageContent';
import { AccessibilityTest } from '../why/AccessibilityTest';

/**
 * Main entry point for the Outcomes page
 * This component wraps the page content with accessibility providers
 * and ensures consistent styling across the site
 * 
 * The page follows the established light blue color scheme of the website
 * while introducing innovative visual elements and interactive components.
 * It focuses on showcasing the outcomes and impact of Education for Our Future (EFOF),
 * highlighting key statistics and achievements.
 */
export default function OutcomesPage() {
  return (
    <AccessibilityProvider>
      <AccessibilityEnhancements />
      {process.env.NODE_ENV === 'development' && <AccessibilityTest />}
      <OutcomesPageContent />
    </AccessibilityProvider>
  );
}