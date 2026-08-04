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
      const profileExists = !!(await db.profile.findUnique({
        where: { id: profileId },
      }));

      const profileRecord = await db.profile.upsert({
        where: { id: profileId },
        update: profile,
        create: profile,
      });

      return {
        profile: profileRecord,
        existed: profileExists,
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
