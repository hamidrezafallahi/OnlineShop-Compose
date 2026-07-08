import * as React from 'react';

import { cn } from '@lib/utils';

const Checkbox = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          `after:top-1/2 after:left-1/2 after:absolute relative bg-background checked:bg-primary disabled:opacity-50 border border-input after:border-white checked:border-primary after:border-r-[2.5px] after:border-b-[2.5px] rounded focus:ring-2 focus:ring-ring focus:ring-offset-2 w-4 after:w-[5px] h-4 after:h-[10px] after:content-[''] after:rotate-45 after:scale-0 checked:after:scale-100 transition-colors checked:after:transition-transform after:-translate-x-[40%] after:-translate-y-[70%] appearance-none cursor-pointer disabled:cursor-not-allowed`,
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
