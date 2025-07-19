import { ReactNode } from 'react';
import BottomNav from "@/components/BottomNav";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}
