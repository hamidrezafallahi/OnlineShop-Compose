'use client';

import React, {
  ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuIcon } from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';
import { menuResponse } from '@models/config';

import Sidebar from './sidebar';

type AdminShellProps = {
  menu: menuResponse;
  children: ReactNode;
};

export default function AdminShell({ menu, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <button
          type="button"
          className="admin-icon-btn"
          aria-label={t('admin.openMenu')}
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon config={{ size: 20 }} />
        </button>

        <Link
          href={`/${locale}/admin`}
          className="min-w-0 flex-1 font-semibold text-[var(--admin-text)] truncate"
        >
          {t('admin.dashboardTitle')}
        </Link>

        <div className="flex items-center gap-1.5 shrink-0">
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </header>

      {mobileOpen ? (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          aria-label={t('admin.closeMenu')}
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <Sidebar
        menu={menu}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="admin-main">
        <div className="admin-main-scroll">{children}</div>
      </div>
    </div>
  );
}
