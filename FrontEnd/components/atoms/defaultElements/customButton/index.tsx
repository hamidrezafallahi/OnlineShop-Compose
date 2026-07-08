// import { forwardRef } from 'react';

// import { IProps } from './type';

// const CustomButton = forwardRef<HTMLButtonElement, IProps>(
//   ({ model = "ghost", className, ...props }, ref) => {
//     const defaultClassName = `rounded-lg py-3 px-5 font-medium text-nowrap
//       ${
//         model === "primary"
//           ? "bg-blue-blue text-white "
//           : model === "ghost"
//           ? " border border-white text-white "
//           : model === "lightBlue"
//           ? "border border-blue-blueBorder text-blue-blue4 text-sm bg-[linear-gradient(180deg,_rgba(255,246,239,0.76)_0%,_rgba(143,215,235,0.08)_100%)]"
//           : " font-bold text-white"
//       }
//       ${className}`;

//     return <button ref={ref} {...props} className={defaultClassName} />;
//   }
// );

// CustomButton.displayName = "CustomButton"; // برای devtools

// export default CustomButton;
import * as React from 'react';

import {
  cva,
  type VariantProps,
} from 'class-variance-authority';

import { cn } from '@lib/utils';

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 [&_svg]:size-4 font-medium text-sm whitespace-nowrap transition-colors [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp =  "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants };
