/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { ProfileCreate, ProfileGet, ProfileUpdate } from '@repo/types';
import { apiCall } from './fetch';

export const profilesGet = (params?: { userId?: string }) => {
  const query = params?.userId ? `?userId=${params.userId}` : '';
  return apiCall(query, 'GET');
};

let currentController: AbortController | null = null;

export const profilesUpdate = async (profiles: ProfileGet[], deletedIds?: string[]) => {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    return await apiCall('', 'PUT', { profiles, deletedIds }, currentController.signal);
  } finally {
    currentController = null;
  }
};

export const profileGet = (params: { profileId: string }) => {
  return apiCall(params.profileId, 'GET');
};

export const profileCreate = (profile: ProfileCreate) => {
  return apiCall('create', 'POST', profile);
};

export const profileUpdate = (profile: ProfileUpdate) => {
  return apiCall(profile.id as string, 'PUT', profile);
};

export const profileDelete = (profileId: string) => {
  return apiCall(profileId, 'DELETE');
};
