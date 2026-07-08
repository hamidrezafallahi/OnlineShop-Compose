"use client";

import * as React from 'react';

import { cn } from '@/lib/utils'; // اگر از کلاس‌های ترکیبی استفاده می‌کنید

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | "accent";
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  default: "bg-gray-100 text-gray-800",
  destructive: "bg-red-100 text-red-800",
  outline: "border border-gray-200 text-gray-800",
  secondary: "bg-gray-200 text-gray-900",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  accent: "bg-blue-100 text-blue-800",
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full font-medium text-xs",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";
