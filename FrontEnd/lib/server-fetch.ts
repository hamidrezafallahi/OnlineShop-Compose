'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { requireAbsoluteUrl, serverApiBaseUrl } from './api';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  SESSION_FLAG_COOKIE,
  accessCookieOptions,
  refreshCookieOptions,
  sessionFlagCookieOptions,
} from './auth-cookies';
import { logger } from './logger';

type FetchOptions = {
  endpoint: string;
  method?: string;
  body?: FormData | Record<string, unknown> | null;
};

export async function authenticatedFetch<T>({
  endpoint,
  method = 'GET',
  body,
}: FetchOptions): Promise<T> {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
  let refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  const url = requireAbsoluteUrl(
    `${serverApiBaseUrl}/${endpoint.replace(/^\/+/, '')}`,
    'authenticatedFetch URL',
  );

  async function execute(token?: string) {
    return fetch(url, {
      method,
      headers: getHeaders(body, token),
      body: body instanceof FormData
        ? body
        : body
          ? JSON.stringify(body)
          : undefined,
    });
  }

  let response = await execute(accessToken);

  // access token expired
  if (response.status === 401) {
    if (!refreshToken) {
      clearTokens(cookieStore);
      redirect('/fa/register');
    }

    const refreshResult = await refreshTokens({
      accessToken,
      refreshToken,
    });

    if (!refreshResult.success) {
      clearTokens(cookieStore);
      redirect('/fa/register');
    }

    accessToken = refreshResult.accessToken;
    refreshToken = refreshResult.refreshToken;

    cookieStore.set(ACCESS_COOKIE, accessToken!, accessCookieOptions);
    cookieStore.set(REFRESH_COOKIE, refreshToken!, refreshCookieOptions);
    cookieStore.set(SESSION_FLAG_COOKIE, '1', sessionFlagCookieOptions);

    // retry
    response = await execute(accessToken);
  }

  if (response.status === 403) {
    logger.warn('authenticatedFetch forbidden', {
      scope: 'server-fetch',
      source: 'server',
      url,
      status: 403,
    });
    throw new Error('FORBIDDEN');
  }

  if (!response.ok) {
    logger.error('authenticatedFetch HTTP error', {
      scope: 'server-fetch',
      source: 'server',
      url,
      status: response.status,
    });
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

function getHeaders(
  body: FetchOptions['body'],
  token?: string
) {
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

async function refreshTokens({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}) {
  try {
    const response = await fetch(
      requireAbsoluteUrl(
        `${serverApiBaseUrl}/Identity/refresh-token`,
        'refreshTokens URL',
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          ip: 'string',
          userAgent: 'string',
        }),
      }
    );

    if (!response.ok) {
      return { success: false };
    }

    const res = await response.json();

    if (!res.isSuccess) {
      return { success: false };
    }

    return {
      success: true,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
  } catch {
    return { success: false };
  }
}

function clearTokens(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  cookieStore.delete(SESSION_FLAG_COOKIE);
}
