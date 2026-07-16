import { create } from 'zustand';
import { WorkspaceGet } from '@repo/types';

export type ActiveWorkspaceValue = WorkspaceGet | null;
export type ActiveItemsValue =
  | {
      workspace?: ActiveWorkspaceValue;
    }
  | null
  | undefined;

interface ActiveItemsState {
  activeItems: ActiveItemsValue;

  addActiveWorkspace: (data: WorkspaceGet) => void;
  removeActiveWorkspace: () => void;

  setActiveItems: (data: ActiveItemsValue) => void;
  clearActiveItems: () => void;
}

export const useStoreActiveItems = create<ActiveItemsState>((set) => ({
  activeItems: undefined,

  addActiveWorkspace: (data) =>
    set((state) => ({
      activeItems: { ...state.activeItems, workspace: data },
    })),

  removeActiveWorkspace: () =>
    set((state) => ({
      activeItems: { ...state.activeItems, workspace: null },
    })),

  setActiveItems: (data) => set({ activeItems: data }),

  clearActiveItems: () => set({ activeItems: undefined }),
}));
