// "use client"
// import React, {
//   ChangeEvent,
//   useState,
// } from 'react';

// import { IProps } from './type';

// function CustomInput({ ...props }: IProps) {
//   const [value, setValue] = useState("");

//   const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//     props.onChange?.(e)
//   }

//   return (
//     <label className='relative'>
//       {props.placeholder && (
//         <span className={`absolute bg-[#a8a8a8] !text-white rounded px-2 right-5 transition-all duration-300 ${value.length === 0 ? "top-2" : "-top-3"}`}>
//           {props.placeholder}
//         </span>
//       )}
//       <input
//         {...props}
//         placeholder={undefined}
//         type="text"
//         onChange={handleSetValue}
//         className="bg-[#a8a8a8] px-4 focus:border-none rounded-lg w-full h-10 font-normal !text-white text-sm text-right placeholder-white"
//       />
//     </label>
//   );
// }

// export default CustomInput;

import * as React from 'react';

import { cn } from '@lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex bg-white disabled:opacity-50 shadow-sm px-3 py-2 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed",
          className
        )}
        ref={ref}  
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input };
