import Image, { type ImageProps } from 'next/image';

import {
  isUploadMediaPath,
  toMediaUrl,
} from '@utils/toMediaUrl';

type MediaImageProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
  fallbackSrc?: string;
};

/**
 * next/image for backend media.
 *
 * Uploads live on the nginx/backend volume, not inside the frontend container.
 * Always use a root-absolute `/uploads/...` path (see toMediaUrl) so locale
 * routes like `/fa/blog/...` do not resolve media as `/fa/uploads/...`.
 */
export default function MediaImage({
  src,
  fallbackSrc = '/images/user-placeholder.png',
  alt,
  unoptimized,
  ...props
}: MediaImageProps) {
  const resolved = toMediaUrl(src) || fallbackSrc;
  const isUpload = isUploadMediaPath(resolved);

  return (
    <Image
      src={resolved}
      alt={alt}
      // Uploads are already WebP from the API; skip the Next optimizer.
      unoptimized={unoptimized ?? isUpload}
      {...props}
    />
  );
}
