// import * as React from 'react';

// import { DatePicker } from 'react-persian-range-picker';

// import { cn } from '@lib/utils';

// const CustomDatePicker = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
//   ({ className, ...props }, ref) => {
//     return (
//       <DatePicker
//               className={cn(
//           "flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed",
//           className
//         )}
//         ref={ref}
//          {...props}
//       />
     
//     )
//   }
// )
// CustomDatePicker.displayName = "CustomDatePicker"
// export { CustomDatePicker };

import * as React from 'react';

import {
  DatePicker,
  DatePickerProps,
} from 'react-persian-range-picker';

interface IProps extends DatePickerProps {

}

export default function CustomDatePicker({ ...props }:IProps) {
  return <DatePicker
  className='!w-full'
  {...props}
  />;
}
