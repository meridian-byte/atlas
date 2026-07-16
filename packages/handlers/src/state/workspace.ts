import { useStoreWorkspace } from '@repo/store';
import { useStoreSession } from '@repo/store';
import { WorkspaceGet } from '@repo/types';
import { SyncStatus } from '@repo/types';
import { generateUUID } from '@repo/utils';

export const useWorkspaceActions = () => {
  const session = useStoreSession((s) => s.session);
  const addWorkspace = useStoreWorkspace((s) => s.addWorkspace);
  const updateWorkspace = useStoreWorkspace((s) => s.updateWorkspace);
  const deleteWorkspace = useStoreWorkspace((s) => s.deleteWorkspace);

  const workspaceCreate = (params: Omit<Partial<WorkspaceGet>, 'type'>) => {
    if (!session) return;

    const id = generateUUID();
    const now = new Date();

    const newWorkspace: WorkspaceGet = {
      id: params.id || id,
      name: params.name || 'New Workspace',
      profileId: params.profileId || session.id,
      syncStatus: SyncStatus.PENDING,
      createdAt: new Date(params.createdAt || now).toISOString() as any,
      updatedAt: new Date(params.updatedAt || now).toISOString() as any,
    };

    addWorkspace(newWorkspace);

    return newWorkspace;
  };

  const workspaceUpdate = (params: WorkspaceGet) => {
    if (!session) return;

    const now = new Date();

    const newWorkspace: WorkspaceGet = {
      ...params,
      syncStatus: SyncStatus.PENDING,
      createdAt: new Date(params.createdAt).toISOString() as any,
      updatedAt: new Date(now).toISOString() as any,
    };

    updateWorkspace(newWorkspace);
  };

  const workspaceDelete = (params: WorkspaceGet) => {
    if (!session) return;

    const now = new Date();

    deleteWorkspace({
      ...params,
      syncStatus: SyncStatus.DELETED,
      createdAt: new Date(params.createdAt).toISOString() as any,
      updatedAt: new Date(now).toISOString() as any,
    });
  };

  return { workspaceCreate, workspaceUpdate, workspaceDelete };
};
