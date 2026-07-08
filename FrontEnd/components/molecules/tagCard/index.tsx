import React from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';

import { Badge } from '@components/atoms/defaultElements/badge';
import { TagIcon } from '@components/atoms/iconComponents';
import { ITag } from '@models/tag';

export default function TagCard({ tag }: { tag: ITag }) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/tags/${tag.id}`}>
      <Badge variant="secondary" className="rounded-lg">
        <TagIcon /> {tag.name}
      </Badge>
    </Link>
  );
}
