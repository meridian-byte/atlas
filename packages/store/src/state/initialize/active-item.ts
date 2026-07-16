'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { useEffect, useRef } from 'react';
import { LOCAL_STORAGE_NAME } from '@repo/constants';
import {
  getFromLocalStorage,
  getFromSessionStorage,
  saveToLocalStorage,
  saveToSessionStorage,
} from '@repo/utils';
import { useStoreActiveItems } from '../active-items';
import { useStoreWorkspace } from '../workspace';
import { useWorkspaceActions } from '@repo/handlers';
import { WorkspaceGet } from '@repo/types';

export const useActiveItemStore = () => {
  const workspaces = useStoreWorkspace((s) => s.workspaces);
  const { workspaceCreate } = useWorkspaceActions();
  const setActiveItems = useStoreActiveItems((s) => s.setActiveItems);

  const isInitializing = useRef(false);

  useEffect(() => {
    const initializeUserState = () => {
      if (isInitializing.current || !workspaces) return;
      isInitializing.current = true;

      // get active workspace
      const getActiveWorkspace = (): WorkspaceGet | null => {
        if (workspaces === undefined) return null;
        if (workspaces === null) return null;

        let workingId: string | null = null;

        // get active workspace id from session storage
        const activeSessionId = getFromSessionStorage(LOCAL_STORAGE_NAME.ACTIVE_WORKSPACE);

        if (!activeSessionId) {
          // get active workspace id from local storage
          const activeLocalId = getFromLocalStorage(LOCAL_STORAGE_NAME.ACTIVE_WORKSPACE);

          if (activeLocalId) {
            workingId = activeLocalId;
          }
        } else {
          workingId = activeSessionId;
        }

        if (!workingId) {
          let selectedWorkspace: WorkspaceGet | null = null;

          if (!workspaces.length) {
            // create default workspace
            const newDefaultWorkspace = workspaceCreate({
              name: 'Default Workspace',
            });

            selectedWorkspace = newDefaultWorkspace || null;
          } else {
            // find default workspace
            const oldestWorkspace = workspaces.reduce((oldest, current) => {
              return new Date(current.createdAt) < new Date(oldest.createdAt) ? current : oldest;
            });

            selectedWorkspace = oldestWorkspace;
          }

          if (selectedWorkspace) {
            saveToSessionStorage(LOCAL_STORAGE_NAME.ACTIVE_WORKSPACE, selectedWorkspace.id);

            saveToLocalStorage(LOCAL_STORAGE_NAME.ACTIVE_WORKSPACE, selectedWorkspace.id);
          }

          return selectedWorkspace;
        } else {
          // find active workspace from store
          const activeLocalWorkspace = workspaces.find((wi) => wi.id == workingId);

          return activeLocalWorkspace || null;
        }
      };

      setActiveItems({ workspace: getActiveWorkspace() });
    };

    initializeUserState();
  }, [setActiveItems, workspaces]);
};
