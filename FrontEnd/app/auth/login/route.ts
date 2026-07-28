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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${serverApiBaseUrl}/Identity/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    let data: {
      isSuccess?: boolean;
      error?: string;
      data?: {
        accessToken?: string;
        refreshToken?: string;
      };
    };

    try {
      data = await response.json();
    } catch {
      return NextResponse.json(
        { isSuccess: false, error: 'Invalid login response' },
        { status: 502 }
      );
    }

    if (!response.ok || !data?.isSuccess || !data.data?.accessToken) {
      return NextResponse.json(
        data?.isSuccess === false
          ? data
          : {
              isSuccess: false,
              error: data?.error ?? 'Login failed',
            },
        { status: response.ok ? 400 : response.status }
      );
    }

    const { accessToken, refreshToken } = data.data;

    const res = NextResponse.json({
      isSuccess: true,
      data: {
        accessToken,
        refreshToken: refreshToken ?? null,
      },
    });

    res.cookies.set('candyAccess', accessToken, accessCookieOptions);

    if (refreshToken) {
      res.cookies.set('candyRefresh', refreshToken, refreshCookieOptions);
    }

    return res;
  } catch {
    return NextResponse.json(
      { isSuccess: false, error: 'Login proxy failed' },
      { status: 500 }
    );
  }
}
