'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { useEffect } from 'react';
import { LOCAL_STORAGE_NAME } from '@repo/constants';
import { getFromLocalStorage, saveToLocalStorage } from '@repo/utils';
import { useStoreSession } from '../session';
import { generateUUID } from '@repo/utils';
import { UserObject } from '@repo/types';

export const useSessionStore = (params?: {
  sessionUser: UserObject | null;
  options?: { clientOnly?: boolean };
}) => {
  const { options } = params || {};
  const { clientOnly } = options || {};

  const setSession = useStoreSession((s) => s.setSession);

  useEffect(() => {
    const getUserSession = async () => {
      const localId = getFromLocalStorage(LOCAL_STORAGE_NAME.TEMPID);

      if (!params?.sessionUser) {
        if (!clientOnly) {
          setSession(null);
        }

        if (!localId) {
          const tempId = generateUUID();
          saveToLocalStorage(LOCAL_STORAGE_NAME.TEMPID, tempId);

          if (clientOnly) {
            setSession({ id: tempId } as any);
          }
        } else {
          if (clientOnly) {
            setSession({ id: localId } as any);
          }
        }
      } else {
        setSession(params.sessionUser);

        if (!localId || localId !== params.sessionUser.id) {
          saveToLocalStorage(LOCAL_STORAGE_NAME.TEMPID, params.sessionUser.id);
        }
      }
    };

    getUserSession();
  }, [setSession, clientOnly]);
};
