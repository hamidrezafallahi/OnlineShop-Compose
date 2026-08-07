import React from 'react';

import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

import {
  ArrowLongLeft,
  ArrowLongRight,
  CalendarIcon,
  UserIcon,
} from '@components/atoms/iconComponents';
import MediaImage from '@components/atoms/MediaImage';
import { IBlog } from '@models/Blog';

function formatBlogDate(value: Date | string | null | undefined, locale: string) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export async function BlogCard({ blog }: { blog: IBlog }) {
  const locale = await getLocale();
  const t = await getTranslations('blog');
  const isRtl = locale === 'fa';

  const title = (isRtl ? blog.titleFa : blog.titleEn) || blog.titleFa || blog.titleEn;
  const excerpt =
    (isRtl ? blog.excerptFa : blog.excerptEn) ||
    blog.excerptFa ||
    blog.excerptEn ||
    '';
  const dateLabel = formatBlogDate(blog.updatedAt || blog.createdAt, locale);
  const hasThumbnail = Boolean(blog.thumbnailFile?.trim());

  return (
    <Link
      href={`/${locale}/blog/${blog.slug}`}
      className="store-card group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--primary-color)_45%,transparent)] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[color-mix(in_srgb,var(--primary-color)_8%,var(--store-surface-muted))]">
        {hasThumbnail ? (
          <MediaImage
            src={blog.thumbnailFile}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[color-mix(in_srgb,var(--store-text)_45%,transparent)]">
            {t('title')}
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-80" />
      </div>

      <div
        className={`flex flex-1 flex-col gap-3 p-5 sm:p-6 ${
          isRtl ? 'text-right' : 'text-left'
        }`}
      >
        {dateLabel ? (
          <div className="inline-flex items-center gap-1.5 text-xs text-[color-mix(in_srgb,var(--store-text)_58%,transparent)]">
            <CalendarIcon />
            <time dateTime={String(blog.updatedAt || blog.createdAt)}>
              {dateLabel}
            </time>
          </div>
        ) : null}

        <h2 className="text-lg sm:text-xl font-bold leading-snug text-[var(--store-text)] transition-colors group-hover:text-[var(--primary-color)] line-clamp-2">
          {title}
        </h2>

        {excerpt ? (
          <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--store-text)_72%,transparent)] line-clamp-3">
            {excerpt}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2 border-t border-[color-mix(in_srgb,var(--store-border)_80%,transparent)]">
          {blog.authorName ? (
            <div className="inline-flex min-w-0 items-center gap-1.5 text-xs text-[color-mix(in_srgb,var(--store-text)_60%,transparent)]">
              <UserIcon />
              <span className="truncate">{blog.authorName}</span>
            </div>
          ) : (
            <span />
          )}

          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--primary-color)]">
            {t('readMore')}
            {isRtl ? (
              <ArrowLongLeft
                config={{ className: 'w-4 h-4 transition-transform group-hover:-translate-x-0.5' }}
              />
            ) : (
              <ArrowLongRight
                config={{ className: 'w-4 h-4 transition-transform group-hover:translate-x-0.5' }}
              />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
