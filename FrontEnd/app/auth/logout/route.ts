import { NextResponse } from 'next/server';

import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  SESSION_FLAG_COOKIE,
} from '@lib/auth-cookies';

export async function POST() {
  const res = NextResponse.json({ isSuccess: true });
  res.cookies.set(ACCESS_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  res.cookies.set(SESSION_FLAG_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
