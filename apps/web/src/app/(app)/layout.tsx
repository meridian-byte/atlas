import React from 'react';
import Shell from '@web/ui/layout/appshell';

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
