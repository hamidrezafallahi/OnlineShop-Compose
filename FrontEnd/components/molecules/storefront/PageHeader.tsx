import React from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: 'start' | 'center';
  children?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  eyebrow,
  align = 'start',
  children,
}: PageHeaderProps) {
  const alignClass =
    align === 'center' ? 'text-center items-center' : 'text-start items-start';

  return (
    <header className={`store-page-header flex flex-col gap-3 ${alignClass}`}>
      {eyebrow ? <p className="store-eyebrow">{eyebrow}</p> : null}
      <h1 className="store-page-title">{title}</h1>
      {description ? <p className="store-page-subtitle">{description}</p> : null}
      {children}
    </header>
  );
}
