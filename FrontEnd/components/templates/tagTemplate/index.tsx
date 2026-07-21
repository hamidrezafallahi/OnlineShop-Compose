import React from 'react';

import TagCard from '@components/molecules/tagCard';
import { RelatedProductByTag } from '@components/organisms/tagOrganisms';
import { ITag } from '@models/tag';

export default function TagTemplate({
  Tag,
}: {
  Tag: ITag;
}) {
   return (
    <>
      <div className="text-center">
        <TagCard tag={{ id: Tag.id, name: Tag.name }} />{" "}
      </div>
      <RelatedProductByTag tagId={Tag.id} />
    </>
  );
}
