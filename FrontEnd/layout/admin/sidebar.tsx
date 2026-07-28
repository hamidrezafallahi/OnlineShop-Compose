'use client';

import React, { useMemo, useState } from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  CloseIcon,
  LeftIcon,
  RightIcon,
} from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';
import { cn } from '@lib/utils';
import { menuResponse } from '@models/config';

interface SidebarProps {
  initialOpen?: boolean;
  menu: menuResponse;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  menu,
  initialOpen = true,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [open, setOpen] = useState(initialOpen);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === 'fa';
  const SIDEBAR_WIDTH = 268;
  const SIDEBAR_COLLAPSED = 84;

  const items = menu?.data ?? [];
  const desktopWidth = open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED;

  const activeEndpoint = useMemo(() => {
    const parts = pathname?.split('/') ?? [];
    const adminIndex = parts.findIndex((part) => part === 'admin');
    if (adminIndex < 0) return '';
    return parts[adminIndex + 1] ?? '';
  }, [pathname]);

  return (
    <aside
      id="admin-sidebar"
      data-open={mobileOpen ? 'true' : 'false'}
      style={{ ['--admin-sidebar-width' as string]: `${desktopWidth}px` }}
      className={cn('admin-sidebar', mobileOpen && 'is-open')}
    >
      <div className="admin-sidebar-panel">
        <button
          type="button"
          aria-label={open ? t('admin.collapseMenu') : t('admin.expandMenu')}
          className="admin-icon-btn z-20 absolute top-5 hidden lg:inline-flex"
          onClick={() => setOpen(!open)}
          style={{
            [isRtl ? 'left' : 'right']: -14,
          }}
        >
          {isRtl ? (
            open ? (
              <RightIcon />
            ) : (
              <LeftIcon />
            )
          ) : open ? (
            <LeftIcon />
          ) : (
            <RightIcon />
          )}
        </button>

        <div className="flex justify-between items-center gap-2 px-4 border-[var(--admin-border)] border-b h-16 lg:h-20">
          <div className="flex flex-col justify-center gap-0.5 min-w-0">
            <Link
              href={`/${locale}/admin`}
              onClick={onMobileClose}
              className={cn(
                'font-semibold tracking-tight text-[var(--admin-text)] transition-colors hover:text-primary truncate',
                open ? 'text-lg' : 'lg:text-sm lg:text-center',
              )}
            >
              <span className="lg:hidden">{t('admin.dashboardTitle')}</span>
              <span className="hidden lg:inline">
                {open ? t('admin.dashboardTitle') : t('brand.icon')}
              </span>
            </Link>
            <p className="text-[var(--admin-text-muted)] text-xs lg:hidden">
              {t('admin.dashboard')}
            </p>
            {open ? (
              <p className="hidden lg:block text-[var(--admin-text-muted)] text-xs">
                {t('admin.dashboard')}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            className="admin-icon-btn lg:hidden shrink-0"
            aria-label={t('admin.closeMenu')}
            onClick={onMobileClose}
          >
            <CloseIcon config={{ size: 16 }} />
          </button>
        </div>

        <nav className="flex flex-col flex-1 gap-1 p-3 min-h-0 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-2 py-6 text-[var(--admin-text-muted)] text-xs text-center">
              {t('admin.menuEmpty')}
            </div>
          ) : (
            items.map((item, idx) => {
              const isActive =
                activeEndpoint.toLowerCase() === item.endPoint?.toLowerCase();
              return (
                <Link
                  key={`${item.endPoint}-${idx}`}
                  href={`/${locale}/admin/${item.endPoint}?ByConfig=true`}
                  title={
                    locale === 'fa'
                      ? item.persianDisplayName
                      : item.englishDisplayName
                  }
                  onClick={onMobileClose}
                  className={cn(
                    'admin-nav-item',
                    !open && 'lg:justify-center lg:px-2',
                    isActive && 'admin-nav-item-active',
                  )}
                >
                  <span
                    className="flex justify-center items-center w-6 h-6 shrink-0 [&>svg]:w-5 [&>svg]:h-5"
                    dangerouslySetInnerHTML={{ __html: item.entityIconBase64 }}
                  />
                  <span className={cn('truncate', !open && 'lg:hidden')}>
                    {locale === 'fa'
                      ? item.persianDisplayName
                      : item.englishDisplayName}
                  </span>
                </Link>
              );
            })
          )}
        </nav>

        <div className="flex justify-center items-center gap-2 px-3 border-[var(--admin-border)] border-t min-h-16 lg:h-20">
          <div className="hidden lg:flex items-center gap-2">
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
          <Link
            href={`/${locale}`}
            onClick={onMobileClose}
            className={cn(
              'admin-btn admin-btn-ghost justify-center text-xs w-full lg:w-auto',
              open ? 'lg:ms-auto' : 'lg:hidden',
            )}
          >
            {t('admin.openStore')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
