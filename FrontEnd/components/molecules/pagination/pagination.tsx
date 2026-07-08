"use client";

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@components/atoms/iconComponents';

export function Pagination({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center mx-auto w-full", className)}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1">{children}</ul>
    </nav>
  );
}

export function PaginationContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("list-none", className)} {...props} />;
}

export function PaginationLink({
  className,
  isActive,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }) {
  return (
    <a
      className={cn(
        "flex justify-center items-center bg-background hover:bg-accent border border-input rounded-md w-9 h-9 font-medium text-sm hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "flex justify-center items-center gap-1 bg-background hover:bg-accent px-3 border border-input rounded-md h-9 font-medium text-sm hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span>Previous</span>
    </a>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "flex justify-center items-center bg-background border border-input rounded-md w-9 h-9 font-medium text-muted-foreground text-sm",
        className
      )}
      {...props}
    >
      …<span className="sr-only">More pages</span>
    </span>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "flex justify-center items-center gap-1 bg-background hover:bg-accent px-3 border border-input rounded-md h-9 font-medium text-sm hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon />
    </a>
  );
}
