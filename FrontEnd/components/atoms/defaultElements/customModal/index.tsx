import * as React from 'react';

import { cn } from '@lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          `z-10 relative bg-background shadow-lg border border-input rounded-lg w-full max-w-md animate-in fade-in zoom-in-95`,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
