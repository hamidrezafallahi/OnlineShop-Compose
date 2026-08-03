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
 * Uploads live on the nginx volume, not inside the frontend container.
 * Passing them through `/_next/image` makes the optimizer fail with
 * "The requested resource isn't a valid image."
 * Backend already stores WebP, so we serve `/uploads/...` directly via nginx.
 */
export default function MediaImage({
  src,
  fallbackSrc = '/images/user-placeholder.png',
  alt,
  unoptimized,
  ...props
}: MediaImageProps) {
  const resolved = toMediaUrl(src) || fallbackSrc;

  return (
    <Image
      src={resolved}
      alt={alt}
      unoptimized={unoptimized ?? isUploadMediaPath(resolved)}
      {...props}
    />
  );
}
