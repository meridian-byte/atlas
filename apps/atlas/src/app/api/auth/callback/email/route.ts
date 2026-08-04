/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_URLS } from '@repo/constants';
import { authEmail } from '@repo/auth';
import { COOKIE_NAME } from '@repo/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baseUrl = searchParams.get('baseUrl');

  try {
    const redirect = await authEmail({ searchParams, baseUrl });

    const response = NextResponse.redirect(redirect);

    response.cookies.delete({
      name: COOKIE_NAME.AUTH.EMAIL,
      path: '/', // must match original path
    });

    return response;
  } catch (error) {
    console.error('---> route handler error (callback email):', error);

    return NextResponse.redirect(
      `${baseUrl + AUTH_URLS.ERROR}?error=${'Authentication Error'}&message=${encodeURIComponent((error as Error).message)}`,
    );
  }
}
