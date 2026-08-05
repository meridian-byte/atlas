import React from 'react';
import Shell from '@atlas/ui/layout/appshell';

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
