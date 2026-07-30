import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { serverApiBaseUrl } from '@lib/api';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  SESSION_FLAG_COOKIE,
  accessCookieOptions,
  refreshCookieOptions,
  sessionFlagCookieOptions,
} from '@lib/auth-cookies';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
    const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: 'Refresh token not found',
        },
        { status: 401 }
      );
    }

    const response = await fetch(`${serverApiBaseUrl}/Identity/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });

    let data: {
      isSuccess?: boolean;
      data?: {
        accessToken?: string;
        refreshToken?: string;
      };
    };

    try {
      data = await response.json();
    } catch {
      return NextResponse.json(
        { isSuccess: false, message: 'Invalid refresh response' },
        { status: 502 }
      );
    }

    if (!response.ok || !data?.isSuccess || !data.data?.accessToken) {
      const res = NextResponse.json(
        {
          isSuccess: false,
          message: 'Refresh failed',
        },
        { status: 401 }
      );
      res.cookies.set(ACCESS_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
      res.cookies.set(REFRESH_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
      res.cookies.set(SESSION_FLAG_COOKIE, '', { path: '/', maxAge: 0 });
      return res;
    }

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken;

    const res = NextResponse.json({
      isSuccess: true,
      data: {
        refreshed: true,
      },
    });

    res.cookies.set(ACCESS_COOKIE, newAccessToken, accessCookieOptions);

    if (newRefreshToken) {
      res.cookies.set(REFRESH_COOKIE, newRefreshToken, refreshCookieOptions);
    }
    res.cookies.set(SESSION_FLAG_COOKIE, '1', sessionFlagCookieOptions);

    return res;
  } catch (error) {
    console.error('REFRESH ERROR:', error);

    return NextResponse.json(
      {
        isSuccess: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
