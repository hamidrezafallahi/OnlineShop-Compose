import * as React from 'react';

import {
  cva,
  type VariantProps,
} from 'class-variance-authority';

import { cn } from '@lib/utils';

const radioVariants = cva(
  "inline-flex items-center gap-2 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "",
        primary: "text-white",
        secondary: "text-gray-400",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, size, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          ref={ref}
          className={cn(
            `before:absolute relative before:inset-1 before:bg-primary shadow-black/10 shadow-inner hover:shadow-[0_0_4px_rgba(0,0,0,0.15)] border border-gray-300 hover:border-gray-400 rounded-full before:rounded-full focus:ring-2 focus:ring-primary w-3.5 h-3.5 before:content-[''] before:scale-0 checked:before:scale-100 transition-all before:transition-transform before:duration-200 appearance-none cursor-pointer shrink-0`,
            radioVariants({ variant, size }),
            className
          )}
          {...props}
        />

        {label && <span className="select-none">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";

// -----------------------------------------------------
// ⭐ RADIO LIST (در همین فایل)
// -----------------------------------------------------

export interface RadioListOption {
  label: string;
  value: string | number;
}

export interface RadioListProps {
  name: string;
  options: RadioListOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  radioClassName?: string;
  variant?: RadioProps["variant"];
  size?: RadioProps["size"];
}

const RadioList: React.FC<RadioListProps> = ({
  name,
  options,
  value,
  onChange,
  className,
  radioClassName,
  variant,
  size,
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          label={opt.label}
          value={opt.value}
          checked={opt.value === value}
          onChange={() => onChange?.(opt.value)}
          className={radioClassName}
          variant={variant}
          size={size}
        />
      ))}
    </div>
  );
};

export { Radio, RadioList, radioVariants };
