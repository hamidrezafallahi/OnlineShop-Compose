import { SimpleResponse } from '@models/base';
import {
  EnumTargetType,
  IComment,
} from '@models/comment';

import ProductCommentForm from './productCommentForm';

const baseUrl = process.env.INTERNAL_API_URL;

interface ProductCommentsProps {
  id: number;
  locale?: string;
}

export default async function ProductComments({ id,locale }: ProductCommentsProps) {
  if (!id) throw new Error("Product ID is required");

  const response = await fetch(
    `${baseUrl}/api/Comments/${EnumTargetType.Product}/${id}`,
    {
      next: { revalidate: 36 }, // ISR
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const comments:SimpleResponse<IComment[]> = await response.json();
  return (
    <section className="space-y-4">
      {comments.data.length === 0 && (
        <p className="text-gray-500 text-sm">
          هنوز نظری برای این محصول ثبت نشده است.
        </p>
      )}

      {comments.data.map((c: IComment) => (
        <article key={c.id} className="pb-3 border-b text-sm">
          <p className="font-medium">{c.userFullName}</p>
          <p className="mt-1 text-gray-700">{c.content}</p>
          <time className="text-gray-400 text-xs">
            {Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
              dateStyle: "medium",
            }).format(new Date(c.createdAt))}
          </time>
        </article>
      ))}

      <ProductCommentForm id={id} />
    </section>
  );
}
