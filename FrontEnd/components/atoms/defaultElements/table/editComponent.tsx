import React from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { EditIcon } from '../../iconComponents';

function EditComponent({ ...props }:{id:string}) {
 const locale = useLocale()
    const {id}=props
  const params = useParams();
  return (
    <Link
      href={`/${locale}/admin/${params.field}/${id}`}
      className="mx-1 text-blue-600 hover:underline"
    >
      <EditIcon />
    </Link>
  );
}

export default EditComponent;
