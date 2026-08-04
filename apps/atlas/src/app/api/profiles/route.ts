/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { db } from '@repo/db';
import { ProfileGet } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const revalidate = 3600;

export async function GET() {
  try {
    const profileRecords = await db.profile.findMany();

    return NextResponse.json(
      { items: profileRecords },
      { status: 200, statusText: 'Profiles Retrieved' },
    );
  } catch (error) {
    console.error('---> route handler error (get profiles):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { profiles, deletedIds }: { profiles: ProfileGet[]; deletedIds?: string[] } =
      await request.json();

    // First handle explicit deletions if any exist
    if (deletedIds?.length) {
      await db.profile.deleteMany({
        where: { id: { in: deletedIds } },
      });
    }

    // Prepare upsert operations
    const operations = profiles.map((profile) =>
      db.profile.upsert({
        where: { id: profile.id },
        update: {
          ...profile,
          updatedAt: new Date(profile.updatedAt),
        },
        create: {
          ...profile,
          createdAt: new Date(profile.createdAt),
          updatedAt: new Date(profile.updatedAt),
        },
      }),
    );

    // Run all operations in one transaction
    const updateProfiles = await db.$transaction(operations);

    return NextResponse.json(
      { items: updateProfiles },
      { status: 200, statusText: 'Profiles Updated' },
    );
  } catch (error) {
    console.error('---> route handler error (update profiles):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
