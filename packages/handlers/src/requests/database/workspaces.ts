/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { WorkspaceCreate, WorkspaceGet, WorkspaceUpdate } from '@repo/types';
import { apiCall } from './fetch';

export const workspacesGet = (params?: { userId?: string }) => {
  const query = params?.userId ? `?userId=${params.userId}` : '';
  return apiCall(query, 'GET');
};

let currentController: AbortController | null = null;

export const workspacesUpdate = async (workspaces: WorkspaceGet[], deletedIds?: string[]) => {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    return await apiCall('', 'PUT', { workspaces, deletedIds }, currentController.signal);
  } finally {
    currentController = null;
  }
};

export const eventGet = (params: { eventId: string }) => {
  return apiCall(params.eventId, 'GET');
};

export const eventCreate = (event: WorkspaceCreate) => {
  return apiCall('create', 'POST', event);
};

export const eventUpdate = (event: WorkspaceUpdate) => {
  return apiCall(event.id as string, 'PUT', event);
};

export const eventDelete = (eventId: string) => {
  return apiCall(eventId, 'DELETE');
};
