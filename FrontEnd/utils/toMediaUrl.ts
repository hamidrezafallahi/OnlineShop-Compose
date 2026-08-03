/**
 * Backend stores/returns media paths like `uploads/products/1/x.webp` (no leading slash).
 * Relative to nested routes (e.g. /fa/products) that becomes /fa/uploads/... → 404.
 * Always expose a root-absolute path for <img> / next/image.
 */
export function toMediaUrl(path: string | null | undefined): string {
  if (!path) {
    return '';
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return '';
  }

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
