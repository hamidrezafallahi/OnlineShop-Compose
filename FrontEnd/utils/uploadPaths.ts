/**
 * Canonical media folders — must stay in sync with Backend Application.Common.UploadPaths.
 *
 * Disk / DB convention:
 *   uploads/{entity-plural}/{entityId}/file.webp   (no leading slash in DB)
 *
 * Public URL (browser / nginx):
 *   /uploads/{entity-plural}/{entityId}/file.webp
 *
 * Legacy seed rows may be flat:
 *   /uploads/categories/some-slug.jpg
 */
export const UPLOAD_ROOT = 'uploads' as const;

export const UploadFolders = {
  brands: 'brands',
  categories: 'categories',
  products: 'products',
  blogs: 'blogs',
  users: 'users',
  landingslides: 'landingslides',
} as const;

export type UploadFolder = (typeof UploadFolders)[keyof typeof UploadFolders];

export function entityUploadDir(folder: UploadFolder, id: number | string): string {
  return `${UPLOAD_ROOT}/${folder}/${id}`;
}
