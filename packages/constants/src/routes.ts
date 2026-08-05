/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { AUTH_URLS } from './paths';

export const ignoredRoutes = new Set([
  '/manifest.webmanifest',
  AUTH_URLS.SIGN_OUT,
  AUTH_URLS.SIGNED_OUT,
  // Add other ignored routes
]);

// Match anything starting with /auth/
export const authRegex = /^\/auth(?:\/.*)?$/;

// Match exact files
export const ignoredRegex = /^\/manifest\.webmanifest$/;
