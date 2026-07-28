import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { serverApiBaseUrl } from '@lib/api';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken =
      cookieStore.get('candyRefresh')?.value;

    const accessToken =
      cookieStore.get('candyAccess')?.value;

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

    const data = await response.json();

    if (!response.ok || !data?.isSuccess) {
      cookieStore.delete('candyAccess');
      cookieStore.delete('candyRefresh');

      return NextResponse.json(
        {
          isSuccess: false,
          message: 'Refresh failed',
        },
        { status: 401 }
      );
    }

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken;

    cookieStore.set('candyAccess', newAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    cookieStore.set(
      'candyRefresh',
      newRefreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      }
    );

    return NextResponse.json({
      isSuccess: true,
      data: {
        accessToken: newAccessToken,
      },
    });
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
