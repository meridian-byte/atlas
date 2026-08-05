/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { Metadata } from 'next';
import FormAuth from '@atlas/ui/form/auth';
import { AuthAction } from '@repo/types';
import { BASE_URL } from '@repo/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Sign In' };

export default function SignIn() {
  return (
    <div>
      <FormAuth
        action={AuthAction.SIGN_IN}
        header={{
          title: 'Welcome Back!',
          desc: 'Sign in to access your personalized experience.',
        }}
        baseUrl={BASE_URL.ATLAS}
      />
    </div>
  );
}
