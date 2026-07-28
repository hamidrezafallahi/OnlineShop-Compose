import React from 'react';

type EntityGridProps = {
  children: React.ReactNode;
  cols?: 'products' | 'cards' | 'dense';
  className?: string;
};

const COLS = {
  products:
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6',
  cards:
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
  dense:
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5',
} as const;

export default function EntityGrid({
  children,
  cols = 'cards',
  className = '',
}: EntityGridProps) {
  return <div className={`${COLS[cols]} ${className}`}>{children}</div>;
}
