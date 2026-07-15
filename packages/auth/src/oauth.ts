import { createClientcloudbaseServer } from '@repo/cloudbase';
import { profileCreate } from '@repo/handlers';
import { segmentFullName, linkify } from '@repo/utils';
import { AUTH_URLS } from '@repo/constants';
import { sharedUserHandle } from './shared';

export const authOauth = async (params: { searchParams: URLSearchParams }) => {
  const { searchParams } = params;

  const code = searchParams.get('code');

  if (!code) {
    throw new Error('The link is broken');
  }

  const supabase = await createClientcloudbaseServer();

  const { error: exchangeError, data } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) throw exchangeError;

  const nameSegments = segmentFullName(data.user.user_metadata.name || '');

  // create profile if doesn't exist
  const { profile, existed } = await profileCreate({
    id: data.user?.id,
    first_name: nameSegments.first,
    last_name: nameSegments.last,
    user_name: linkify(data.user.email || ''),
    phone: data.user.phone || '',
    email: data.user.email || '',
    avatar: data.user.user_metadata.avatar_url || '',
  });

  sharedUserHandle({ supabase, profile, existed });

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? AUTH_URLS.REDIRECT.DEFAULT;

  return { next };
};
