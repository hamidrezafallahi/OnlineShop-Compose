import { Mutex } from 'async-mutex';

import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import {
  deleteCookie,
  getTokens,
  showErrorToast,
} from '@utils/core';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
          deleteCookie("candyAccess");

          if (typeof window !== "undefined") {
            window.location.href =
              "/fa/register";
          }

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

    // retry request
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
    baseUrl,

    credentials: "include",

    prepareHeaders: (headers) => {
      const token = getTokens("candyAccess");

      if (token?.val) {
        headers.set(
          "Authorization",
          `Bearer ${token.val}`
        );
      }

      return headers;
    },
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
      "/api/auth/refresh",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    return data.success === true;
  } catch (err) {
    console.error("Refresh token error:", err);

    return false;
  }
}
