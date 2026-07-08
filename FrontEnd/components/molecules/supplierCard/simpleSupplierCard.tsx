import React from 'react';

import {
  getLocale,
  getTranslations,
} from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { IUser } from '@models/user';

export async function SimpleSupplierCard({
  supplier,
}: {
  supplier: IUser;
}) {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <Link
      className="group relative flex justify-between items-start bg-white hover:shadow-xl mb-4 p-6 border border-gray-100 hover:border-gray-200 rounded-2xl transition-all duration-300"
      href={`/${locale}/suppliers/${supplier.id}`}
    >
      <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
        <Image
          alt={supplier.fullName}
          src={supplier.image ?? ""}
          width={64}
          height={64}
          className="rounded-xl ring-4 ring-gray-50 group-hover:ring-primary/10 w-16 h-16 object-cover"
        />
      </div>
      <div className='text-center'>
        <div className="font-bold text-gray-800">
          <div>{t("register.fullName")}:</div> 
          <div> {supplier.fullName}</div> 
        </div>
 
        {supplier.userDescription &&<div className="mb-4 text-gray-500 text-xs line-clamp-2 leading-5">
          {t("register.userDescription")}:{supplier.userDescription}
        </div>}
       {supplier.email&& <div className="mb-4 text-gray-500 text-xs line-clamp-2 leading-5">
         {t("register.email")} : {supplier.email}
        </div>}
        {supplier.phoneNumber && <div className="mb-4 text-gray-500 text-xs line-clamp-2 leading-5">
          {t("register.phoneNumber")} : {supplier.phoneNumber}
        </div>}
      </div>
    </Link>
  );
}
