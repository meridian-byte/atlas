'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { useAppshellInitialize, useSessionStore, useViewInitialize } from '@repo/sync';
import { UserObject } from '@repo/types';
import { AppShellValue } from '@repo/store';
// import { WorkspaceType } from '@repo/types/models/enums';

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

  // useActiveItemStore({ workspaceType: WorkspaceType.NOTELINE });

  // useLoadAppData({
  //   clientOnly: false,
  //   storesToLoad: {
  //     workspaces: true,
  //     notes: true,
  //   },
  // });

  // useUserStatesStore();

  return <div>{children}</div>;
}
