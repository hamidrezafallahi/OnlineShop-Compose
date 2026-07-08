import React, { ReactNode } from 'react';

import { getMenu } from '@lib/config';

import Sidebar from './sidebar';

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const menu = await getMenu()

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar menu={menu}/>
      <div className="w-full overflow-auto transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
