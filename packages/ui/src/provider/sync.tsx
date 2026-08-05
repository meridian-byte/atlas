'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { useDebouncedCallback, useNetwork } from '@mantine/hooks';
import {
  useStoreSession,
  useStoreSyncStatus,
  handleMergedSync,
  MergedSyncPayload,
  syncToServerAfterDelay,
  useMergedSync,
} from '@repo/store';
import { API_URL, BASE_URL, STORE_NAME } from '@repo/constants';

export function ProviderSync({ children }: { children: React.ReactNode }) {
  const networkStatus = useNetwork();

  const session = useStoreSession((s) => s.session);
  const syncStatus = useStoreSyncStatus((s) => s.syncStatus);
  const setSyncStatus = useStoreSyncStatus((s) => s.setSyncStatus);

  // This now handles a MergedSyncPayload rather than one store's SyncParams
  const debounceMergedSyncToServer = useDebouncedCallback(syncToServerAfterDelay, 500);

  const restProps = {
    setSyncStatus,
    session,
    networkStatus,
    syncStatus,
    debounceMergedSyncToServer,
    clientOnly: false,
  };

  useMergedSync({
    syncStatus: restProps.syncStatus,
    online: networkStatus.online,
    // Use an array of keys for stability in the hook's dependency array
    storesToSync: [
      STORE_NAME.WORKSPACES,
      STORE_NAME.CALENDARS,
      STORE_NAME.EVENTS,
      STORE_NAME.NOTES,
      STORE_NAME.LINKS,
    ],
    // The payload (i) passed here is now the MergedSyncPayload { notes, categories }
    handleSync: (payload: MergedSyncPayload) =>
      handleMergedSync({ payload, ...restProps, apiUrl: API_URL }),
  });

  return <div>{children}</div>;
}
