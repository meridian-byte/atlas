'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import {
  useActiveItemStore,
  useAppshellInitialize,
  useLoadAppData,
  useSessionStore,
  useUserStatesStore,
  useViewInitialize,
} from '@repo/store';
import { UserObject } from '@repo/types';
import { AppShellValue } from '@repo/store';

export default function Initialize({
  props,
  children,
}: {
  props?: {
    sessionUser: UserObject | null;
    cookie?: AppShellValue;
  };
  children: React.ReactNode;
}) {
  // initialize stores

  useSessionStore({
    sessionUser: props?.sessionUser || null,
    options: { clientOnly: false },
  });

  // useUserRoleStore();

  useAppshellInitialize();

  useViewInitialize();

  useActiveItemStore();

  useLoadAppData({
    clientOnly: false,
    storesToLoad: {
      workspaces: true,
      notes: true,
    },
  });

  useUserStatesStore();

  return <div>{children}</div>;
}
