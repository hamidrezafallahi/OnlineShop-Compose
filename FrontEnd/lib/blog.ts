import 'server-only';

import { notFound } from 'next/navigation';

import { SimpleResponse } from '@models/base';
import { IBlog } from '@models/Blog';
import { showErrorToast } from '@utils/core';

import { apiBaseUrl } from './api';

export async function getBlogBySlug({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const res = await fetch(`${apiBaseUrl}/Blogs/${slug}`, {
        cache: 'no-store'
    });
    const response:SimpleResponse<IBlog> = await res.json();
    if (!response.isSuccess) {
        showErrorToast(response.error||"")
        notFound();
    }
     return response.data;
}