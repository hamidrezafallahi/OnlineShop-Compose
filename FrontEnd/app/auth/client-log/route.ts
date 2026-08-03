import { NextRequest, NextResponse } from 'next/server';

import { buildLogPayload, writeLog, type LogLevel } from '@lib/logger';

const MAX_BODY_BYTES = 8_000;

/**
 * Accepts client-side error reports and prints structured JSON to stdout
 * so they appear in `docker logs shop-frontend-*` / VPS logs.
 *
 * Mounted under /auth/* because nginx proxies all /api/* to the ASP.NET backend.
 */
export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: 'payload too large' }, { status: 413 });
    }

    const body = JSON.parse(raw) as {
      level?: LogLevel;
      message?: string;
      context?: Record<string, unknown>;
      error?: { name?: string; message?: string; stack?: string };
    };

    const level: LogLevel =
      body.level === 'warn' || body.level === 'info' || body.level === 'debug'
        ? body.level
        : 'error';

    const payload = buildLogPayload(
      level,
      body.message || 'client-report',
      {
        source: 'client',
        scope: 'client-log-route',
        ...(body.context ?? {}),
        userAgent: request.headers.get('user-agent') ?? undefined,
      },
      body.error
        ? Object.assign(new Error(body.error.message || 'client error'), {
            name: body.error.name || 'ClientError',
            stack: body.error.stack,
          })
        : undefined,
    );

    writeLog(payload);
    return NextResponse.json({ ok: true });
  } catch (err) {
    writeLog(
      buildLogPayload(
        'error',
        'client-log route failed',
        { source: 'server', scope: 'auth/client-log' },
        err,
      ),
    );
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
