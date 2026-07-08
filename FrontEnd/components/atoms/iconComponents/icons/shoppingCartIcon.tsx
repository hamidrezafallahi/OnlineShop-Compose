import type { IIconConfig } from '../type';

export const ShoppingCartIcon = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 24;  
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={stroke}
      className="stroke-primary"

    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437
           M7.5 14.25a3 3 0 0 0-3 3h15.75
           m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138
           a60.114 60.114 0 0 0-16.536-1.84
           M7.5 14.25L5.106 5.272
           M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z
           m12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
};

