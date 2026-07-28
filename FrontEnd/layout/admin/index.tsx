import React, { ReactNode } from 'react';

import { getMenu } from '@lib/config';

import AdminShell from './AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menu = await getMenu();

  return <AdminShell menu={menu}>{children}</AdminShell>;
}
