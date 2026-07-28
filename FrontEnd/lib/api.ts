const DEFAULT_SITE_URL = 'https://www.hamidrezafalahi.ir';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function ensureApiSuffix(value: string) {
  const normalized = trimTrailingSlash(value);

  if (!normalized) {
    return '';
  }

  return normalized.endsWith('/api')
    ? normalized
    : `${normalized}/api`;
}

export const browserApiBaseUrl = '/api';
export const browserAuthBaseUrl = '/auth';

const internalServerOrigin =
  process.env.INTERNAL_SERVER_SIDE_API_URL ??
  process.env.NEXT_PUBLIC_INTERNAL_API_URL ??
  '';

export const serverApiBaseUrl =
  ensureApiSuffix(internalServerOrigin) || browserApiBaseUrl;

export const siteBaseUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  DEFAULT_SITE_URL
);

// Backward-compatible aliases while callers are migrated.
export const apiBaseUrl = browserApiBaseUrl;
export const apiBaseServerSideUrl = serverApiBaseUrl;