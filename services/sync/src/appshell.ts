'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { useEffect } from 'react';
import { getCookieClient, setCookieClient } from '@repo/utils';
import { WEEK, COOKIE_NAME } from '@repo/constants';
import { AppShellValue, useStoreAppShell } from '@repo/store';
import { useMediaQuery } from '@mantine/hooks';

export const useAppshellInitialize = (params?: { cookie?: AppShellValue }) => {
  const desktop = useMediaQuery('(min-width: 62em)');

  const appshell = useStoreAppShell((s) => s.appshell);
  const setAppShell = useStoreAppShell((s) => s.setAppShell);

  const cookie: AppShellValue = getCookieClient(COOKIE_NAME.APP_SHELL);

  useEffect(() => {
    // 1. Establish base defaults
    const base = params?.cookie ??
      cookie ?? {
        navbar: true,
        aside: false,
        child: { navbar: true, aside: false },
      };

    // 2. Apply Mobile Constraints (Override if !desktop)
    const resolvedChild = {
      navbar: desktop ? base.child.navbar : false,
      aside: desktop ? base.child.aside : false,
    };

    const resolvedShell = {
      ...base,
      child: resolvedChild,
    };

    setTimeout(() => {
      setCookieClient(COOKIE_NAME.APP_SHELL, resolvedShell, {
        expiryInSeconds: WEEK,
      });
    }, 100);

    setAppShell(resolvedShell);
  }, [desktop, setAppShell]);

  useEffect(() => {
    if (appshell === undefined) return;

    setTimeout(() => {
      setCookieClient(COOKIE_NAME.APP_SHELL, appshell, {
        expiryInSeconds: WEEK,
      });
    }, 100);
  }, [appshell]);
};
