export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogContext = Record<string, unknown> & {
  scope?: string;
  url?: string;
  status?: number;
  digest?: string;
  source?: 'server' | 'client';
};

export type LogPayload = {
  ts: string;
  level: LogLevel;
  message: string;
  env: string;
  source: 'server' | 'client';
  context?: LogContext;
  error?: {
    name?: string;
    message?: string;
    stack?: string;
  };
};

function serializeError(err: unknown): LogPayload['error'] {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  }
  if (err == null) return undefined;
  return { message: String(err) };
}

export function buildLogPayload(
  level: LogLevel,
  message: string,
  context?: LogContext,
  err?: unknown,
): LogPayload {
  const source = context?.source ?? (typeof window === 'undefined' ? 'server' : 'client');
  const { source: _drop, ...rest } = context ?? {};

  return {
    ts: new Date().toISOString(),
    level,
    message,
    env: process.env.NODE_ENV ?? 'development',
    source,
    context: Object.keys(rest).length ? rest : undefined,
    error: serializeError(err),
  };
}

/** Structured JSON logs — visible in Docker / GitHub Actions / browser console. */
export function writeLog(payload: LogPayload) {
  const line = JSON.stringify(payload);

  switch (payload.level) {
    case 'error':
      console.error(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    default:
      console.log(line);
  }
}

export const logger = {
  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'development') return;
    writeLog(buildLogPayload('debug', message, context));
  },
  info(message: string, context?: LogContext) {
    writeLog(buildLogPayload('info', message, context));
  },
  warn(message: string, context?: LogContext, err?: unknown) {
    writeLog(buildLogPayload('warn', message, context, err));
  },
  error(message: string, context?: LogContext, err?: unknown) {
    writeLog(buildLogPayload('error', message, context, err));
  },
};
