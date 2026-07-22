/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { DEFAULT_NAMES } from '@repo/constants';
import { db } from '@repo/db';
import { ProfileGet, SyncStatus, WorkspaceGet } from '@repo/types';
import { generateUUID } from '@repo/utils';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  try {
    const { profileId } = await params;

    const profileRecord = await db.profile.findUnique({
      where: { id: profileId },
    });

    return NextResponse.json(
      { item: profileRecord },
      { status: 200, statusText: 'Profile Retrieved' },
    );
  } catch (error) {
    console.error('---> route handler error (get profile):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  try {
    const { profileId } = await params;

    const profile: ProfileGet = await request.json();

    const transaction = await db.$transaction(async (db) => {
      const profileRecord = await db.profile.upsert({
        where: { id: profileId },
        update: profile,
        create: profile,
      });

      // const now = new Date();

      // const workspaceObject: WorkspaceGet = {
      //   id: generateUUID(),
      //   name: DEFAULT_NAMES.WORKSPACE,
      //   profileId: profileRecord.id,
      //   syncStatus: SyncStatus.SYNCED,
      //   createdAt: now,
      //   updatedAt: now,
      // };

      // const workspaceRecord = await db.workspace.upsert({
      //   where: { id: profileId, name: DEFAULT_NAMES.WORKSPACE },
      //   update: workspaceObject,
      //   create: workspaceObject,
      // });

      return {
        profile: profileRecord,
        existed: false,

        // workspace: workspaceRecord,
      };
    });

    return NextResponse.json(
      { items: transaction },
      { status: 200, statusText: 'Profile Created' },
    );
  } catch (error) {
    console.error('---> route handler error (create profile):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  try {
    const { profileId } = await params;

    const profile: ProfileGet = await request.json();

    const updateProfile = await db.profile.update({
      where: { id: profileId },
      data: profile,
    });

    return NextResponse.json(
      { items: updateProfile },
      { status: 200, statusText: 'Profile Updated' },
    );
  } catch (error) {
    console.error('---> route handler error (update profile):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
