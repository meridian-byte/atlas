/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

const isProduction = process.env.NODE_ENV === 'production';
const useRemoteServer = process.env.NEXT_PUBLIC_USE_REMOTE_SERVER === 'true';

// Select WEB client host
export const HOSTNAME_CLIENT_WEB = isProduction
  ? process.env.NEXT_PUBLIC_HOST_CLIENT_WEB_PROD
  : process.env.NEXT_PUBLIC_HOST_CLIENT_WEB_DEV;

export const getUrlPrefix = (host: string | undefined) => {
  if (!host) return 'http://';
  return host.includes('localhost') ? 'http://' : 'https://';
};

export const HOSTED_BASE_URL = {
  CLIENT_WEB: process.env.NEXT_PUBLIC_HOST_CLIENT_WEB_PROD || '',
  SERVER: process.env.NEXT_PUBLIC_HOST_SERVER_PROD || '',
};

export const PRODUCTION_BASE_URL_CLIENT_WEB = {
  DEFAULT: `https://meridianbyte.com`,
};

export const GEO_DATA_URL = {
  COUNTRIES: `${process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL}`,
};

export const AUTH_URLS = {
  SIGN_IN: `/auth/sign-in`,
  SIGN_UP: `/auth/sign-up`,
  CHECK_EMAIL: `/auth/check-email`,
  ERROR: `/auth/error`,
  SIGN_OUT: `/auth/sign-out`,
  REDIRECT: {
    DEFAULT: '/',
  },
};

export const BASE_URL_CLIENT = {
  WEB: `${getUrlPrefix(HOSTNAME_CLIENT_WEB)}${HOSTNAME_CLIENT_WEB}`,
};
