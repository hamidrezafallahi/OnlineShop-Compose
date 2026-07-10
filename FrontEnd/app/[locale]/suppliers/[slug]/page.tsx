import { Metadata } from 'next';

import SupplierTemplate from '@components/templates/supplierTemplate';
import { ApiResponse } from '@models/base';
import { IUser } from '@models/user';

const baseUrl = process.env.INTERNAL_API_URL;

// ===== 1. تولید مسیرهای استاتیک =====
// export async function generateStaticParams() {
//   const response = await fetch(`${baseUrl}api/productOffers/suppliersIds`,{next: { revalidate: 36 }});
//   if (!response.ok) return [];

//   const { data }: { data: Ids[] } = await response.json();
//   return data.map(({ id }) => ({
//     slug: id.toString(),
//   }));
// }

// ===== 2. تولید Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { slug, locale = "fa" } = resolvedParams;
    const response = await fetch(`${baseUrl}api/Users/${slug}`,{next: { revalidate: 36 }});

    if (response.status === 404) {
      return {
        title: locale === "fa" ? "تامین کننده پیدا نشد" : "supplier Not Found",
        description: "",
      };
    }
    const result: ApiResponse<IUser> = await response.json();
    if (!result.isSuccess) {
      return {
        title: locale === "fa" ? "تامین کننده" : "Supplier",
        description: "",
      };
    }
    const title = result.data.fullName
    const description = result.data.userDescription
    const image = result.data.userImage
    return {
       title,
      description,
      openGraph: {
        title,
        description,
        images: image??"",
        locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      }
    };

  } catch (error) {
    return {
      title: "Supplier",
      description: "",
    };
  }
}

// ===== 3. صفحه تولید کننده =====
export default async function Page(props: {
  params: { slug: string; locale: string };
}) {
  const { params } = props;
  const slug = await params.slug;

  const response = await fetch(`${baseUrl}api/Users/${slug}`,{next: { revalidate: 36 }});

  const { data }: { data: IUser } = await response.json();

  return <SupplierTemplate supplier={data} />;
}
