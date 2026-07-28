import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { serverApiBaseUrl } from '@lib/api';

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

    const data = await response.json();

    if (!data.isSuccess) {
      return NextResponse.json(data, { status: 400 });
    }

    const cookieStore = await cookies();

    cookieStore.set('candyAccess', data.data.accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    cookieStore.set('candyRefresh', data.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      isSuccess: true,
      data: {
        accessToken: data.data.accessToken,
      },
    });
  } catch {
    return NextResponse.json(
      { isSuccess: false },
      { status: 500 }
    );
  }
}
