import React from 'react';

import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { ApiResponse } from '@models/base';
import { IUser } from '@models/user';

const baseUrl = process.env.INTERNAL_API_URL;

export async function BrandSuppliers({ id }: { id: number }) {
  const response = await fetch(
    `${baseUrl}/api/Brands/getProductsSuppliersByBrandId/${id}`,
    {
      cache: "no-store",
    },
  );
  const suppliersResponse: ApiResponse<IUser[]> = await response.json();
  const suppliers: IUser[] = suppliersResponse.data;
  const locale = await getLocale();

  return (
    <div className="my-10">
      <h2 className="mb-4 font-bold text-xl">تامین‌کنندگان برند</h2>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {suppliers.map((s) => (
          <Link
            key={s.id}
            href={`/${locale}/suppliers/${s.id}`}
            className="flex flex-col items-center bg-white shadow-sm hover:shadow-lg p-4 rounded-2xl transition"
          >
            <div className="relative flex justify-center items-center bg-gray-50 mb-3 rounded-full w-24 h-24 overflow-hidden">
              <Image
                src={s.userImage}
                alt={s.fullName}
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-center">
              {s.fullName}
            </h3>
            <span className="mt-1 text-gray-400 text-xs">{s.email}</span>
            <span className="mt-1 text-gray-400 text-xs">{s.phoneNumber}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
