import React from 'react';

import {
  Navigator,
  ShareButtons,
} from '@components/molecules/blog';

export async function BlogSidebar({ ...props }: IProps) {
  const { locale } = props;
  return (
    <aside className="lg:w-1/3">
      <div className="top-24 sticky space-y-6">
        <ShareButtons locale={locale} />
        <Navigator locale={locale}/>
      </div>
    </aside>
  );
}
