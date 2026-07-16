import { create } from 'zustand';
import type { EventGet } from '@repo/types';

export type EventsValue = EventGet[] | null | undefined;

interface EventState {
  events: EventsValue;
  deleted: EventGet[];
  setEvents: (data: EventsValue) => void;
  setDeletedEvents: (data: EventsValue) => void;
  clearEvents: () => void;
  clearDeletedEvents: () => void;
  addEvent: (data: EventGet) => void;
  updateEvent: (data: EventGet) => void;
  deleteEvent: (data: EventGet) => void;
}

export const useStoreEvent = create<EventState>((set) => ({
  events: undefined,
  deleted: [],

  setEvents: (data) => {
    set({ events: data });
  },

  setDeletedEvents: (data) => {
    set({ deleted: data || [] });
  },

  clearEvents: () => {
    set({ events: [] });
  },

  clearDeletedEvents: () => {
    set({ deleted: [] });
  },

  addEvent: (data) => {
    set((state) => ({
      events: [...(state.events ?? []), data],
    }));
  },

  updateEvent: (data) => {
    set((state) => ({
      events: state.events?.map((i) => (i.id === data.id ? { ...data } : i)) ?? undefined,
    }));
  },

  deleteEvent: (data) => {
    set((state) => ({
      deleted: [...state.deleted, data],
      events: state.events?.filter((i) => i.id !== data.id) ?? undefined,
    }));
  },
}));
