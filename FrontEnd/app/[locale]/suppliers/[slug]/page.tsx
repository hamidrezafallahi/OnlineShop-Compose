import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import SupplierTemplate from '@components/templates/supplierTemplate';
import { serverApiBaseUrl } from '@lib/api';
import { buildPageMetadata } from '@lib/seo';
import { SimpleResponse } from '@models/base';
import { IUser } from '@models/user';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  try {
    const response = await fetch(`${serverApiBaseUrl}/Users/${slug}`, {
      next: { revalidate: 36 },
    });

    if (response.status === 404) {
      return buildPageMetadata({
        locale,
        path: `suppliers/${slug}`,
        title: tStore('notFound'),
        description: tStore('notFoundHint'),
        noIndex: true,
      });
    }

    const result: SimpleResponse<IUser> = await response.json();
    if (!result.isSuccess) {
      return buildPageMetadata({
        locale,
        path: `suppliers/${slug}`,
        title: tStore('notFound'),
        description: '',
        noIndex: true,
      });
    }

    return buildPageMetadata({
      locale,
      path: `suppliers/${slug}`,
      title: result.data.fullName,
      description: result.data.userDescription,
      images: [result.data.userImage],
    });
  } catch {
    return buildPageMetadata({
      locale,
      path: `suppliers/${slug}`,
      title: tStore('loadError'),
      description: '',
      noIndex: true,
    });
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const response = await fetch(`${serverApiBaseUrl}/Users/${slug}`, {
    next: { revalidate: 36 },
  });

  const { data }: { data: IUser } = await response.json();

  return (
    <div className="store-page !pt-6">
      <SupplierTemplate supplier={data} />
    </div>
  );
}
