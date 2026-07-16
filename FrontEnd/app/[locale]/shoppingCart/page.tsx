import React from 'react';

import ShoppingCartTemplate from '@components/templates/shoppingCartTemplate';

export default async function ShoppingCartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ShoppingCartTemplate locale={locale} />;
}