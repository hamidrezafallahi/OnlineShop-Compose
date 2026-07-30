const isProd = process.env.NODE_ENV === 'production';

export const ACCESS_COOKIE = 'candyAccess';
export const REFRESH_COOKIE = 'candyRefresh';
/** Non-httpOnly flag for client UI only — never stores a token. */
export const SESSION_FLAG_COOKIE = 'candySession';

export const accessCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60,
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
};

export const sessionFlagCookieOptions = {
  httpOnly: false,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
};
