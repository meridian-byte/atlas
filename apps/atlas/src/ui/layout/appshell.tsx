'use client';

import React from 'react';
import {
  AppShell,
  AppShellAside,
  AppShellFooter,
  AppShellMain,
  AppShellNavbar,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import LayoutNavbarApp from './navbar/app';
import LayoutFooterApp from './footer/app';
import LayoutAsideApp from './aside/app';
import { SHELL_VALUES } from '@atlas/constants';
import { useStoreAppShell } from '@repo/store';

export default function Shell({ children }: { children: React.ReactNode }) {
  const navbarActive = useStoreAppShell((s) => s.appshell?.child?.navbar);
  const asideActive = useStoreAppShell((s) => s.appshell?.child?.aside);
  // const mobile = useMediaQuery('(max-width: 36em)');
  // const desktop = useMediaQuery('(min-width: 62em)');

  return (
    <AppShell
      padding={0}
      navbar={{
        width: SHELL_VALUES.NAVBAR.WIDTH,
        breakpoint: 'sm',
        collapsed: { mobile: true, desktop: !navbarActive },
      }}
      aside={{
        width: SHELL_VALUES.ASIDE.WIDTH,
        breakpoint: 'sm',
        collapsed: { mobile: true, desktop: !asideActive },
      }}
      footer={{ height: SHELL_VALUES.FOOTER.HEIGHT }}
    >
      <AppShellNavbar>
        <LayoutNavbarApp />
      </AppShellNavbar>

      <AppShellMain>
        <ScrollArea scrollbars={'y'} h={`calc(100vh - ${SHELL_VALUES.FOOTER.HEIGHT}px)`}>
          {children}
        </ScrollArea>
      </AppShellMain>

      <AppShellAside>
        <LayoutAsideApp />
      </AppShellAside>

      <AppShellFooter h={SHELL_VALUES.FOOTER.HEIGHT}>
        <LayoutFooterApp />
      </AppShellFooter>
    </AppShell>
  );
}
