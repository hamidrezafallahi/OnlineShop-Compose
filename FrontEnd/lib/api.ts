const DEFAULT_SITE_URL = 'https://www.hamidrezafalahi.ir';
/** Docker Compose service name — used by Next.js RSC / Route Handlers. */
const DEFAULT_INTERNAL_API_ORIGIN = 'http://backend:8080';

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
// Relative "/api" breaks Node fetch (ERR_INVALID_URL).
const internalServerOrigin =
  process.env.INTERNAL_SERVER_SIDE_API_URL?.trim() ||
  process.env.NEXT_PUBLIC_INTERNAL_API_URL?.trim() ||
  DEFAULT_INTERNAL_API_ORIGIN;

export const serverApiBaseUrl = ensureApiSuffix(internalServerOrigin);

export const siteBaseUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  DEFAULT_SITE_URL
);

/** Guard for server-side fetch callers. */
export function requireAbsoluteUrl(url: string, label = 'API URL') {
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(
      `${label} must be absolute (got "${url}"). Set INTERNAL_SERVER_SIDE_API_URL=http://backend:8080`
    );
  }
  return url;
}

// Backward-compatible aliases while callers are migrated.
export const apiBaseUrl = browserApiBaseUrl;
export const apiBaseServerSideUrl = serverApiBaseUrl;
