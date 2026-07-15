import React from 'react';

import { getTranslations } from 'next-intl/server';

import {
  SimpleSupplierCard,
} from '@components/molecules/supplierCard/simpleSupplierCard';
import { PagedResponse } from '@models/base';
import { IUser } from '@models/user';

const baseUrl = process.env.INTERNAL_API_URL;

export async function CategorySupplierExtended({ id }: { id: number }) {
  const response = await fetch(
    `${baseUrl}/api/productOffers/getSuppliersByCategoryId?CategoryId=${id}`,
    {
      cache: "no-store",
    },
  );
  const suppliersResponse: PagedResponse<IUser> = await response.json();
  const suppliers: IUser[] = suppliersResponse.data.records;
  const t = await getTranslations();
 
  return (
    <div className="gap-5 grid grid-cols-1 lg:grid-cols-4">
      {suppliers.length>0 ? suppliers.map((supplier: IUser, index: number) => (
        <SimpleSupplierCard key={index} supplier={supplier} />
      )):(<div>{t("category.noCategorySupplier")}</div>)}
    </div>
  );
}
