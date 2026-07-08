import type { IIconConfig } from '../type';

export const ArrowLongRight = ({ config }: { config?: IIconConfig }) => {
  const size = config?.size ?? 24;            
  const strokeWidth = config?.strokeWidth ?? 1.5;
  const stroke = config?.stroke ?? "currentColor";
  const fill = config?.fill ?? "none";
  const className = config?.className ?? "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}        
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
            className={`stroke-primary ${className}`}
    >
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>
  );
};


