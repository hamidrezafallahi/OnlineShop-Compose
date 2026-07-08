"use client";

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** وضعیت روشن یا خاموش (اگر داده شود، کامپوننت controlled می‌شود) */
  checked?: boolean;
  /** وقتی وضعیت عوض می‌شود (فقط در حالت controlled استفاده می‌شود) */
  onChange?: (checked: boolean) => void;
  /** نوع رنگ */
  variant?: "default" | "success" | "warning" | "destructive";
  /** اندازه سویچ */
  size?: "sm" | "md" | "lg";
  /** غیرفعال */
  disabled?: boolean;
  /** مقدار اولیه برای حالت داخلی */
  defaultChecked?: boolean;
}

const variantClasses: Record<string, string> = {
  default: "data-[state=on]:bg-primary bg-gray-300",
  success: "data-[state=on]:bg-green-500 bg-gray-300",
  warning: "data-[state=on]:bg-yellow-400 bg-gray-300",
  destructive: "data-[state=on]:bg-red-500 bg-gray-300",
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
      checked = false,
      onChange,
      variant = "default",
      size = "md",
      disabled = false,
      defaultChecked = false,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

    const s = sizeConfig[size];
    const knobTranslate = s.width - s.knob - s.padding * 2;

    const handleToggle = () => {
      if (disabled) return;
      onChange?.(!checked);
      setInternalChecked((prev) => !prev);
    };
    const isRtl =
      typeof window !== "undefined" &&
      getComputedStyle(document.body).direction === "rtl";

    const knobTranslateX = isRtl ? -knobTranslate : knobTranslate;
    React.useEffect(() => {
      setInternalChecked(checked)
    }, [checked]);
    return (
      <button
        ref={ref}
        type="button"
        data-state={internalChecked ? "on" : "off"}
        onClick={handleToggle}
        disabled={disabled}
        style={{
          width: s.width,
          height: s.height,
          padding: s.padding,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        className={cn(
          "inline-flex relative items-center rounded-full focus:outline-none transition-colors duration-300",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <span
          className="absolute bg-white shadow-sm rounded-full transition-transform duration-300"
          style={{
            width: s.knob,
            height: s.knob,
            transform: `translateX(${
              internalChecked ? (isRtl ? -knobTranslate : knobTranslate) : 0
            }px)`,
          }}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
