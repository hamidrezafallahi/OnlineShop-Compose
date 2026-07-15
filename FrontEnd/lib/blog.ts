import 'server-only';

import { notFound } from 'next/navigation';

import { SimpleResponse } from '@models/base';
import { IBlog } from '@models/Blog';
import { showErrorToast } from '@utils/core';

export async function getBlogBySlug({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const res = await fetch(`${process.env.INTERNAL_API_URL}/api/Blogs/${slug}`, {
        cache: 'no-store'
    });
    const response:SimpleResponse<IBlog> = await res.json();
    if (!response.isSuccess) {
        showErrorToast(response.error||"")
        notFound();
    }
     return response.data;
}