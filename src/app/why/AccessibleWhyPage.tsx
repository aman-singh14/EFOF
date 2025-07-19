'use client';

import { AccessibilityProvider } from './AccessibilityProvider';
import Why from './page';

/**
 * Wrapper component that adds accessibility features to the Why page
 */
export default function AccessibleWhyPage() {
  return (
    <AccessibilityProvider>
      <Why />
    </AccessibilityProvider>
  );
}