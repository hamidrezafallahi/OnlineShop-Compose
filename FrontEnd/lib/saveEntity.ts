import { browserApiBaseUrl } from '@/lib/api';
import { SimpleResponse } from '@models/base';

/**
 * Persist an admin entity.
 *
 * File uploads must NOT go through Next.js Server Actions: the browser POSTs the
 * whole multipart body to the current page URL, which commonly ends as
 * ERR_CONNECTION_CLOSED under nginx / body-size limits.
 * Instead we POST/PUT via the cookie-aware BFF at /auth/bff/*.
 *
 * Cache busting is done by the caller via router.refresh() after navigation —
 * calling a Server Action here previously surfaced "Failed to fetch" into the
 * locale error boundary when the action hop failed.
 */
export async function saveEntity({
  endPoint,
  body,
  method,
}: {
  endPoint: string;
  body: FormData | Record<string, unknown>;
  method: 'POST' | 'PUT';
}): Promise<SimpleResponse<any>> {
  try {
    const path = endPoint.replace(/^\/+/, '');
    const isFormData =
      typeof FormData !== 'undefined' && body instanceof FormData;

    const response = await fetch(`${browserApiBaseUrl}/${path}`, {
      method,
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData
        ? undefined
        : { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store',
    });

    let data: SimpleResponse<any>;
    try {
      data = await response.json();
    } catch {
      return {
        data: null,
        isSuccess: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    if (!response.ok && data?.isSuccess !== true) {
      return {
        data: data?.data ?? null,
        isSuccess: false,
        error:
          data?.error ||
          `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to save entity';
    return {
      data: null,
      isSuccess: false,
      error: message,
    };
  }
}
