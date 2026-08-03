'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { setRedirectUrl } from '@repo/utils';
import { Box, LoadingOverlay } from '@mantine/core';
import { signOut } from '@repo/handlers';
import { deleteDatabase } from '@repo/store';
import { AuthAction } from '@repo/types';
import { DBConfig } from '@repo/types';
import { AUTH_URLS } from '@repo/constants';

export function SignIn({
  children,
  options,
}: {
  options: { action: AuthAction };
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <span
      onClick={() => {
        router.push(
          setRedirectUrl({
            targetUrl: options.action == AuthAction.SIGN_IN ? AUTH_URLS.SIGN_IN : AUTH_URLS.SIGN_UP,
            redirectUrl: pathname,
          }),
        );
      }}
    >
      {children}
    </span>
  );
}

export function SignOut({
  props,
  children,
}: {
  props: {
    baseUrl: string;
    dbConfig: DBConfig;
    options?: { clearDB?: boolean; redirectUrl?: string };
  };
  children: React.ReactNode;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <Box
      component="span"
      pos="relative"
      onClick={async () => {
        setClicked(true);

        // sign out
        await signOut({ options: { baseUrl: props.baseUrl || window.location.origin } });

        if (props.options?.clearDB) {
          // Shut down local db connections delete local db
          await deleteDatabase(props.dbConfig.name);
        }

        // clear storage
        localStorage.clear();
        sessionStorage.clear();

        // clear client cookies
        document.cookie.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });

        window.location.href = props.options?.redirectUrl || '/auth/signed-out';
      }}
    >
      <LoadingOverlay
        visible={clicked}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ size: 'xs' }}
        style={{ borderRadius: 0 }}
      />
      {children}
    </Box>
  );
}
