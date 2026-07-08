"use client";

import React, { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function Label({ children, htmlFor, className = "" }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-white   dark:text-gray-300 ${className}`}
    >
      {children}
    </label>
  );
}
