/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { NoteCreate, NoteGet, NoteUpdate } from '@repo/types';
import { apiCall } from './fetch';

export const notesGet = (params?: { userId?: string }) => {
  const query = params?.userId ? `?userId=${params.userId}` : '';
  return apiCall(query, 'GET');
};

let currentController: AbortController | null = null;

export const notesUpdate = async (notes: NoteGet[], deletedIds?: string[]) => {
  if (currentController) currentController.abort();
  currentController = new AbortController();

  try {
    return await apiCall('', 'PUT', { notes, deletedIds }, currentController.signal);
  } finally {
    currentController = null;
  }
};

export const noteGet = (params: { noteId: string }) => {
  return apiCall(params.noteId, 'GET');
};

export const noteCreate = (note: NoteCreate) => {
  return apiCall('create', 'POST', note);
};

export const noteUpdate = (note: NoteUpdate) => {
  return apiCall(note.id as string, 'PUT', note);
};

export const noteDelete = (noteId: string) => {
  return apiCall(noteId, 'DELETE');
};
