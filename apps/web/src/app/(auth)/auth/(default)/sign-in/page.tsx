/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { Metadata } from 'next';
import FormAuth from '@web/ui/form/auth';
import { AuthAction } from '@repo/types';
import { BASE_URL_CLIENT } from '@repo/constants';

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
        baseUrl={BASE_URL_CLIENT.WEB}
      />
    </div>
  );
}
