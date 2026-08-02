import { Mutex } from 'async-mutex';

import {
  browserApiBaseUrl,
  browserAuthBaseUrl,
} from '@lib/api';
import {
  SESSION_FLAG_COOKIE,
} from '@lib/auth-cookies';
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import {
  deleteCookie,
  showErrorToast,
} from '@utils/core';

const mutex = new Mutex();

export async function baseQueryByToken(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) {
  await mutex.waitForUnlock();

  let result: any = await baseQueryWithAuth(
    args,
    api,
    extraOptions
  );

  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshed =
          await refreshAccessToken();

        if (!refreshed) {
          deleteCookie(SESSION_FLAG_COOKIE);
          await fetch(`${browserAuthBaseUrl}/logout`, {
            method: 'POST',
            credentials: 'include',
          }).catch(() => undefined);

          return {
            error: {
              status: 401,
              data: "Unable to refresh token",
            },
          };
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
    }

    result = await baseQueryWithAuth(
      args,
      api,
      extraOptions
    );
  }

  return result;
}

async function baseQueryWithAuth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: browserApiBaseUrl,
    credentials: "include",
  });

  const result = await rawBaseQuery(
    args,
    api,
    extraOptions
  );

  if (result.error?.status === 403) {
    showErrorToast(
      "شما دسترسی لازم برای انجام این کار را ندارید"
    );
  }

  return result;
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(
      `${browserAuthBaseUrl}/refresh`,
      {
        method: "POST",
        credentials: "include",
         headers: {
        "Content-Type": "application/json",
    },
    body:  JSON.stringify({}),
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return Boolean(data.isSuccess);
  } catch (err) {
    console.error("Refresh token error:", err);

    return false;
  }
}
