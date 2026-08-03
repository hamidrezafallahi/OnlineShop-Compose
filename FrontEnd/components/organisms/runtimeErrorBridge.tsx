'use client';

import { useEffect, useState } from 'react';

import type { LogContext, LogLevel, LogPayload } from '@lib/logger';

type OverlayItem = {
  id: string;
  payload: LogPayload;
};

function toPayload(
  level: LogLevel,
  message: string,
  context?: LogContext,
  err?: unknown,
): LogPayload {
  const error =
    err instanceof Error
      ? { name: err.name, message: err.message, stack: err.stack }
      : err
        ? { message: String(err) }
        : undefined;

  return {
    ts: new Date().toISOString(),
    level,
    message,
    env: process.env.NODE_ENV ?? 'development',
    source: 'client',
    context,
    error,
  };
}

async function forwardToServer(payload: LogPayload) {
  try {
    await fetch('/auth/client-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: payload.level,
        message: payload.message,
        context: payload.context,
        error: payload.error,
      }),
      keepalive: true,
    });
  } catch {
    // Avoid recursive error loops if logging endpoint is down.
  }
}

function printLocal(payload: LogPayload) {
  const line = JSON.stringify(payload);
  if (payload.level === 'error') console.error(line);
  else if (payload.level === 'warn') console.warn(line);
  else console.log(line);
}

export function reportClientError(
  message: string,
  err?: unknown,
  context?: LogContext,
) {
  const payload = toPayload('error', message, { ...context, source: 'client' }, err);
  printLocal(payload);
  void forwardToServer(payload);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('app:client-error', { detail: payload }));
  }
}

/**
 * Captures window errors / unhandled rejections, forwards to server logs,
 * and shows a small overlay in development.
 */
export default function RuntimeErrorBridge() {
  const [items, setItems] = useState<OverlayItem[]>([]);
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      reportClientError(event.message || 'window.onerror', event.error, {
        scope: 'window.onerror',
        url: event.filename,
      });
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      reportClientError('unhandledrejection', event.reason, {
        scope: 'window.unhandledrejection',
      });
    };

    const onAppError = (event: Event) => {
      if (!isDev) return;
      const payload = (event as CustomEvent<LogPayload>).detail;
      if (!payload) return;
      setItems((prev) =>
        [{ id: `${Date.now()}-${Math.random()}`, payload }, ...prev].slice(0, 5),
      );
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    window.addEventListener('app:client-error', onAppError);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
      window.removeEventListener('app:client-error', onAppError);
    };
  }, [isDev]);

  if (!isDev || items.length === 0) return null;

  return (
    <div
      className="z-[9999] fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-3 sm:bottom-3 flex flex-col gap-2 max-w-lg"
      dir="ltr"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-[#111827]/95 shadow-2xl backdrop-blur-md p-3 border border-red-400/40 rounded-xl text-red-100 text-xs"
        >
          <div className="flex justify-between items-start gap-3 mb-1">
            <strong className="text-red-300 text-sm">Client error</strong>
            <button
              type="button"
              className="opacity-70 hover:opacity-100 text-[10px] uppercase"
              onClick={() =>
                setItems((prev) => prev.filter((x) => x.id !== item.id))
              }
            >
              dismiss
            </button>
          </div>
          <p className="mb-1 font-medium text-white break-words">{item.payload.message}</p>
          {item.payload.error?.message ? (
            <p className="opacity-90 break-words">{item.payload.error.message}</p>
          ) : null}
          {item.payload.context?.scope ? (
            <p className="opacity-60 mt-1">scope: {String(item.payload.context.scope)}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
