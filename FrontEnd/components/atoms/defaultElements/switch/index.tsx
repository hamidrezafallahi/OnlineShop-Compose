"use client";

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** وضعیت روشن یا خاموش (controlled) */
  checked?: boolean;
  /** وقتی وضعیت عوض می‌شود */
  onChange?: (checked: boolean) => void;
  /** نوع رنگ */
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  /** اندازه سویچ */
  size?: 'sm' | 'md' | 'lg';
  /** غیرفعال */
  disabled?: boolean;
  /** مقدار اولیه برای حالت uncontrolled */
  defaultChecked?: boolean;
}

const variantClasses: Record<string, string> = {
  default: 'data-[state=on]:bg-primary bg-gray-300',
  success: 'data-[state=on]:bg-green-500 bg-gray-300',
  warning: 'data-[state=on]:bg-yellow-400 bg-gray-300',
  destructive: 'data-[state=on]:bg-red-500 bg-gray-300',
};

const sizeConfig = {
  sm: { width: 32, height: 18, knob: 14, padding: 2 },
  md: { width: 40, height: 22, knob: 18, padding: 2 },
  lg: { width: 48, height: 26, knob: 22, padding: 2 },
} as const;

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      onChange,
      variant = 'default',
      size = 'md',
      disabled = false,
      defaultChecked = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState(defaultChecked);

    const isOn = isControlled ? Boolean(checked) : uncontrolledChecked;
    const s = sizeConfig[size];
    // Physical left→right travel; absolute left is direction-independent (RTL-safe).
    const knobTranslate = s.width - s.knob - s.padding * 2;

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(event);
      if (event.defaultPrevented) return;

      const next = !isOn;
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        data-state={isOn ? 'on' : 'off'}
        onClick={handleToggle}
        disabled={disabled}
        style={{
          width: s.width,
          height: s.height,
          padding: s.padding,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        className={cn(
          'inline-flex relative items-center rounded-full focus:outline-none transition-colors duration-300',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <span
          className="absolute top-1/2 bg-white shadow-sm rounded-full transition-transform duration-300"
          style={{
            width: s.knob,
            height: s.knob,
            left: s.padding,
            transform: `translateY(-50%) translateX(${
              isOn ? knobTranslate : 0
            }px)`,
          }}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
