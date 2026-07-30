import { jwtDecode } from 'jwt-decode';
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
import type { TokenPayload } from '@components/templates/register/type';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${serverApiBaseUrl}/Identity/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

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
    let role = 'Customer';
    try {
      const decoded = jwtDecode<TokenPayload>(accessToken);
      if (decoded?.role) {
        role = decoded.role;
      }
    } catch {
      // keep default role
    }

    // Never expose tokens to the browser JS — only httpOnly cookies + role for UX.
    const res = NextResponse.json({
      isSuccess: true,
      data: {
        role,
      },
    });

    res.cookies.set(ACCESS_COOKIE, accessToken, accessCookieOptions);
    if (refreshToken) {
      res.cookies.set(REFRESH_COOKIE, refreshToken, refreshCookieOptions);
    }
    res.cookies.set(SESSION_FLAG_COOKIE, '1', sessionFlagCookieOptions);

    return res;
  } catch {
    return NextResponse.json(
      { isSuccess: false, error: 'Login proxy failed' },
      { status: 500 }
    );
  }
}
