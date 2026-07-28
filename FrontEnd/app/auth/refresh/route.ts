import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { serverApiBaseUrl } from '@lib/api';

const accessCookieOptions = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
};

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get('candyRefresh')?.value;
    const accessToken = cookieStore.get('candyAccess')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: 'Refresh token not found',
        },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${serverApiBaseUrl}/Identity/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );

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
      res.cookies.delete('candyAccess');
      res.cookies.delete('candyRefresh');
      return res;
    }

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken;

    const res = NextResponse.json({
      isSuccess: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken ?? null,
      },
    });

    res.cookies.set('candyAccess', newAccessToken, accessCookieOptions);

    if (newRefreshToken) {
      res.cookies.set(
        'candyRefresh',
        newRefreshToken,
        refreshCookieOptions
      );
    }

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
