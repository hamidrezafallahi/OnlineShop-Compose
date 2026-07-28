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

// Browser always uses same-origin /api (nginx → backend).
// Server components / Route Handlers must use an absolute internal URL.
// Relative "/api" in Node fetch is either invalid or hairpins through public nginx (slow/fragile).
const internalServerOrigin =
  process.env.INTERNAL_SERVER_SIDE_API_URL ??
  process.env.NEXT_PUBLIC_INTERNAL_API_URL ??
  (process.env.NODE_ENV === 'production' ? 'http://backend:8080' : '');

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