'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const baseUrl = process.env.INTERNAL_API_URL;

type FetchOptions = {
  endpoint: string;
  method?: string;
  body?: any;
};

export async function authenticatedFetch<T>({
  endpoint,
  method = 'GET',
  body,
}: FetchOptions): Promise<T> {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get('candyAccess')?.value;
  let refreshToken = cookieStore.get('candyRefresh')?.value;

  async function execute(token?: string) {
    return fetch(`${baseUrl}api/${endpoint}`, {
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

    cookieStore.set('candyAccess', accessToken!);
    cookieStore.set('candyRefresh', refreshToken!);

    // retry
    response = await execute(accessToken);
  }

  if (response.status === 403) {
    throw new Error('FORBIDDEN');
  }

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

function getHeaders(body: any, token?: string) {
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
      `${baseUrl}api/Identity/refresh-token`,
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

function clearTokens(cookieStore: any) {
  cookieStore.delete('candyAccess');
  cookieStore.delete('candyRefresh');
}
