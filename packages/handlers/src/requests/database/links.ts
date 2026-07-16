/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { LinkCreate, LinkGet, LinkUpdate } from '@repo/types';
import { apiCall } from './fetch';

export const linksGet = (params?: { userId?: string }) => {
  const query = params?.userId ? `?userId=${params.userId}` : '';
  return apiCall(query, 'GET');
};

let currentController: AbortController | null = null;

export const linksUpdate = async (links: LinkGet[], deletedIds?: string[]) => {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    return await apiCall('', 'PUT', { links, deletedIds }, currentController.signal);
  } finally {
    currentController = null;
  }
};

export const linkGet = (params: { linkId: string }) => {
  return apiCall(params.linkId, 'GET');
};

export const linkCreate = (link: LinkCreate) => {
  return apiCall('create', 'POST', link);
};

export const linkUpdate = (link: LinkUpdate) => {
  return apiCall(link.id as string, 'PUT', link);
};

export const linkDelete = (linkId: string) => {
  return apiCall(linkId, 'DELETE');
};
