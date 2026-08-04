import React from 'react';

import { getTranslations } from 'next-intl/server';

import {
  SimpleSupplierCard,
} from '@components/molecules/supplierCard/simpleSupplierCard';
import { serverApiBaseUrl } from '@lib/api';
import { IUser } from '@models/user';

export async function CategorySupplierExtended({ id }: { id: number }) {
  const t = await getTranslations();

  try {
    const response = await fetch(
      `${serverApiBaseUrl}/productOffers/getSuppliersByCategoryId?CategoryId=${id}`,
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return <div>{t('category.noCategorySupplier')}</div>;
    }

    const suppliersResponse = await response.json();
    const payload = suppliersResponse?.data;
    const suppliers: IUser[] = Array.isArray(payload?.records)
      ? payload.records
      : Array.isArray(payload)
        ? payload
        : [];

    return (
      <div className="gap-5 grid grid-cols-1 lg:grid-cols-4">
        {suppliers.length > 0 ? (
          suppliers.map((supplier: IUser, index: number) => (
            <SimpleSupplierCard key={supplier.id ?? index} supplier={supplier} />
          ))
        ) : (
          <div>{t('category.noCategorySupplier')}</div>
        )}
      </div>
    );
  } catch {
    return <div>{t('category.noCategorySupplier')}</div>;
  }
}
