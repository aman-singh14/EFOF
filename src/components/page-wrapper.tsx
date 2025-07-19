'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
