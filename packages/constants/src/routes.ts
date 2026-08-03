/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

export const ignoredRoutes = new Set([
  '/manifest.webmanifest',
  '/auth/sign-out',
  '/auth/signed-out',
  // Add other ignored routes
]);

// Match anything starting with /auth/ or exactly /api/auth
export const authRegex = /^(?:\/auth(?:\/.*)?|\/api\/auth)$/;

// Match exact files
export const ignoredRegex = /^\/manifest\.webmanifest$/;
