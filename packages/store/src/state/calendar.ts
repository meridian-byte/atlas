import { create } from 'zustand';
import type { CalendarGet } from '@repo/types';

export type CalendarsValue = CalendarGet[] | null | undefined;

interface CalendarState {
  calendars: CalendarsValue;
  deleted: CalendarGet[];
  setCalendars: (data: CalendarsValue) => void;
  setDeletedCalendars: (data: CalendarsValue) => void;
  clearCalendars: () => void;
  clearDeletedCalendars: () => void;
  addCalendar: (data: CalendarGet) => void;
  updateCalendar: (data: CalendarGet) => void;
  deleteCalendar: (data: CalendarGet) => void;
}

export const useStoreCalendar = create<CalendarState>((set) => ({
  calendars: undefined,
  deleted: [],

  setCalendars: (data) => {
    set({ calendars: data });
  },

  setDeletedCalendars: (data) => {
    set({ deleted: data || [] });
  },

  clearCalendars: () => {
    set({ calendars: [] });
  },

  clearDeletedCalendars: () => {
    set({ deleted: [] });
  },

  addCalendar: (data) => {
    set((state) => ({
      calendars: [...(state.calendars ?? []), data],
    }));
  },

  updateCalendar: (data) => {
    set((state) => ({
      calendars: state.calendars?.map((i) => (i.id === data.id ? { ...data } : i)) ?? undefined,
    }));
  },

  deleteCalendar: (data) => {
    set((state) => ({
      deleted: [...state.deleted, data],
      calendars: state.calendars?.filter((i) => i.id !== data.id) ?? undefined,
    }));
  },
}));
