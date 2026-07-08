import React from 'react';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { IUser } from '@models/user';

export default function SupplierCard({
  supplier,
}: {
  supplier: IUser;
}) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/suppliers/${supplier.id}`}
      className="group relative bg-white shadow-sm hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative flex justify-center items-center bg-gray-50 w-full h-48">
        <Image
          src={
            supplier.image && supplier.image !== ''
              ? supplier.image
              : '/images/user-placeholder.png'
          }
          alt={supplier.fullName}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-2 p-4 sm:p-5">
        <div>
          <h3 className="font-semibold text-gray-800">
            {supplier.fullName}
          </h3>
          <p className="text-gray-500 text-xs">
            {supplier.email}
          </p>
        </div>

        <div className="space-y-1 text-gray-600 text-xs">
          <p>📞 {supplier.phoneNumber || '—'}</p>
          <p>
            {supplier.role
              ? `نقش: ${supplier.role}`
              : 'تامین‌کننده'}
          </p>
        </div>

        {supplier.userDescription && (
          <p className="text-gray-400 text-xs line-clamp-2">
            {supplier.userDescription}
          </p>
        )}

        <span className="inline-block pt-2 font-medium text-primary text-sm">
          مشاهده تامین‌کننده →
        </span>
      </div>
    </Link>
  );
}