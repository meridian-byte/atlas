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

export const workspaceGet = (params: { workspaceId: string }) => {
  return apiCall(params.workspaceId, 'GET');
};

export const workspaceCreate = (workspace: WorkspaceCreate) => {
  return apiCall('create', 'POST', workspace);
};

export const workspaceUpdate = (workspace: WorkspaceUpdate) => {
  return apiCall(workspace.id as string, 'PUT', workspace);
};

export const workspaceDelete = (workspaceId: string) => {
  return apiCall(workspaceId, 'DELETE');
};
